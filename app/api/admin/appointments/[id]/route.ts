import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import { getSession } from '~/lib/auth/session';

// GET - Get single appointment
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
    const appointment = await Appointment.findById(id)
      .populate('assignedTo', 'name email')
      .populate('bookingId', 'name phone email preferredDate preferredTime serviceType healthConcern');

    if (!appointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update appointment (reschedule, update status, add notes)
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

    // Check if appointment exists
    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    // Validate email format if being updated
    if (body.email !== undefined) {
      if (body.email === null || body.email === '') {
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
    if (body.appointmentDate) {
      const selectedDate = new Date(body.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return NextResponse.json(
          { success: false, error: 'Appointment date cannot be in the past' },
          { status: 400 }
        );
      }

      // Check for conflicts (overlapping appointments with same time)
      if (body.appointmentTime) {
        const conflictingAppointment = await Appointment.findOne({
          _id: { $ne: id },
          appointmentDate: selectedDate,
          appointmentTime: body.appointmentTime,
          status: { $in: ['scheduled', 'in-progress'] },
        });

        if (conflictingAppointment) {
          return NextResponse.json(
            {
              success: false,
              error: 'Time slot conflict: Another appointment already exists at this date and time',
              conflict: {
                appointmentId: conflictingAppointment._id,
                patientName: conflictingAppointment.patientName,
                time: conflictingAppointment.appointmentTime,
              },
            },
            { status: 409 }
          );
        }
      }

      body.appointmentDate = selectedDate;
    }

    // Validate status transitions
    if (body.status) {
      // Can't transition from completed/cancelled to other statuses
      if ((existingAppointment.status === 'completed' || existingAppointment.status === 'cancelled') && 
          body.status !== existingAppointment.status) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Cannot change status from "${existingAppointment.status}" to "${body.status}". Completed or cancelled appointments cannot be modified.` 
          },
          { status: 400 }
        );
      }

      // Validate workflow: scheduled -> in-progress -> completed
      const validTransitions: Record<string, string[]> = {
        'scheduled': ['in-progress', 'completed', 'cancelled', 'no-show'],
        'in-progress': ['completed', 'cancelled', 'no-show'],
        'completed': [], // Terminal state
        'cancelled': [], // Terminal state
        'no-show': ['scheduled', 'cancelled'], // Can reschedule from no-show
      };

      if (!validTransitions[existingAppointment.status]?.includes(body.status)) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Invalid status transition: Cannot change from "${existingAppointment.status}" to "${body.status}". Valid transitions: ${validTransitions[existingAppointment.status]?.join(', ') || 'none'}` 
          },
          { status: 400 }
        );
      }
    }

    // Handle status changes
    if (body.status === 'completed' && existingAppointment.status !== 'completed') {
      body.completedAt = new Date();
    } else if (body.status !== 'completed' && existingAppointment.status === 'completed') {
      body.completedAt = null;
    }

    if (body.status === 'cancelled' && existingAppointment.status !== 'cancelled') {
      body.cancelledAt = new Date();
    } else if (body.status !== 'cancelled' && existingAppointment.status === 'cancelled') {
      body.cancelledAt = null;
    }

    // Update appointment
    const appointment = await Appointment.findByIdAndUpdate(id, body, { new: true })
      .populate('assignedTo', 'name email')
      .populate('bookingId', 'name phone preferredDate preferredTime');

    return NextResponse.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Cancel appointment
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
    
    // Instead of deleting, mark as cancelled
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status: 'cancelled',
        cancelledAt: new Date(),
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

