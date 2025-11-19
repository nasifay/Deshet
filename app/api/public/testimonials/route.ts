import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Testimonial from "~/lib/db/models/Testimonial";

// GET - Get public testimonials
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Build query - only active testimonials for public
    const query: Record<string, unknown> = { status: "active" };

    if (featured === "true") {
      query.featured = true;
    }

    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .select("-__v")
      .lean();

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
