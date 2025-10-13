import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import connectDB from '~/lib/db/mongodb';
import Gallery from '~/lib/db/models/Gallery';
import User from '~/lib/db/models/User';
import { getSession } from '~/lib/auth/session';

// PUT - Update gallery metadata
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
    const { alt, caption, category } = body;

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { alt, caption, category },
      { new: true }
    ).populate('uploadedBy', 'name email');

    if (!gallery) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: gallery,
    });
  } catch (error) {
    console.error('Error updating gallery:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete gallery item
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
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    // Delete file from filesystem
    try {
      const filepath = path.join(process.cwd(), 'public', gallery.url);
      await unlink(filepath);
    } catch (error) {
      console.warn('File not found on filesystem:', error);
    }

    // Delete from database
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}







