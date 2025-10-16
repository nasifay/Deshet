import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";

// GET - Fetch single leadership member by ID
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
    const SiteSettings = (await import("~/lib/db/models/SiteSettings")).default;

    const settings = await SiteSettings.findOne();
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Settings not found" },
        { status: 404 }
      );
    }

    const { id } = await params;

    // Find member by ID
    const member = settings.leadership.find(
      (m: any) => m._id?.toString() === id
    );

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member,
    });
  } catch (error: unknown) {
    console.error("Error fetching leadership member:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch member";
    return NextResponse.json(
      { success: false, error: errorMessage },
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

    const body = await request.json();
    console.log("PUT API - Received body:", body);

    const { name, position, bio, photo, order, email, phone } = body;
    console.log("PUT API - Extracted fields:", {
      name,
      position,
      bio,
      photo,
      order,
      email,
      phone,
    });

    if (!name || !position) {
      console.log("PUT API - Validation failed: missing name or position");
      return NextResponse.json(
        { success: false, error: "Name and position are required" },
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

    // Find member by ID
    const memberIndex = settings.leadership.findIndex(
      (m: any) => m._id?.toString() === id
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    // Update member - clean up old fields and use only new field names
    const updatedMember = {
      _id: (settings.leadership[memberIndex] as any)._id,
      name,
      position,
      bio: bio || "",
      photo: photo || "",
      order:
        order !== undefined
          ? order
          : (settings.leadership[memberIndex] as any).order || 0,
      email: email || "",
      phone: phone || "",
    };

    console.log("PUT API - Updating member:", updatedMember);

    settings.leadership[memberIndex] = updatedMember as any;

    // Use validateModifiedOnly to avoid validating unchanged array elements
    await settings.save({ validateModifiedOnly: true });
    console.log("PUT API - Member updated successfully");

    // Debug: Check what's actually in the database after save
    const savedMember = settings.leadership[memberIndex];

    return NextResponse.json({
      success: true,
      data: settings.leadership[memberIndex],
    });
  } catch (error: unknown) {
    console.error("Error updating leadership member:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update member";
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

    // Find and remove member
    const memberIndex = settings.leadership.findIndex(
      (m: any) => m._id?.toString() === id
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    settings.leadership.splice(memberIndex, 1);
    await settings.save({ validateModifiedOnly: true });

    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting leadership member:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete member";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
