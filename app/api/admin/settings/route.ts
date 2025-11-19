import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import SiteSettings from '~/lib/db/models/SiteSettings';
import { getSession } from '~/lib/auth/session';

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session || !['admin', 'superadmin'].includes(session.role)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await connectDB();
    
    // Get the request body
    const body = await request.json();
    
    // Find the most recent settings or create new if none exists
    let settings = await SiteSettings.findOne().sort({ updatedAt: -1 });
    
    if (!settings) {
      settings = new SiteSettings();
    }
    
    // Update the contact location if provided
    if (body.contactLocation) {
      settings.contactLocation = {
        latitude: parseFloat(body.contactLocation.latitude),
        longitude: parseFloat(body.contactLocation.longitude),
        zoom: body.contactLocation.zoom ? parseInt(body.contactLocation.zoom) : 13,
      };
    }
    
    // Save the updated settings
    await settings.save();
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getSession();
  if (!session || !['admin', 'superadmin'].includes(session.role)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  try {
    await connectDB();
    
    // Get the most recent settings
    const settings = await SiteSettings.findOne().sort({ updatedAt: -1 }).lean();
    
    return NextResponse.json({ success: true, data: settings });
    
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
