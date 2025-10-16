import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Volunteer from "~/lib/db/models/Volunteer";

// POST - Submit volunteer application (public endpoint)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
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
