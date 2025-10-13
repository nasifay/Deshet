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
    const { name, description, position } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json({ success: false, error: 'Settings not found' }, { status: 404 });
    }

    const regionIndex = settings.operationRegions.findIndex((r: any) => r._id.toString() === params.id);
    if (regionIndex === -1) {
      return NextResponse.json({ success: false, error: 'Operation region not found' }, { status: 404 });
    }

    settings.operationRegions[regionIndex] = {
      ...settings.operationRegions[regionIndex].toObject(),
      name,
      description: description || '',
      position: position || { x: '50%', y: '50%' },
    };

    await settings.save();
    return NextResponse.json({ success: true, data: settings.operationRegions[regionIndex] });
  } catch (error: any) {
    console.error('Error updating operation region:', error);
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

    const regionIndex = settings.operationRegions.findIndex((r: any) => r._id.toString() === params.id);
    if (regionIndex === -1) {
      return NextResponse.json({ success: false, error: 'Operation region not found' }, { status: 404 });
    }

    settings.operationRegions.splice(regionIndex, 1);
    await settings.save();

    return NextResponse.json({ success: true, message: 'Operation region deleted' });
  } catch (error: any) {
    console.error('Error deleting operation region:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

