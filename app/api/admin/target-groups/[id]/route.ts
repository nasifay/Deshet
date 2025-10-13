import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import { getUserFromRequest } from '~/lib/auth/session';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, icon } = body;

    if (!name || !description) {
      return NextResponse.json({ success: false, error: 'Name and description are required' }, { status: 400 });
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json({ success: false, error: 'Settings not found' }, { status: 404 });
    }

    const groupIndex = settings.targetGroups.findIndex((g: any) => g._id.toString() === params.id);
    if (groupIndex === -1) {
      return NextResponse.json({ success: false, error: 'Target group not found' }, { status: 404 });
    }

    settings.targetGroups[groupIndex] = {
      ...settings.targetGroups[groupIndex].toObject(),
      name,
      description,
      icon: icon || '',
    };

    await settings.save();
    return NextResponse.json({ success: true, data: settings.targetGroups[groupIndex] });
  } catch (error: any) {
    console.error('Error updating target group:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json({ success: false, error: 'Settings not found' }, { status: 404 });
    }

    const groupIndex = settings.targetGroups.findIndex((g: any) => g._id.toString() === params.id);
    if (groupIndex === -1) {
      return NextResponse.json({ success: false, error: 'Target group not found' }, { status: 404 });
    }

    settings.targetGroups.splice(groupIndex, 1);
    await settings.save();

    return NextResponse.json({ success: true, message: 'Target group deleted' });
  } catch (error: any) {
    console.error('Error deleting target group:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}







