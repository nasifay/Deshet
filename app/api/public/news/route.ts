import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import User from '~/lib/db/models/User';
import NewsPost from '~/lib/db/models/NewsPost';

// GET - List all published news posts (public, no auth required)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || '-publishedAt';

    // Build query - only published posts
    const query: Record<string, unknown> = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      NewsPost.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-__v') // Exclude version key
        .populate('author', 'name')
        .lean(),
      NewsPost.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
