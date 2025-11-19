import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Program from "~/lib/db/models/Program";
import { getSession } from "~/lib/auth/session";

// GET - List all programs
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
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") || "order";

    // Build query
    const query: Record<string, unknown> = {};
    if (categoryId) query.categoryId = categoryId;
    if (status) query.status = status;

    // Execute query
    const programs = await Program.find(query).sort(sort).lean();

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

// POST - Create new program
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
      categoryId,
      categoryLabel,
      description,
      image,
      thumbnails,
      status,
      order,
    } = body;

    // Validation
    if (
      !title ||
      !slug ||
      !categoryId ||
      !categoryLabel ||
      !description ||
      !image
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProgram = await Program.findOne({ slug });
    if (existingProgram) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    // Create program
    const program = await Program.create({
      title,
      slug,
      categoryId,
      categoryLabel,
      description,
      image,
      thumbnails: thumbnails || [],
      status: status || "draft",
      order: order || 0,
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Program created successfully",
        data: program,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
