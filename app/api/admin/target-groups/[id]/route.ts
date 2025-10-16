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
    const { title, icon, iconWidth, iconHeight } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
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

    const groupIndex = settings.targetGroups.findIndex(
      (g: any) => g._id?.toString() === id
    );
    if (groupIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Target group not found" },
        { status: 404 }
      );
    }

    settings.targetGroups[groupIndex] = {
      ...((settings.targetGroups[groupIndex] as any).toObject?.() ||
        settings.targetGroups[groupIndex]),
      title,
      icon: icon || "",
      iconWidth: iconWidth || "",
      iconHeight: iconHeight || "",
    } as any;

    await settings.save();
    return NextResponse.json({
      success: true,
      data: settings.targetGroups[groupIndex],
    });
  } catch (error: unknown) {
    console.error("Error updating target group:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update target group";
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

    const groupIndex = settings.targetGroups.findIndex(
      (g: any) => g._id?.toString() === id
    );
    if (groupIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Target group not found" },
        { status: 404 }
      );
    }

    settings.targetGroups.splice(groupIndex, 1);
    await settings.save();

    return NextResponse.json({
      success: true,
      message: "Target group deleted",
    });
  } catch (error: unknown) {
    console.error("Error deleting target group:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete target group";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
