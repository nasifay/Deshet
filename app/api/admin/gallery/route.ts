import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Gallery from '~/lib/db/models/Gallery';
import GalleryCategory from '~/lib/db/models/GalleryCategory';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';
import { Types } from 'mongoose';

// GET - List all gallery items
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || '-createdAt';

    // Build query
    const query: any = {};
    if (type) query.type = type;
    if (category) {
      // Convert string to ObjectId
      query.category = new Types.ObjectId(category);
    }
    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { caption: { $regex: search, $options: 'i' } },
      ];
    }

    // Debug logging
    console.log('Gallery API Query:', { query, category, type, search, page, limit });

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [gallery, total] = await Promise.all([
      Gallery.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('uploadedBy', 'name email')
        .populate({
          path: 'category',
          select: 'name slug color icon',
          model: 'GalleryCategory'
        })
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







