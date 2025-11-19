import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import GalleryCategory from '~/lib/db/models/GalleryCategory';

// GET - List all active gallery categories (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('includeInactive') === 'true';

    // Build query
    const query: Record<string, unknown> = includeInactive ? {} : { isActive: true };

    // Fetch categories sorted by order
    const categories = await GalleryCategory.find(query)
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching public gallery categories:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

