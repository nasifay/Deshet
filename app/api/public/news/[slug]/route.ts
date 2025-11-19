import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import NewsPost from '~/lib/db/models/NewsPost';
import User from '~/lib/db/models/User';

// GET - Get a single published news post by slug (public, no auth required)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const post = await NewsPost.findOne({
      slug: slug,
      status: 'published',
    })
      .select('-__v')
      .populate('author', 'name')
      .lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await NewsPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching news post:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
