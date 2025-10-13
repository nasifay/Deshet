import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Program from "~/lib/db/models/Program";

// GET - List all published programs (public, no auth required)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");

    // Build query - only published programs
    const query: Record<string, unknown> = { status: "published" };
    if (categoryId) query.categoryId = categoryId;

    // Execute query with ordering
    const programs = await Program.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select("-__v") // Exclude version key
      .lean();

    return NextResponse.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
