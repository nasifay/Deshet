import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Volunteer from '~/lib/db/models/Volunteer';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';

// GET - List all volunteer applications
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
    const query: any = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [volunteers, total] = await Promise.all([
      Volunteer.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('reviewedBy', 'name email')
        .lean(),
      Volunteer.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: volunteers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








