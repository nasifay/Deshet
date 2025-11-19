import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Page from "~/lib/db/models/Page";
import User from "~/lib/db/models/User";
import { getSession } from "~/lib/auth/session";

// GET - List all pages
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
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "-updatedAt";

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [pages, total] = await Promise.all([
      Page.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("author", "name email")
        .lean(),
      Page.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: pages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new page
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
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status,
      seo,
      sections,
    } = body;

    // Validation
    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    // Create page
    const newPage = await Page.create({
      title,
      slug,
      content: content || "",
      excerpt,
      featuredImage,
      status: status || "draft",
      author: session.userId,
      seo,
      sections: sections || [],
      publishedAt: status === "published" ? new Date() : null,
    });

    const populatedPage = await Page.findById(newPage._id).populate(
      "author",
      "name email"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Page created successfully",
        data: populatedPage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
