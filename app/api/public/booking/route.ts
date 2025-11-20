import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Booking from "~/lib/db/models/Booking";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      serviceType,
      healthConcern,
      requestCallback,
    } = body;

    // Validate required fields
    if (
      !name ||
      !phone ||
      !preferredDate ||
      !preferredTime ||
      !serviceType ||
      !healthConcern
    ) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: "Invalid email format" },
          { status: 400 }
        );
      }
    }

    // Validate date is not in the past
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, error: "Preferred date cannot be in the past" },
        { status: 400 }
      );
    }

    // Create booking
    const bookingData: {
      name: string;
      email?: string;
      phone: string;
      preferredDate: Date;
      preferredTime: string;
      serviceType: string;
      healthConcern: string;
      requestCallback: boolean;
      status: string;
    } = {
      name: name.trim(),
      phone: phone.trim(),
      preferredDate: selectedDate,
      preferredTime: preferredTime.trim(),
      serviceType: serviceType.trim(),
      healthConcern: healthConcern.trim(),
      requestCallback: requestCallback || false,
      status: "pending",
    };

    if (email) {
      bookingData.email = email.trim().toLowerCase();
    }

    const booking = await Booking.create(bookingData);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
        data: {
          id: booking._id,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Booking submission error:", error);

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
      { success: false, error: "Failed to submit booking request" },
      { status: 500 }
    );
  }
}









