import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Gallery from "~/lib/db/models/Gallery";
import { getSession } from "~/lib/auth/session";

export async function PATCH(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { ids, action } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items selected" },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        { success: false, error: "No action specified" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "feature":
        result = await Gallery.updateMany(
          { _id: { $in: ids } },
          { $set: { featured: true } }
        );
        break;

      case "unfeature":
        result = await Gallery.updateMany(
          { _id: { $in: ids } },
          { $set: { featured: false } }
        );
        break;

      case "delete":
        result = await Gallery.deleteMany({ _id: { $in: ids } });
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }

    const count =
      action === "delete"
        ? (result as any).deletedCount
        : (result as any).modifiedCount;

    return NextResponse.json({
      success: true,
      message: `Successfully ${action}ed ${count} items`,
      data: result,
    });
  } catch (error) {
    console.error("Bulk operation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
