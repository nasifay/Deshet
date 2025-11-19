import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";

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

    const body = await request.json();
    const { name, description, position } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Settings not found" },
        { status: 404 }
      );
    }

    const { id } = await params;

    const regionIndex = settings.operationRegions.findIndex(
      (r: any) => r._id?.toString() === id
    );
    if (regionIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Operation region not found" },
        { status: 404 }
      );
    }

    settings.operationRegions[regionIndex] = {
      ...((settings.operationRegions[regionIndex] as any).toObject?.() ||
        settings.operationRegions[regionIndex]),
      name,
      description: description || "",
      position: position || { x: "50%", y: "50%" },
    } as any;

    await settings.save();
    return NextResponse.json({
      success: true,
      data: settings.operationRegions[regionIndex],
    });
  } catch (error: unknown) {
    console.error("Error updating operation region:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update operation region";
    return NextResponse.json(
      { success: false, error: errorMessage },
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

    await connectDB();
    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Settings not found" },
        { status: 404 }
      );
    }

    const { id } = await params;

    const regionIndex = settings.operationRegions.findIndex(
      (r: any) => r._id?.toString() === id
    );
    if (regionIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Operation region not found" },
        { status: 404 }
      );
    }

    settings.operationRegions.splice(regionIndex, 1);
    await settings.save();

    return NextResponse.json({
      success: true,
      message: "Operation region deleted",
    });
  } catch (error: unknown) {
    console.error("Error deleting operation region:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete operation region";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
