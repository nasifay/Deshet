import { NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import BankOption from "~/lib/db/models/BankOption";

// GET - Public endpoint to fetch active bank options
export async function GET() {
  try {
    console.log("🔍 Public bank options API called");
    await connectDB();

    console.log("✅ Database connected, fetching bank options...");

    // Fetch only active bank options, sorted by order

    const bankOptions = await BankOption.find()
      .sort({ order: 1, createdAt: -1 })
      .select("-createdAt -updatedAt -__v")
      .lean();

    console.log(`📊 Found ${bankOptions.length} active bank options`);

    return NextResponse.json({
      success: true,
      data: bankOptions,
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
