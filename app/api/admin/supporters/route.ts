import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import { getUserFromRequest } from "~/lib/auth/session";
import Supporter from "~/lib/db/models/Supporter";

// GET - List all supporters
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

    const supporters = await Supporter.find().sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: supporters,
    });
  } catch (error) {
    console.error("Error fetching supporters:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create new supporter
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
    const { name, logo, order, isActive, link, description } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    // Get current max order if order not provided
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const maxOrderSupporter = await Supporter.findOne().sort({ order: -1 });
      finalOrder = maxOrderSupporter ? maxOrderSupporter.order + 1 : 0;
    }

    // Create new supporter
    const newSupporter = await Supporter.create({
      name,
      logo,
      order: finalOrder,
      isActive: isActive !== undefined ? isActive : true,
      link: link || "",
      description: description || "",
    });

    return NextResponse.json({
      success: true,
      data: newSupporter,
      message: "Supporter created successfully",
    });
  } catch (error) {
    console.error("Error creating supporter:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
