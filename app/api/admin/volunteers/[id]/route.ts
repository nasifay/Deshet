import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Volunteer from "~/lib/db/models/Volunteer";
import User from "~/lib/db/models/User";
import { getSession } from "~/lib/auth/session";

// GET - Get single volunteer application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const volunteer = await Volunteer.findById(id).populate(
      "reviewedBy",
      "name email"
    );

    if (!volunteer) {
      return NextResponse.json(
        { success: false, error: "Volunteer application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: volunteer,
    });
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update volunteer application status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const body = await request.json();
    const { status, notes } = body;

    const volunteer = await Volunteer.findById(id);
    if (!volunteer) {
      return NextResponse.json(
        { success: false, error: "Volunteer application not found" },
        { status: 404 }
      );
    }

    // Update fields
    if (status) volunteer.status = status;
    if (notes !== undefined) volunteer.notes = notes;
    volunteer.reviewedBy =
      session.userId as unknown as typeof volunteer.reviewedBy;
    volunteer.reviewedAt = new Date();

    await volunteer.save();

    const updatedVolunteer = await Volunteer.findById(id).populate(
      "reviewedBy",
      "name email"
    );

    return NextResponse.json({
      success: true,
      message: "Volunteer application updated successfully",
      data: updatedVolunteer,
    });
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete volunteer application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const volunteer = await Volunteer.findByIdAndDelete(id);

    if (!volunteer) {
      return NextResponse.json(
        { success: false, error: "Volunteer application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Volunteer application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
