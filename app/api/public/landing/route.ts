import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import Page from '~/lib/db/models/Page';

// GET - Get published landing page (public endpoint)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Find published landing page by slug
    const landingPage = await Page.findOne({ 
      slug: 'landing',
      status: 'published'
    }).select('-author -__v').lean();

    if (!landingPage) {
      return NextResponse.json({
        success: false,
        error: 'Landing page not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: landingPage,
    });
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}





