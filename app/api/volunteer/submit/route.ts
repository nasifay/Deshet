import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Volunteer from "~/lib/db/models/Volunteer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// POST - Submit volunteer application (public endpoint)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Parse form data (supports both JSON and multipart)
    const contentType = request.headers.get("content-type");
    let body: any;
    let documentUrl: string | undefined;

    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      
      // Extract file if present
      const file = formData.get("document") as File | null;
      
      if (file && file.size > 0) {
        // Validate file type (PDF, DOC, DOCX, TXT)
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];
        
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { success: false, error: "Only PDF, DOC, DOCX, and TXT files are allowed" },
            { status: 400 }
          );
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, error: "File size must be less than 10MB" },
            { status: 400 }
          );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "volunteers");
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}-${originalName}`;
        const filepath = path.join(uploadsDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        documentUrl = `/uploads/volunteers/${filename}`;
      }

      // Parse other fields from FormData
      body = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        age: formData.get("age"),
        gender: formData.get("gender"),
        location: formData.get("location"),
        occupation: formData.get("occupation"),
        skills: formData.get("skills"),
        interests: formData.get("interests"),
        availability: formData.get("availability"),
        experience: formData.get("experience"),
        motivation: formData.get("motivation"),
        referenceSource: formData.get("referenceSource"),
      };
    } else {
      body = await request.json();
    }

    const {
      fullName,
      email,
      phone,
      age,
      gender,
      location,
      occupation,
      skills,
      interests,
      availability,
      experience,
      motivation,
      referenceSource,
    } = body;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !availability ||
      !motivation ||
      !referenceSource
    ) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return NextResponse.json(
        {
          success: false,
          error: "An application with this email already exists",
        },
        { status: 409 }
      );
    }

    // Create volunteer application
    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      age,
      gender,
      location,
      occupation,
      skills: Array.isArray(skills) ? skills : [],
      interests: Array.isArray(interests) ? interests : [],
      availability,
      experience,
      motivation,
      referenceSource,
      document: documentUrl,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your interest in volunteering! We will review your application and contact you soon.",
        data: {
          id: volunteer._id,
          fullName: volunteer.fullName,
          email: volunteer.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting volunteer application:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { success: false, error: validationErrors.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
