import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import KeyFunder from "~/lib/db/models/KeyFunder";
import { getUserFromRequest } from "~/lib/auth/session";
import mongoose from "mongoose";

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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid key funder ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const keyFunder = await KeyFunder.findById(id).lean();

    if (!keyFunder) {
      return NextResponse.json(
        { success: false, error: "Key funder not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: keyFunder,
    });
  } catch (error) {
    console.error("Error fetching key funder:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch key funder" },
      { status: 500 }
    );
  }
}

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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid key funder ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, logo, order, isActive, link, description, type } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const keyFunder = await KeyFunder.findById(id);

    if (!keyFunder) {
      return NextResponse.json(
        { success: false, error: "Key funder not found" },
        { status: 404 }
      );
    }

    // Update key funder
    keyFunder.name = name.trim();
    keyFunder.logo = logo;
    keyFunder.order = order || 0;
    keyFunder.isActive = isActive !== undefined ? isActive : true;
    keyFunder.link = link?.trim() || "";
    keyFunder.description = description?.trim() || "";
    keyFunder.type = type || "key_funder";

    await keyFunder.save();

    return NextResponse.json({
      success: true,
      data: keyFunder,
      message: "Key funder updated successfully",
    });
  } catch (error) {
    console.error("Error updating key funder:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update key funder" },
      { status: 500 }
    );
  }
}

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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid key funder ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const keyFunder = await KeyFunder.findById(id);

    if (!keyFunder) {
      return NextResponse.json(
        { success: false, error: "Key funder not found" },
        { status: 404 }
      );
    }

    await KeyFunder.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Key funder deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting key funder:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete key funder" },
      { status: 500 }
    );
  }
}
