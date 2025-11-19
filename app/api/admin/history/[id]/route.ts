import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import History from "~/lib/db/models/History";
import { getSession } from "~/lib/auth/session";
import mongoose from "mongoose";
import { unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to delete an image file if it's a local upload
async function deleteImageFile(imageUrl: string): Promise<void> {
  // Only delete if it's a local file (starts with /)
  if (!imageUrl || !imageUrl.startsWith("/")) {
    return; // Skip external URLs
  }

  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log(`✅ Deleted image: ${imageUrl}`);
    }
  } catch (error) {
    console.error(`⚠️ Error deleting image ${imageUrl}:`, error);
    // Don't throw - continue even if deletion fails
  }
}

// GET - Get single history entry
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const entry = await History.findById(id).populate("author", "name email");

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "History entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    console.error("Error fetching history entry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update history entry
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

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

    // Check if entry exists
    const entry = await History.findById(id);
    if (!entry) {
      return NextResponse.json(
        { success: false, error: "History entry not found" },
        { status: 404 }
      );
    }

    // Handle image cleanup for heroImages array
    if (heroImages !== undefined) {
      const oldImages = entry.heroImages || [];
      const newImages = heroImages || [];

      // Find images that were removed (in old but not in new)
      const removedImages = oldImages.filter((img) => !newImages.includes(img));

      // Delete removed images
      for (const imageUrl of removedImages) {
        await deleteImageFile(imageUrl);
      }

      entry.heroImages = heroImages;
    }

    // Handle image cleanup for milestonesImage
    if (milestonesImage !== undefined) {
      const oldMilestonesImage = entry.milestonesImage;

      // If the image changed and old one exists, delete it
      if (oldMilestonesImage && oldMilestonesImage !== milestonesImage) {
        await deleteImageFile(oldMilestonesImage);
      }

      entry.milestonesImage = milestonesImage;
    }

    // Update other fields
    if (title !== undefined) entry.title = title;
    if (subtitle !== undefined) entry.subtitle = subtitle;
    if (introductionParagraphs !== undefined)
      entry.introductionParagraphs = introductionParagraphs;
    if (timelineSections !== undefined)
      entry.timelineSections = timelineSections;
    if (closingQuote !== undefined) entry.closingQuote = closingQuote;
    if (status !== undefined) {
      entry.status = status;
      // Set publishedAt when publishing
      if (status === "published" && !entry.publishedAt) {
        entry.publishedAt = new Date();
      }
    }

    await entry.save();

    const populatedEntry = await History.findById(entry._id).populate(
      "author",
      "name email"
    );

    return NextResponse.json({
      success: true,
      message: "History entry updated successfully",
      data: populatedEntry,
    });
  } catch (error) {
    console.error("Error updating history entry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete history entry
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const entry = await History.findById(id);

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "History entry not found" },
        { status: 404 }
      );
    }

    // Delete all associated images before deleting the entry
    // Delete hero images
    if (entry.heroImages && entry.heroImages.length > 0) {
      for (const imageUrl of entry.heroImages) {
        await deleteImageFile(imageUrl);
      }
    }

    // Delete milestones image
    if (entry.milestonesImage) {
      await deleteImageFile(entry.milestonesImage);
    }

    // Delete the entry from database
    await History.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "History entry and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting history entry:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
