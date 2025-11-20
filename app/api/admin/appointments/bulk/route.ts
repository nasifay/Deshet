import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import { getSession } from '~/lib/auth/session';

// POST - Bulk update appointment statuses
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { appointmentIds, status } = body;

    // Validation
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'appointmentIds array is required' },
        { status: 400 }
      );
    }

    if (!status || !['scheduled', 'in-progress', 'completed', 'cancelled', 'no-show'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Valid status is required' },
        { status: 400 }
      );
    }

    // Validate status transitions
    const appointments = await Appointment.find({ _id: { $in: appointmentIds } });
    
    const invalidTransitions: string[] = [];
    appointments.forEach((apt) => {
      // Can't transition from completed/cancelled to other statuses
      if ((apt.status === 'completed' || apt.status === 'cancelled') && status !== apt.status) {
        invalidTransitions.push(apt._id.toString());
      }
    });

    if (invalidTransitions.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot change status for ${invalidTransitions.length} appointment(s) that are already completed or cancelled`,
          invalidIds: invalidTransitions,
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = { status };
    if (status === 'completed') {
      updateData.completedAt = new Date();
    } else if (status === 'cancelled') {
      updateData.cancelledAt = new Date();
    } else {
      // Clear completed/cancelled timestamps if changing to other statuses
      updateData.completedAt = null;
      updateData.cancelledAt = null;
    }

    // Bulk update
    const result = await Appointment.updateMany(
      { _id: { $in: appointmentIds } },
      updateData
    );

    // Fetch updated appointments
    const updatedAppointments = await Appointment.find({ _id: { $in: appointmentIds } })
      .populate('assignedTo', 'name email')
      .populate('bookingId', 'name phone');

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} appointment(s)`,
      data: {
        updatedCount: result.modifiedCount,
        appointments: updatedAppointments,
      },
    });
  } catch (error) {
    console.error('Error bulk updating appointments:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


