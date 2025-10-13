import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Page from '~/lib/db/models/Page';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';

// GET - Get single page
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
    const page = await Page.findById(id).populate('author', 'name email');

    if (!page) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update page
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

    // Check if page exists
    const existingPage = await Page.findById(id);
    if (!existingPage) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }

    // If changing slug, check for duplicates
    if (body.slug && body.slug !== existingPage.slug) {
      const duplicateSlug = await Page.findOne({ slug: body.slug, _id: { $ne: id } });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update publishedAt if changing status to published
    if (body.status === 'published' && existingPage.status !== 'published') {
      body.publishedAt = new Date();
    }

    // Update page
    const page = await Page.findByIdAndUpdate(id, body, { new: true }).populate(
      'author',
      'name email'
    );

    return NextResponse.json({
      success: true,
      message: 'Page updated successfully',
      data: page,
    });
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete page
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
    const page = await Page.findByIdAndDelete(id);

    if (!page) {
      return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








