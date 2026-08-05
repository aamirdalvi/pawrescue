import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pet from "@/models/Pet";
import mongoose from "mongoose";

// GET /api/pets/[id]/similar - Get up to 4 similar pets of the same species
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

    const currentPet = await Pet.findOne(query);
    if (!currentPet) {
      return NextResponse.json(
        { error: "Not Found", message: "Pet not found" },
        { status: 404 }
      );
    }

    // Find similar pets by matching species, excluding the current pet ID, and non-rejected status
    const similarPets = await Pet.find({
      species: currentPet.species,
      _id: { $ne: currentPet._id },
      status: { $ne: "Rejected" },
    })
      .sort({ createdAt: -1 })
      .limit(4);

    const formattedPets = similarPets.map((pet) => {
      const obj = pet.toObject();
      return {
        ...obj,
        id: pet._id.toString(),
      };
    });

    return NextResponse.json(formattedPets, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/pets/[id]/similar error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}
