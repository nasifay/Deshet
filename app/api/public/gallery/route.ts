import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Gallery from "~/lib/db/models/Gallery";
import GalleryCategory from "~/lib/db/models/GalleryCategory";
import mongoose from "mongoose";

// GET - List gallery items for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "-createdAt";

    // Build query - only show images by default
    const query: Record<string, unknown> = { type: "image" };
    
    if (category && category !== "all") {
      // Convert category string to ObjectId if valid
      if (mongoose.Types.ObjectId.isValid(category)) {
        try {
          const categoryObjectId = new mongoose.Types.ObjectId(category);
          
          // Verify category exists and is active
          const categoryDoc = await GalleryCategory.findById(categoryObjectId).lean();
          
          if (!categoryDoc) {
            console.warn("Category not found:", category);
            return NextResponse.json({
              success: true,
              data: [],
              pagination: {
                page,
                limit,
                total: 0,
                pages: 0,
              },
            });
          }
          
          if (!categoryDoc.isActive) {
            console.warn("Category is not active:", category);
            return NextResponse.json({
              success: true,
              data: [],
              pagination: {
                page,
                limit,
                total: 0,
                pages: 0,
              },
            });
          }
          
          // Query category as ObjectId (Mongoose should handle this automatically)
          query.category = categoryObjectId;
        } catch (error) {
          console.error("Error processing category:", error);
          return NextResponse.json({
            success: true,
            data: [],
            pagination: {
              page,
              limit,
              total: 0,
              pages: 0,
            },
          });
        }
      } else {
        // If invalid ObjectId, return empty results
        console.warn("Invalid category ObjectId:", category);
        return NextResponse.json({
          success: true,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            pages: 0,
          },
        });
      }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    // Log query for debugging
    console.log("Gallery API - Query params:", {
      category: category || "all",
      page,
      limit,
      sort,
      queryType: query.type,
      queryCategory: query.category ? query.category.toString() : "none",
    });
    
    // First, let's check how many total images exist (for debugging)
    const totalImages = await Gallery.countDocuments({ type: "image" });
    console.log("Total images in database:", totalImages);
    
    // Get sample of actual category IDs from images (for debugging)
    const sampleImages = await Gallery.find({ type: "image" })
      .select("category")
      .limit(10)
      .lean();
    const actualCategoryIds = [...new Set(sampleImages.map((img: any) => img.category?.toString()))];
    console.log("Sample category IDs from actual images:", actualCategoryIds);
    
    if (category && category !== "all") {
      const totalInCategory = await Gallery.countDocuments(query);
      console.log("Images in category:", totalInCategory);
      
      // Also check if any images have this category as a string (for debugging)
      const queryAsString = { type: "image", category: category };
      const totalAsString = await Gallery.countDocuments(queryAsString);
      console.log("Images with category as string:", totalAsString);
    }
    
    // Try to find gallery items - use aggregation to handle potential type mismatches
    let gallery, total;
    
    if (category && category !== "all" && query.category) {
      // For category queries, use aggregation pipeline to handle ObjectId conversion
      const categoryObjectId = query.category as mongoose.Types.ObjectId;
      const categoryString = category;
      
      console.log("Category query - ObjectId:", categoryObjectId.toString());
      console.log("Category query - String:", categoryString);
      
      // First, let's check what format the category is stored in the database
      const sampleImage = await Gallery.findOne({ type: "image" })
        .select("category")
        .lean();
      console.log("Sample image category type:", typeof sampleImage?.category);
      console.log("Sample image category value:", sampleImage?.category);
      console.log("Sample image category toString:", sampleImage?.category?.toString());
      
      // Try direct ObjectId query first (most common case)
      const directQuery = {
        type: "image",
        category: categoryObjectId,
      };
      
      const directCount = await Gallery.countDocuments(directQuery);
      console.log("Direct ObjectId query count:", directCount);
      
      if (directCount > 0) {
        // Direct query works, use it
        [gallery, total] = await Promise.all([
          Gallery.find(directQuery)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate("category", "_id name slug color icon")
            .select(
              "_id filename originalName url alt caption customClass category createdAt"
            )
            .lean(),
          Gallery.countDocuments(directQuery),
        ]);
        console.log("Direct query results:", { found: gallery.length, total });
      } else {
        // Try with string comparison using aggregation
        console.log("Direct query returned 0, trying aggregation pipeline...");
        const aggregationResult = await Gallery.aggregate([
          {
            $match: {
              type: "image",
            },
          },
          {
            $addFields: {
              categoryStr: { $toString: "$category" },
            },
          },
          {
            $match: {
              categoryStr: categoryString,
            },
          },
          {
            $sort: sort === "-createdAt" ? { createdAt: -1 } : { createdAt: 1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: "gallerycategories",
              localField: "category",
              foreignField: "_id",
              as: "categoryPopulated",
            },
          },
          {
            $unwind: {
              path: "$categoryPopulated",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 1,
              filename: 1,
              originalName: 1,
              url: 1,
              alt: 1,
              caption: 1,
              customClass: 1,
              createdAt: 1,
              category: {
                _id: "$categoryPopulated._id",
                name: "$categoryPopulated.name",
                slug: "$categoryPopulated.slug",
                color: "$categoryPopulated.color",
                icon: "$categoryPopulated.icon",
              },
            },
          },
        ]);
        
        const totalAggregation = await Gallery.aggregate([
          {
            $match: {
              type: "image",
            },
          },
          {
            $addFields: {
              categoryStr: { $toString: "$category" },
            },
          },
          {
            $match: {
              categoryStr: categoryString,
            },
          },
          {
            $count: "total",
          },
        ]);
        
        gallery = aggregationResult;
        total = totalAggregation[0]?.total || 0;
        console.log("Aggregation results:", { found: gallery.length, total });
      }
    } else {
      // For "all" or no category, use normal query
      [gallery, total] = await Promise.all([
        Gallery.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate("category", "_id name slug color icon")
          .select(
            "_id filename originalName url alt caption customClass category createdAt"
          )
          .lean(),
        Gallery.countDocuments(query),
      ]);
    }

    // Log results for debugging
    console.log("Gallery API - Results:", {
      category: category || "all",
      found: gallery.length,
      total,
      returned: gallery.map((item: any) => ({
        id: item._id,
        category: item.category?._id || item.category || "no category",
        categoryName: item.category?.name || "no name",
      })),
    });

    // Get all unique category IDs from images for debugging (only if category filter is used)
    let debugInfo = undefined;
    if (category && category !== "all") {
      const allImages = await Gallery.find({ type: "image" })
        .select("category")
        .lean();
      const uniqueCategoryIds = [...new Set(allImages.map((img: any) => 
        img.category?.toString() || img.category || "null"
      ))];
      debugInfo = {
        requestedCategory: category,
        actualCategoryIdsInImages: uniqueCategoryIds,
        totalImagesWithCategories: allImages.filter((img: any) => img.category).length,
      };
      console.log("Debug info:", debugInfo);
    }

    return NextResponse.json({
      success: true,
      data: gallery,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      ...(debugInfo && { debug: debugInfo }),
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
