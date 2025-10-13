import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import GalleryCategory from '~/lib/db/models/GalleryCategory';
import { getSession } from '~/lib/auth/session';

// GET - List all gallery categories
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const categories = await GalleryCategory.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new gallery category
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { name, description, color, icon, order } = body;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Check if slug already exists
    const existingCategory = await GalleryCategory.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    const category = await GalleryCategory.create({
      name,
      slug,
      description,
      color: color || '#128341',
      icon: icon || '🖼️',
      order: order || 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Category created successfully',
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating gallery category:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


