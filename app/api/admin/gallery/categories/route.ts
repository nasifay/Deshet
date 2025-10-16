import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import GalleryCategory from "~/lib/db/models/GalleryCategory";
import { getSession } from "~/lib/auth/session";

// GET - List all gallery categories (admin with filters)
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
    const isActive = searchParams.get("isActive");

    // Build query
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== null && isActive !== "") {
      query.isActive = isActive === "true";
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [categories, total] = await Promise.all([
      GalleryCategory.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryCategory.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching gallery categories:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new gallery category
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
      name,
      slug,
      description,
      color,
      icon,
      order,
      isActive,
      featuredImage,
      hasBackground,
      backgroundImage,
      gap,
    } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await GalleryCategory.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    // Create category
    const category = await GalleryCategory.create({
      name,
      slug,
      description,
      color: color || "#128341",
      icon: icon || "🖼️",
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      featuredImage,
      hasBackground: hasBackground || false,
      backgroundImage,
      gap,
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: "Gallery category created successfully",
    });
  } catch (error: unknown) {
    console.error("Error creating gallery category:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A category with this name or slug already exists",
        },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
