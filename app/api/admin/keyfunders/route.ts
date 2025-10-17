import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import KeyFunder from "~/lib/db/models/KeyFunder";
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

    // Get all key funders, sorted by order
    const keyFunders = await KeyFunder.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: keyFunders,
    });
  } catch (error) {
    console.error("Error fetching key funders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch key funders" },
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
    const { name, logo, order, isActive, link, description, type } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create new key funder
    const keyFunder = new KeyFunder({
      name: name.trim(),
      logo,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      link: link?.trim() || "",
      description: description?.trim() || "",
      type: type || "key_funder",
    });

    await keyFunder.save();

    return NextResponse.json({
      success: true,
      data: keyFunder,
      message: "Key funder created successfully",
    });
  } catch (error) {
    console.error("Error creating key funder:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create key funder" },
      { status: 500 }
    );
  }
}
