import { NextRequest, NextResponse } from "next/server";
import connectDB from "~/lib/db/mongodb";
import BankOption from "~/lib/db/models/BankOption";
import { getSession } from "~/lib/auth/session";
import mongoose from "mongoose";

// GET - Get single bank option
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid bank option ID" },
        { status: 400 }
      );
    }

    const bankOption = await BankOption.findById(id).lean();

    if (!bankOption) {
      return NextResponse.json(
        { success: false, error: "Bank option not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bankOption,
    });
  } catch (error) {
    console.error("Error fetching bank option:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update bank option
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid bank option ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      accountNumber,
      number,
      id: bankId,
      swiftCode,
      logo,
      copyIcon,
      organizationName,
      status,
      order,
    } = body;

    // Validate required fields
    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: "Name and logo are required" },
        { status: 400 }
      );
    }

    const bankOption = await BankOption.findByIdAndUpdate(
      id,
      {
        name,
        accountNumber,
        number,
        id: bankId,
        swiftCode,
        logo,
        copyIcon,
        organizationName,
        status,
        order,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!bankOption) {
      return NextResponse.json(
        { success: false, error: "Bank option not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bankOption,
      message: "Bank option updated successfully",
    });
  } catch (error) {
    console.error("Error updating bank option:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete bank option
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid bank option ID" },
        { status: 400 }
      );
    }

    const bankOption = await BankOption.findByIdAndDelete(id).lean();

    if (!bankOption) {
      return NextResponse.json(
        { success: false, error: "Bank option not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bank option deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bank option:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

