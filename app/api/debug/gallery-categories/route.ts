import { NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Gallery from "~/lib/db/models/Gallery";
import GalleryCategory from "~/lib/db/models/GalleryCategory";

export async function GET() {
  try {
    await connectDB();

    // Get all categories from GalleryCategory collection
    const categories = await GalleryCategory.find({ isActive: true })
      .select("_id name slug")
      .lean();

    // Get all images with their category IDs
    const images = await Gallery.find({ type: "image" })
      .select("_id filename category")
      .lean();

    // Group images by category
    const categoryGroups: Record<string, any[]> = {};
    const imagesWithoutCategory: any[] = [];

    images.forEach((img: any) => {
      if (img.category) {
        const catId = img.category.toString();
        if (!categoryGroups[catId]) {
          categoryGroups[catId] = [];
        }
        categoryGroups[catId].push({
          id: img._id,
          filename: img.filename,
        });
      } else {
        imagesWithoutCategory.push({
          id: img._id,
          filename: img.filename,
        });
      }
    });

    // Create a mapping of category IDs to their details
    const categoryMapping = categories.map((cat: any) => {
      const catId = cat._id.toString();
      return {
        id: catId,
        name: cat.name,
        slug: cat.slug,
        imageCount: categoryGroups[catId]?.length || 0,
        sampleImages: categoryGroups[catId]?.slice(0, 3) || [],
      };
    });

    // Find category IDs in images that don't exist in GalleryCategory
    const categoryIds = categories.map((cat: any) => cat._id.toString());
    const orphanedCategoryIds = Object.keys(categoryGroups).filter(
      (catId) => !categoryIds.includes(catId)
    );

    return NextResponse.json({
      success: true,
      data: {
        totalImages: images.length,
        totalCategories: categories.length,
        imagesWithoutCategory: imagesWithoutCategory.length,
        categoryMapping,
        orphanedCategories: orphanedCategoryIds.map((catId) => ({
          id: catId,
          imageCount: categoryGroups[catId].length,
          sampleImages: categoryGroups[catId].slice(0, 3),
        })),
        allCategoryIdsInImages: Object.keys(categoryGroups),
        allCategoryIdsInGalleryCategory: categoryIds,
      },
    });
  } catch (error) {
    console.error("Error in gallery categories debug:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}




