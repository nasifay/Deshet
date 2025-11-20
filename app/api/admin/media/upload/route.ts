import { NextRequest, NextResponse } from "next/server";
import { getSession } from "~/lib/auth/session";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `uploads/${timestamp}-${originalName}`;

    // Upload to Vercel Blob Storage
    let blob;
    try {
      blob = await put(filename, file, {
        access: "public",
        contentType: file.type,
      });
    } catch (blobError) {
      console.error("Vercel Blob Storage error:", blobError);
      const errorMsg = blobError instanceof Error ? blobError.message : String(blobError);
      
      // Check if it's a token/authentication error
      if (
        errorMsg.includes("BLOB_READ_WRITE_TOKEN") ||
        errorMsg.includes("token") ||
        errorMsg.includes("BLOB") ||
        errorMsg.includes("Unauthorized") ||
        errorMsg.includes("authentication")
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Blob storage not configured. Please verify BLOB_READ_WRITE_TOKEN is set in Vercel environment variables and the blob store is linked to your project.",
          },
          { status: 500 }
        );
      }
      
      // Re-throw other errors to be caught by outer catch
      throw blobError;
    }

    // Return the URL
    const url = blob.url;
    // Extract just the filename from the URL for backward compatibility
    const urlFilename = url.split("/").pop() || filename.split("/").pop() || filename;

    return NextResponse.json({
      success: true,
      data: {
        filename: urlFilename,
        url,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      },
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    
    // Provide helpful error message for missing BLOB_READ_WRITE_TOKEN
    if (
      errorMessage.includes("BLOB_READ_WRITE_TOKEN") ||
      errorMessage.includes("token") ||
      errorMessage.includes("BLOB")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel environment variables. Visit https://vercel.com/docs/storage/vercel-blob/quickstart for setup instructions.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
