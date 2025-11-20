import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Booking from '~/lib/db/models/Booking';
import { getSession } from '~/lib/auth/session';

// GET - List all bookings with filtering, sorting, and pagination
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
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { serviceType: { $regex: search, $options: 'i' } },
        ...(search.includes('@') ? [{ email: { $regex: search, $options: 'i' } }] : []),
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('confirmedBy', 'name email')
        .lean(),
      Booking.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new booking (admin can create bookings manually)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      serviceType,
      healthConcern,
      requestCallback,
      status,
      notes,
    } = body;

    // Validation
    if (!name || !phone || !preferredDate || !preferredTime || !serviceType || !healthConcern) {
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
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, error: 'Preferred date cannot be in the past' },
        { status: 400 }
      );
    }

    // Create booking
    const bookingData: {
      name: string;
      email?: string;
      phone: string;
      preferredDate: Date;
      preferredTime: string;
      serviceType: string;
      healthConcern: string;
      requestCallback: boolean;
      status: string;
      notes?: string;
    } = {
      name: name.trim(),
      phone: phone.trim(),
      preferredDate: selectedDate,
      preferredTime: preferredTime.trim(),
      serviceType: serviceType.trim(),
      healthConcern: healthConcern.trim(),
      requestCallback: requestCallback || false,
      status: status || 'pending',
      notes: notes || '',
    };

    if (email) {
      bookingData.email = email.trim().toLowerCase();
    }

    const booking = await Booking.create(bookingData);

    const populatedBooking = await Booking.findById(booking._id).populate('confirmedBy', 'name email');

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: populatedBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}



