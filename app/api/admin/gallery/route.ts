import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Gallery from "~/lib/db/models/Gallery";
import { getSession } from "~/lib/auth/session";

// GET - List all gallery items (admin with filters)
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

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");

    // Build query
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: "i" } },
        { alt: { $regex: search, $options: "i" } },
        { caption: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (type && type !== "all") {
      query.type = type;
    }

    if (featured !== null && featured !== undefined && featured !== "") {
      query.featured = featured === "true";
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Gallery.find(query)
        .sort({ position: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category", "_id name slug color icon")
        .populate("uploadedBy", "_id name email")
        .lean(),
      Gallery.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new gallery item (upload handled separately via /api/admin/media/upload)
export async function POST(request: NextRequest) {
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
    const {
      filename,
      originalName,
      url,
      type,
      mimeType,
      size,
      dimensions,
      alt,
      caption,
      customClass,
      section = "general",
      position = 0,
      featured = false,
      category,
    } = body;

    // Validate required fields
    if (!filename || !originalName || !url || !type || !mimeType || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create gallery item
    const item = await Gallery.create({
      filename,
      originalName,
      url,
      type,
      mimeType,
      size: size || 0,
      dimensions,
      alt,
      caption,
      customClass,
      section,
      position,
      featured,
      category,
      uploadedBy: session.userId,
    });

    // Populate category info
    await item.populate("category", "_id name slug color icon");

    return NextResponse.json({
      success: true,
      data: item,
      message: "Gallery item created successfully",
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
