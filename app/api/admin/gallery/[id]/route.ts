import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Gallery from "~/lib/db/models/Gallery";
import { getSession } from "~/lib/auth/session";
import mongoose from "mongoose";

// GET - Get single gallery item by ID
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
        { success: false, error: "Invalid gallery item ID" },
        { status: 400 }
      );
    }

    const item = await Gallery.findById(id)
      .populate("category", "_id name slug color icon")
      .populate("uploadedBy", "_id name email")
      .lean();

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update gallery item
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
        { success: false, error: "Invalid gallery item ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { originalName, alt, caption, customClass, category } = body;

    // Check if item exists
    const item = await Gallery.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Update item (only allow updating metadata, not the file itself)
    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      {
        originalName,
        alt,
        caption,
        customClass,
        category,
      },
      { new: true, runValidators: true }
    )
      .populate("category", "_id name slug color icon")
      .populate("uploadedBy", "_id name email");

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: "Gallery item updated successfully",
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery item
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
        { success: false, error: "Invalid gallery item ID" },
        { status: 400 }
      );
    }

    // Check if item exists
    const item = await Gallery.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Delete item
    await Gallery.findByIdAndDelete(id);

    // TODO: Also delete physical file from storage if needed
    // This would depend on your storage solution (local file system, S3, etc.)

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
