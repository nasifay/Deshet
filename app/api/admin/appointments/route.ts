import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Appointment from '~/lib/db/models/Appointment';
import { getSession } from '~/lib/auth/session';

// GET - List all appointments with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const phone = searchParams.get('phone');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const sort = searchParams.get('sort') || '-appointmentDate';

    // Build query
    const query: Record<string, unknown> = {};
    
    if (status) query.status = status;
    
    if (phone) {
      query.phone = { $regex: phone, $options: 'i' };
    }
    
    // Date range filter
    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.appointmentDate = { ...query.appointmentDate as Record<string, unknown>, $gte: start };
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.appointmentDate = { ...query.appointmentDate as Record<string, unknown>, $lte: end };
      }
    }
    
    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { serviceType: { $regex: search, $options: 'i' } },
        ...(search.includes('@') ? [{ email: { $regex: search, $options: 'i' } }] : []),
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('assignedTo', 'name email')
        .populate('bookingId', 'name phone preferredDate preferredTime')
        .lean(),
      Appointment.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new appointment (from booking conversion or walk-in)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      patientName,
      email,
      phone,
      appointmentDate,
      appointmentTime,
      serviceType,
      healthConcern,
      status,
      bookingId,
      notes,
      assignedTo,
    } = body;

    // Validation
    if (!patientName || !phone || !appointmentDate || !appointmentTime || !serviceType || !healthConcern) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Validate date is not in the past
    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, error: 'Appointment date cannot be in the past' },
        { status: 400 }
      );
    }

    // Check for conflicts (overlapping appointments with same time)
    const conflictingAppointment = await Appointment.findOne({
      appointmentDate: selectedDate,
      appointmentTime: appointmentTime.trim(),
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

    // Create appointment
    const appointmentData: {
      patientName: string;
      email?: string;
      phone: string;
      appointmentDate: Date;
      appointmentTime: string;
      serviceType: string;
      healthConcern: string;
      status: string;
      bookingId?: string;
      notes?: string;
      assignedTo?: string;
    } = {
      patientName: patientName.trim(),
      phone: phone.trim(),
      appointmentDate: selectedDate,
      appointmentTime: appointmentTime.trim(),
      serviceType: serviceType.trim(),
      healthConcern: healthConcern.trim(),
      status: status || 'scheduled',
      notes: notes || '',
    };

    if (email) {
      appointmentData.email = email.trim().toLowerCase();
    }

    if (bookingId) {
      appointmentData.bookingId = bookingId;
    }

    if (assignedTo) {
      appointmentData.assignedTo = assignedTo;
    }

    const appointment = await Appointment.create(appointmentData);

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('assignedTo', 'name email')
      .populate('bookingId', 'name phone preferredDate preferredTime');

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment created successfully',
        data: populatedAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

