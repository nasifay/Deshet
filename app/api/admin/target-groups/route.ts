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
        ...(group.toObject ? group.toObject() : group),
      })
    );

    return NextResponse.json({ success: true, data: groupsWithIds });
  } catch (error: unknown) {
    console.error("Error fetching target groups:", error);
    return NextResponse.json(
      { success: false, error: error.message },
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
    const { name, description, icon } = body;

    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: "Name and description are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ targetGroups: [] });
    }

    settings.targetGroups.push({ name, description, icon: icon || "" });
    await settings.save();

    return NextResponse.json({
      success: true,
      data: settings.targetGroups[settings.targetGroups.length - 1],
    });
  } catch (error: unknown) {
    console.error("Error creating target group:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
