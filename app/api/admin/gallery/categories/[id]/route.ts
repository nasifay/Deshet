import { NextRequest, NextResponse } from 'next/server';
import connectDB from '~/lib/db/mongodb';
import GalleryCategory from '~/lib/db/models/GalleryCategory';
import Gallery from '~/lib/db/models/Gallery';
import { getSession } from '~/lib/auth/session';

// PUT - Update gallery category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { name, description, color, icon, order, isActive } = body;

    // Generate slug from name if name is provided
    let updateData: any = { description, color, icon, order, isActive };
    
    if (name) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Check if slug already exists for different category
      const existingCategory = await GalleryCategory.findOne({ 
        slug, 
        _id: { $ne: id } 
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { success: false, error: 'Category with this name already exists' },
          { status: 400 }
        );
      }
      
      updateData.name = name;
      updateData.slug = slug;
    }

    const category = await GalleryCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error updating gallery category:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete gallery category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    // Check if category has any gallery items
    const galleryCount = await Gallery.countDocuments({ category: id });
    
    if (galleryCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Cannot delete category. It contains ${galleryCount} gallery items. Please move or delete the items first.` 
        },
        { status: 400 }
      );
    }

    const category = await GalleryCategory.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting gallery category:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


