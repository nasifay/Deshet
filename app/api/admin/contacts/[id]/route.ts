import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import Contact from "~/lib/db/models/Contact";
import { getSession } from "~/lib/auth/session";

// GET - Get single contact submission
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
    const contact = await Contact.findById(id).populate(
      "respondedBy",
      "name email"
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update contact submission status
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

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact submission not found" },
        { status: 404 }
      );
    }

    // Update fields
    if (status) contact.status = status;
    if (notes !== undefined) contact.notes = notes;
    contact.respondedBy =
      session.userId as unknown as typeof contact.respondedBy;
    contact.respondedAt = new Date();

    await contact.save();

    const updatedContact = await Contact.findById(id).populate(
      "respondedBy",
      "name email"
    );

    return NextResponse.json({
      success: true,
      message: "Contact submission updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact submission
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
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact submission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
