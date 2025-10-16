import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import BankOption from "~/lib/db/models/BankOption";
import { getSession } from "~/lib/auth/session";

// GET - List all bank options (admin with filters)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("🔍 Admin bank options API called");
    await connectDB();
    console.log("✅ Database connected");

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    console.log("Query params:", { page, limit, search, status });

    // Build query
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { accountNumber: { $regex: search, $options: "i" } },
        { swiftCode: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    console.log("MongoDB query:", JSON.stringify(query));

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      BankOption.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BankOption.countDocuments(query),
    ]);

    console.log(`📊 Found ${items.length} items, total: ${total}`);

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
    console.error("❌ Error fetching bank options:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create new bank option
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
      accountNumber,
      number,
      id,
      swiftCode,
      logo,
      copyIcon,
      organizationName,
      status,
      order,
    } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    // Create bank option
    const bankOption = await BankOption.create({
      name,
      accountNumber,
      number,
      id,
      swiftCode,
      logo,
      copyIcon,
      organizationName:
        organizationName || "Tamra ForSocial Development Organization",
      status: status || "active",
      order: order || 0,
    });

    return NextResponse.json({
      success: true,
      data: bankOption,
      message: "Bank option created successfully",
    });
  } catch (error) {
    console.error("Error creating bank option:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
