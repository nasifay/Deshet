import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";
import Supporter from "~/lib/db/models/Supporter";
import mongoose from "mongoose";

// GET - Get single supporter
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supporter ID" },
        { status: 400 }
      );
    }

    const supporter = await Supporter.findById(id);

    if (!supporter) {
      return NextResponse.json(
        { success: false, error: "Supporter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: supporter,
    });
  } catch (error) {
    console.error("Error fetching supporter:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update supporter
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supporter ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, logo, order, isActive, link, description } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    const updatedSupporter = await Supporter.findByIdAndUpdate(
      id,
      {
        name,
        logo,
        order,
        isActive,
        link,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedSupporter) {
      return NextResponse.json(
        { success: false, error: "Supporter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSupporter,
      message: "Supporter updated successfully",
    });
  } catch (error) {
    console.error("Error updating supporter:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete supporter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid supporter ID" },
        { status: 400 }
      );
    }

    const deletedSupporter = await Supporter.findByIdAndDelete(id);

    if (!deletedSupporter) {
      return NextResponse.json(
        { success: false, error: "Supporter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supporter deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting supporter:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
