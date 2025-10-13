import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import { getUserFromRequest } from '~/lib/auth/session';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, position, bio, photo, order, email, phone } = body;

    if (!name || !position) {
      return NextResponse.json(
        { success: false, error: 'Name and position are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      );
    }

    // Find member by ID
    const memberIndex = settings.leadership.findIndex(
      (m: { _id: { toString: () => string } }) => m._id.toString() === params.id
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      );
    }

    // Update member
    settings.leadership[memberIndex] = {
      ...settings.leadership[memberIndex].toObject(),
      name,
      position,
      bio: bio || '',
      photo: photo || '',
      order: order !== undefined ? order : settings.leadership[memberIndex].order,
      email: email || '',
      phone: phone || '',
    };

    await settings.save();

    return NextResponse.json({
      success: true,
      data: settings.leadership[memberIndex],
    });
  } catch (error: unknown) {
    console.error('Error updating leadership member:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings not found' },
        { status: 404 }
      );
    }

    // Find and remove member
    const memberIndex = settings.leadership.findIndex(
      (m: { _id: { toString: () => string } }) => m._id.toString() === params.id
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      );
    }

    settings.leadership.splice(memberIndex, 1);
    await settings.save();

    return NextResponse.json({
      success: true,
      message: 'Member deleted successfully',
    });
  } catch (error: unknown) {
    console.error('Error deleting leadership member:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete member' },
      { status: 500 }
    );
  }
}







