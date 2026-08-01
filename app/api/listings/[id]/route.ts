import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pet from "@/models/Pet";
import mongoose from "mongoose";

// GET /api/listings/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { listingId: id };
    }

    const pet = await Pet.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!pet) {
      return NextResponse.json(
        { error: "Not Found", message: "Listing not found" },
        { status: 404 }
      );
    }

    const responseObj = {
      ...pet.toObject(),
      id: pet._id.toString(),
    };

    return NextResponse.json(responseObj, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/listings/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}

// PUT /api/listings/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { listingId: id };
    }

    const updatedPet = await Pet.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPet) {
      return NextResponse.json(
        { error: "Not Found", message: "Listing not found" },
        { status: 404 }
      );
    }

    const responseObj = {
      ...updatedPet.toObject(),
      id: updatedPet._id.toString(),
    };

    return NextResponse.json(responseObj, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("PUT /api/listings/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/listings/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { listingId: id };
    }

    const deletedPet = await Pet.findOneAndDelete(query);
    if (!deletedPet) {
      return NextResponse.json(
        { error: "Not Found", message: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Listing deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("DELETE /api/listings/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}
