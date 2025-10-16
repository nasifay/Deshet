import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";
import mongoose from "mongoose";

// GET - List all leadership members
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("🔍 Admin leadership API called");
    await connectDB();
    console.log("✅ Database connected");

    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Settings not found" },
        { status: 404 }
      );
    }

    // Sort leadership by order
    const leadership = settings.leadership.sort(
      (a: any, b: any) => (a.order || 0) - (b.order || 0)
    );

    console.log(`📊 Found ${leadership.length} leadership members`);

    return NextResponse.json({
      success: true,
      data: leadership,
    });
  } catch (error) {
    console.error("❌ Error fetching leadership members:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create new leadership member
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    console.log("POST API - Received body:", body);

    const { name, position, bio, photo, order, email, phone } = body;

    // Validate required fields
    if (!name || !position) {
      console.log("POST API - Validation failed: missing name or position");
      return NextResponse.json(
        { success: false, error: "Name and position are required" },
        { status: 400 }
      );
    }

    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Settings not found" },
        { status: 404 }
      );
    }

    // Create new leadership member
    const newMember = {
      _id: new mongoose.Types.ObjectId(),
      name,
      position,
      bio: bio || "",
      photo: photo || "",
      order: order !== undefined ? order : settings.leadership.length,
      email: email || "",
      phone: phone || "",
    };

    console.log("POST API - Creating new member:", newMember);

    // Add to leadership array
    settings.leadership.push(newMember as any);
    await settings.save({ validateModifiedOnly: true });

    console.log("POST API - Member created successfully");

    return NextResponse.json({
      success: true,
      data: newMember,
      message: "Leadership member created successfully",
    });
  } catch (error) {
    console.error("Error creating leadership member:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
