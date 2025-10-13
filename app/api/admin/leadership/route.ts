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
    const leadership = settings?.leadership || [];

    // Add IDs to each member for editing
    const membersWithIds = leadership.map(
      (
        member: {
          _id?: unknown;
          toObject?: () => unknown;
          [key: string]: unknown;
        },
        index: number
      ) => ({
        _id: member._id || `member-${index}`,
        ...(member.toObject ? member.toObject() : member),
      })
    );

    return NextResponse.json({
      success: true,
      data: membersWithIds,
    });
  } catch (error: unknown) {
    console.error("Error fetching leadership:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leadership" },
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
    const { name, position, bio, photo, order, email, phone } = body;

    if (!name || !position) {
      return NextResponse.json(
        { success: false, error: "Name and position are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ leadership: [] });
    }

    // Add new member
    settings.leadership.push({
      name,
      position,
      bio: bio || "",
      photo: photo || "",
      order: order || settings.leadership.length,
      email: email || "",
      phone: phone || "",
    });

    await settings.save();

    return NextResponse.json({
      success: true,
      data: settings.leadership[settings.leadership.length - 1],
    });
  } catch (error: unknown) {
    console.error("Error creating leadership member:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create member" },
      { status: 500 }
    );
  }
}
