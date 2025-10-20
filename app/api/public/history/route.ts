import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import History from "~/lib/db/models/History";

// GET - Get published history data
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get the most recent published history entry
    const entry = await History.findOne({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean();

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "No published history found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
