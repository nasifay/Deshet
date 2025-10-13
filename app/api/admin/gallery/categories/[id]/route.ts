import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import GalleryCategory from "~/lib/db/models/GalleryCategory";
import Gallery from "~/lib/db/models/Gallery";
import { getSession } from "~/lib/auth/session";
import mongoose from "mongoose";

// GET - Get single gallery category by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await GalleryCategory.findById(id).lean();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Get count of gallery items in this category
    const itemCount = await Gallery.countDocuments({ category: id });

    return NextResponse.json({
      success: true,
      data: {
        ...category,
        itemCount,
      },
    });
  } catch (error) {
    console.error("Error fetching gallery category:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update gallery category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      color,
      icon,
      order,
      isActive,
      featuredImage,
      hasBackground,
      backgroundImage,
      gap,
    } = body;

    // Check if category exists
    const category = await GalleryCategory.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // If slug is being changed, check for duplicates
    if (slug && slug !== category.slug) {
      const existingCategory = await GalleryCategory.findOne({ slug });
      if (existingCategory) {
        return NextResponse.json(
          { success: false, error: "A category with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update category
    const updatedCategory = await GalleryCategory.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        description,
        color,
        icon,
        order,
        isActive,
        featuredImage,
        hasBackground,
        backgroundImage,
        gap,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: "Gallery category updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating gallery category:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "A category with this name or slug already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await GalleryCategory.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category has gallery items
    const itemCount = await Gallery.countDocuments({ category: id });
    if (itemCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete category with ${itemCount} gallery items. Please move or delete the items first.`,
        },
        { status: 400 }
      );
    }

    // Delete category
    await GalleryCategory.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Gallery category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery category:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
