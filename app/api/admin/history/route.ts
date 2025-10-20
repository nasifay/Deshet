import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import History from "~/lib/db/models/History";
import { getSession } from "~/lib/auth/session";

// GET - List all history entries with filtering, sorting, and pagination
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
    const sort = searchParams.get("sort") || "-publishedAt";

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [entries, total] = await Promise.all([
      History.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("author", "name email")
        .lean(),
      History.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching history entries:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new history entry
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
      subtitle,
      heroImages,
      introductionParagraphs,
      milestonesImage,
      timelineSections,
      closingQuote,
      status,
    } = body;

    // Validation
    if (!subtitle) {
      return NextResponse.json(
        { success: false, error: "Subtitle is required" },
        { status: 400 }
      );
    }

    // Create entry
    const entry = await History.create({
      title: title || "HISTORY",
      subtitle,
      heroImages: heroImages || [],
      introductionParagraphs: introductionParagraphs || [],
      milestonesImage,
      timelineSections: timelineSections || [],
      closingQuote,
      status: status || "draft",
      author: session.userId,
      publishedAt: status === "published" ? new Date() : null,
    });

    const populatedEntry = await History.findById(entry._id).populate(
      "author",
      "name email"
    );

    return NextResponse.json(
      {
        success: true,
        message: "History entry created successfully",
        data: populatedEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating history entry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
