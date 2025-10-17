import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Volunteer from "~/lib/db/models/Volunteer";
import User from "~/lib/db/models/User";
import { getSession } from "~/lib/auth/session";
import { unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// GET - List all volunteer applications
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
    const sort = searchParams.get("sort") || "-createdAt";

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [volunteers, total] = await Promise.all([
      Volunteer.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("reviewedBy", "name email")
        .lean(),
      Volunteer.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: volunteers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Bulk delete volunteer applications
export async function DELETE(request: NextRequest) {
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
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "No volunteer IDs provided" },
        { status: 400 }
      );
    }

    // Find all volunteers to get their document paths
    const volunteers = await Volunteer.find({ _id: { $in: ids } });

    // Delete associated document files
    const fileDeletePromises = volunteers.map(async (volunteer) => {
      if (volunteer.document) {
        try {
          const filePath = path.join(
            process.cwd(),
            "public",
            volunteer.document
          );
          if (existsSync(filePath)) {
            await unlink(filePath);
          }
        } catch (fileError) {
          console.error(
            `Error deleting file for volunteer ${volunteer._id}:`,
            fileError
          );
          // Continue with deletion even if file removal fails
        }
      }
    });

    await Promise.allSettled(fileDeletePromises);

    // Delete all volunteer records
    const result = await Volunteer.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} volunteer application(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting volunteers:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
