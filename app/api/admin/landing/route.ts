import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Page from "~/lib/db/models/Page";
import User from "~/lib/db/models/User";
import { getSession } from "~/lib/auth/session";

// GET - Get landing page
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Find landing page by slug
    const landingPage = await Page.findOne({ slug: "landing" }).populate(
      "author",
      "name email"
    );

    if (!landingPage) {
      return NextResponse.json(
        {
          success: false,
          error: "Landing page not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: landingPage,
    });
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update or create landing page
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Check if landing page exists
    let landingPage = await Page.findOne({ slug: "landing" });

    if (landingPage) {
      // Update existing landing page
      landingPage = await Page.findByIdAndUpdate(
        landingPage._id,
        {
          ...body,
          slug: "landing", // Ensure slug remains 'landing'
          updatedAt: new Date(),
        },
        { new: true }
      ).populate("author", "name email");
    } else {
      // Create new landing page
      landingPage = await Page.create({
        ...body,
        slug: "landing",
        author: session.userId,
        publishedAt: body.status === "published" ? new Date() : null,
      });

      landingPage = await Page.findById(landingPage._id).populate(
        "author",
        "name email"
      );
    }

    return NextResponse.json({
      success: true,
      message: "Landing page saved successfully",
      data: landingPage,
    });
  } catch (error) {
    console.error("Error saving landing page:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
