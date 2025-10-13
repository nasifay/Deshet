import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Gallery from '~/lib/db/models/Gallery';

// GET - List gallery items for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const type = searchParams.get('type') || 'image'; // Default to images only
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query - only show images by default
    const query: any = { type: 'image' };
    if (category && category !== 'all') {
      query.category = category; // Expects ObjectId
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [gallery, total] = await Promise.all([
      Gallery.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('category', 'name slug color icon')
        .select('_id filename originalName url alt caption category createdAt')
        .lean(),
      Gallery.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: gallery,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
