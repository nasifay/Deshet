import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Contact from "~/lib/db/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create contact submission
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact submission received successfully",
        data: {
          id: contact._id,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact submission error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check your inputs.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
