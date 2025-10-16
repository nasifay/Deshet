import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Supporter from "~/lib/db/models/Supporter";

// GET - Get all active supporters (public endpoint)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const supporters = await Supporter.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select("-__v")
      .lean();

    console.log(`📊 Public API: Found ${supporters.length} active supporters`);
    if (supporters.length > 0) {
      console.log("📋 First supporter:", supporters[0].name);
    }

    return NextResponse.json({
      success: true,
      data: supporters,
    });
  } catch (error) {
    console.error("Error fetching supporters:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
