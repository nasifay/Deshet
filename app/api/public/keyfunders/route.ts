import { NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import KeyFunder from "~/lib/db/models/KeyFunder";

export async function GET() {
  try {
    await connectDB();

    // Get only active key funders, sorted by order
    const keyFunders = await KeyFunder.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select("name logo order link description type")
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
