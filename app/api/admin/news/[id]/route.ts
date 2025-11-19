import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import NewsPost from '~/lib/db/models/NewsPost';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';

// GET - Get single news post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const post = await NewsPost.findById(id).populate('author', 'name email');

    if (!post) {
      return NextResponse.json({ success: false, error: 'News post not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching news post:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update news post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Check if post exists
    const existingPost = await NewsPost.findById(id);
    if (!existingPost) {
      return NextResponse.json({ success: false, error: 'News post not found' }, { status: 404 });
    }

    // If changing slug, check for duplicates
    if (body.slug && body.slug !== existingPost.slug) {
      const duplicateSlug = await NewsPost.findOne({ slug: body.slug, _id: { $ne: id } });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update publishedAt if changing status to published
    if (body.status === 'published' && existingPost.status !== 'published') {
      body.publishedAt = new Date();
    }

    // Update post
    const post = await NewsPost.findByIdAndUpdate(id, body, { new: true }).populate(
      'author',
      'name email'
    );

    return NextResponse.json({
      success: true,
      message: 'News post updated successfully',
      data: post,
    });
  } catch (error) {
    console.error('Error updating news post:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete news post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const post = await NewsPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({ success: false, error: 'News post not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'News post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting news post:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








