import { NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import SiteSettings from '~/lib/db/models/SiteSettings';

// GET - Public endpoint to fetch site settings
export async function GET() {
  try {
    await connectDB();

    const settings = await SiteSettings.findOne().select('-__v -_id -createdAt -updatedAt').lean();

    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Site settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}








