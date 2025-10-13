import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import { getUserFromRequest } from '~/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const SiteSettings = (await import('~/lib/db/models/SiteSettings')).default;

    const settings = await SiteSettings.findOne();
    const operationRegions = settings?.operationRegions || [];

    const regionsWithIds = operationRegions.map((region: any, index: number) => ({
      _id: region._id || `region-${index}`,
      ...region.toObject ? region.toObject() : region,
    }));

    return NextResponse.json({ success: true, data: regionsWithIds });
  } catch (error: any) {
    console.error('Error fetching operation regions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ operationRegions: [] });
    }

    settings.operationRegions.push({ 
      name, 
      description: description || '',
      position: position || { x: '50%', y: '50%' }
    });
    await settings.save();

    return NextResponse.json({ success: true, data: settings.operationRegions[settings.operationRegions.length - 1] });
  } catch (error: any) {
    console.error('Error creating operation region:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

