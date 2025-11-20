import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import Booking from '~/lib/db/models/Booking';
import { getSession } from '~/lib/auth/session';

// GET - Search appointments/patients by phone number
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Search both appointments and bookings by phone
    const [appointments, bookings] = await Promise.all([
      Appointment.find({ phone: { $regex: phone, $options: 'i' } })
        .sort({ appointmentDate: -1 })
        .populate('assignedTo', 'name email')
        .populate('bookingId', 'name phone preferredDate preferredTime')
        .lean(),
      Booking.find({ phone: { $regex: phone, $options: 'i' } })
        .sort({ createdAt: -1 })
        .populate('confirmedBy', 'name email')
        .populate('appointmentId', 'patientName appointmentDate appointmentTime status')
        .lean(),
    ]);

    // Extract unique patient info from first appointment or booking
    let patientInfo = null;
    if (appointments.length > 0) {
      const firstApt = appointments[0];
      patientInfo = {
        name: firstApt.patientName,
        phone: firstApt.phone,
        email: firstApt.email,
      };
    } else if (bookings.length > 0) {
      const firstBooking = bookings[0];
      patientInfo = {
        name: firstBooking.name,
        phone: firstBooking.phone,
        email: firstBooking.email,
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        patient: patientInfo,
        appointments: appointments.map((apt) => ({
          id: apt._id.toString(),
          patientName: apt.patientName,
          phone: apt.phone,
          email: apt.email,
          appointmentDate: apt.appointmentDate,
          appointmentTime: apt.appointmentTime,
          serviceType: apt.serviceType,
          healthConcern: apt.healthConcern,
          status: apt.status,
          notes: apt.notes,
          assignedTo: apt.assignedTo,
          bookingId: apt.bookingId ? apt.bookingId.toString() : null,
          createdAt: apt.createdAt,
        })),
        bookings: bookings.map((booking) => ({
          id: booking._id.toString(),
          name: booking.name,
          phone: booking.phone,
          email: booking.email,
          preferredDate: booking.preferredDate,
          preferredTime: booking.preferredTime,
          serviceType: booking.serviceType,
          healthConcern: booking.healthConcern,
          status: booking.status,
          notes: booking.notes,
          confirmedBy: booking.confirmedBy,
          confirmedAt: booking.confirmedAt,
          appointmentId: booking.appointmentId ? booking.appointmentId.toString() : null,
          createdAt: booking.createdAt,
        })),
        stats: {
          totalAppointments: appointments.length,
          totalBookings: bookings.length,
          upcomingAppointments: appointments.filter(
            (apt) =>
              new Date(apt.appointmentDate) >= new Date() &&
              ['scheduled', 'in-progress'].includes(apt.status)
          ).length,
          completedAppointments: appointments.filter((apt) => apt.status === 'completed').length,
        },
      },
    });
  } catch (error) {
    console.error('Error searching patient:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}



