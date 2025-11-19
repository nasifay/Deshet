import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import NewsPost from '~/lib/db/models/NewsPost';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';

// GET - List all blog posts with filtering, sorting, and pagination
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
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || '-publishedAt';

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      // Search in both string and bilingual object formats
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'title.am': { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { 'excerpt.en': { $regex: search, $options: 'i' } },
        { 'excerpt.am': { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      NewsPost.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('author', 'name email')
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
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, slug, content, excerpt, featuredImage, category, tags, status, isFeatured } =
      body;

    // Validation - handle both string and bilingual object formats
    const titleValue = typeof title === 'object' ? title.en : title;
    const excerptValue = typeof excerpt === 'object' ? excerpt.en : excerpt;
    const contentValue = typeof content === 'object' ? content.en : content;
    
    if (!titleValue || !slug || !contentValue || !excerptValue || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await NewsPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Create post
    const post = await NewsPost.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      category,
      tags: tags || [],
      status: status || 'draft',
      isFeatured: isFeatured || false,
      author: session.userId,
      publishedAt: status === 'published' ? new Date() : null,
    });

    const populatedPost = await NewsPost.findById(post._id).populate('author', 'name email');

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: populatedPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}




