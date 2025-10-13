import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Program from '~/lib/db/models/Program';
import { getSession } from '~/lib/auth/session';

// GET - Get single program
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
    const program = await Program.findById(id);

    if (!program) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update program
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

    // Check if program exists
    const existingProgram = await Program.findById(id);
    if (!existingProgram) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    // If changing slug, check for duplicates
    if (body.slug && body.slug !== existingProgram.slug) {
      const duplicateSlug = await Program.findOne({ slug: body.slug, _id: { $ne: id } });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update publishedAt if changing status to published
    if (body.status === 'published' && existingProgram.status !== 'published') {
      body.publishedAt = new Date();
    }

    // Update program
    const program = await Program.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      success: true,
      message: 'Program updated successfully',
      data: program,
    });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete program
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
    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}








