import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Booking from '~/lib/db/models/Booking';
import Appointment from '~/lib/db/models/Appointment';
import { getSession } from '~/lib/auth/session';

// GET - Get single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const booking = await Booking.findById(id)
      .populate('confirmedBy', 'name email')
      .populate('appointmentId', 'patientName appointmentDate appointmentTime status');

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // Fetch full appointment data if it exists
    let appointmentData = null;
    if (booking.appointmentId) {
      appointmentData = await Appointment.findById(booking.appointmentId)
        .populate('assignedTo', 'name email')
        .lean();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...booking.toObject(),
        appointment: appointmentData,
      },
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update booking
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Check if booking exists
    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    // If updating status to confirmed, set confirmedBy and confirmedAt
    // AND automatically create an appointment
    if (body.status === 'confirmed' && existingBooking.status !== 'confirmed') {
      body.confirmedBy = session.userId;
      body.confirmedAt = new Date();

      // Auto-create appointment from booking
      try {
        // Check if appointment already exists for this booking
        if (!existingBooking.appointmentId) {
          // Validate appointment date is not in the past
          const appointmentDate = new Date(existingBooking.preferredDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (appointmentDate < today) {
            console.warn('Booking preferred date is in the past, using today as appointment date');
            appointmentDate.setTime(today.getTime());
          }

          const appointment = await Appointment.create({
            patientName: existingBooking.name,
            phone: existingBooking.phone,
            email: existingBooking.email,
            appointmentDate: appointmentDate,
            appointmentTime: existingBooking.preferredTime,
            serviceType: existingBooking.serviceType,
            healthConcern: existingBooking.healthConcern,
            status: 'scheduled',
            bookingId: existingBooking._id,
            notes: existingBooking.notes 
              ? `Converted from booking. ${existingBooking.notes}` 
              : 'Converted from booking.',
            assignedTo: session.userId,
          });

          // Link appointment back to booking
          body.appointmentId = appointment._id;
          
          console.log(`✅ Appointment ${appointment._id} created from booking ${existingBooking._id}`);
        } else {
          console.log(`ℹ️ Booking ${existingBooking._id} already has an appointment linked`);
        }
      } catch (appointmentError) {
        console.error('❌ Error creating appointment from booking:', appointmentError);
        // Log error but continue with booking update
        // Appointment can be created manually later
        // We'll include a warning in the response
        body.appointmentCreationError = appointmentError instanceof Error 
          ? appointmentError.message 
          : 'Unknown error occurred';
      }
    }

    // Validate email format if being updated
    if (body.email !== undefined) {
      if (body.email === null || body.email === '') {
        // Allow clearing email by setting to null
        body.email = undefined;
      } else {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(body.email)) {
          return NextResponse.json(
            { success: false, error: 'Invalid email format' },
            { status: 400 }
          );
        }
        body.email = body.email.trim().toLowerCase();
      }
    }

    // Validate date if being updated
    if (body.preferredDate) {
      const selectedDate = new Date(body.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return NextResponse.json(
          { success: false, error: 'Preferred date cannot be in the past' },
          { status: 400 }
        );
      }
      body.preferredDate = selectedDate;
    }

    // Update booking
    const booking = await Booking.findByIdAndUpdate(id, body, { new: true })
      .populate('confirmedBy', 'name email')
      .populate('appointmentId', 'patientName appointmentDate appointmentTime status');

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found after update' }, { status: 404 });
    }

    // Fetch appointment data if it exists
    let appointmentData = null;
    if (booking.appointmentId) {
      appointmentData = await Appointment.findById(booking.appointmentId)
        .populate('assignedTo', 'name email')
        .lean();
    }

    const responseData: any = {
      success: true,
      message: 'Booking updated successfully',
      data: {
        ...booking.toObject(),
        appointment: appointmentData,
      },
    };

    // Include warning if appointment creation failed
    if (body.appointmentCreationError) {
      responseData.warning = 'Booking confirmed but appointment creation failed. Please create appointment manually.';
      responseData.appointmentCreationError = body.appointmentCreationError;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}



