import { NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import SiteSettings from '~/lib/db/models/SiteSettings';

// GET - Public endpoint to fetch site settings
export async function GET() {
  try {
    await connectDB();

    const settings = await SiteSettings.findOne().select('-__v -_id -createdAt -updatedAt').lean();

    // Return default values if settings don't exist, so components can handle gracefully
    // This prevents 404 errors and allows components to use default values
    if (!settings) {
      return NextResponse.json({
        success: true,
        data: {
          stats: {
            staffCount: "0",
            officesCount: "0",
            regionsCount: "0",
            volunteersCount: "0",
            protocolsCount: "0",
          },
          achievements: {
            recognitionsCount: "0",
            radioYears: "0",
            serviceYears: "0",
            activeRegions: "0",
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    // Return default data instead of error to prevent component failures
    return NextResponse.json({
      success: false,
      data: {
        stats: {
          staffCount: "0",
          officesCount: "0",
          regionsCount: "0",
          volunteersCount: "0",
          protocolsCount: "0",
        },
        achievements: {
          recognitionsCount: "0",
          radioYears: "0",
          serviceYears: "0",
          activeRegions: "0",
        },
      },
      error: 'Internal server error',
    });
  }
}








