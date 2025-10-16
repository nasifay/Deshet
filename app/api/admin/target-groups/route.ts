import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";

export async function GET(request: NextRequest) {
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
    const targetGroups = settings?.targetGroups || [];

    const groupsWithIds = targetGroups.map(
      (
        group: {
          _id?: unknown;
          toObject?: () => unknown;
          [key: string]: unknown;
        },
        index: number
      ) => ({
        _id: group._id || `group-${index}`,
        ...(group.toObject
          ? (group.toObject() as Record<string, unknown>)
          : (group as Record<string, unknown>)),
      })
    );

    return NextResponse.json({ success: true, data: groupsWithIds });
  } catch (error: unknown) {
    console.error("Error fetching target groups:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch target groups";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ targetGroups: [] });
    }

    settings.targetGroups.push({
      title,
      icon: icon || "",
      iconWidth: iconWidth || "",
      iconHeight: iconHeight || "",
    });
    await settings.save();

    return NextResponse.json({
      success: true,
      data: settings.targetGroups[settings.targetGroups.length - 1],
    });
  } catch (error: unknown) {
    console.error("Error creating target group:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create target group";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
