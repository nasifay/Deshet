import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import { getSession } from '~/lib/auth/session';

// GET - Get appointments for calendar view (daily/weekly)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const view = searchParams.get('view') || 'daily'; // 'daily' or 'weekly'
    const date = searchParams.get('date'); // For daily view: specific date
    const startDate = searchParams.get('startDate'); // For weekly view: start of week
    const endDate = searchParams.get('endDate'); // For weekly view: end of week

    let queryStartDate: Date;
    let queryEndDate: Date;

    if (view === 'daily') {
      // Daily view: get appointments for a specific date
      const targetDate = date ? new Date(date) : new Date();
      queryStartDate = new Date(targetDate);
      queryStartDate.setHours(0, 0, 0, 0);
      queryEndDate = new Date(targetDate);
      queryEndDate.setHours(23, 59, 59, 999);
    } else {
      // Weekly view: get appointments for date range
      if (startDate && endDate) {
        queryStartDate = new Date(startDate);
        queryStartDate.setHours(0, 0, 0, 0);
        queryEndDate = new Date(endDate);
        queryEndDate.setHours(23, 59, 59, 999);
      } else {
        // Default to current week if no dates provided
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
        queryStartDate = new Date(today.setDate(diff));
        queryStartDate.setHours(0, 0, 0, 0);
        queryEndDate = new Date(queryStartDate);
        queryEndDate.setDate(queryStartDate.getDate() + 6);
        queryEndDate.setHours(23, 59, 59, 999);
      }
    }

    // Query appointments in date range, excluding cancelled
    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: queryStartDate,
        $lte: queryEndDate,
      },
      status: { $ne: 'cancelled' },
    })
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .populate('assignedTo', 'name email')
      .populate('bookingId', 'name phone')
      .lean();

    // Structure data for calendar rendering
    const structuredData = {
      view,
      dateRange: {
        start: queryStartDate.toISOString(),
        end: queryEndDate.toISOString(),
      },
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
      })),
      stats: {
        total: appointments.length,
        scheduled: appointments.filter((a) => a.status === 'scheduled').length,
        inProgress: appointments.filter((a) => a.status === 'in-progress').length,
        completed: appointments.filter((a) => a.status === 'completed').length,
        noShow: appointments.filter((a) => a.status === 'no-show').length,
      },
    };

    return NextResponse.json({
      success: true,
      data: structuredData,
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}



