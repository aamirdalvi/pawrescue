import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Pet from "@/models/Pet";

// GET /api/listings
export async function GET() {
  try {
    await connectToDatabase();
    const pets = await Pet.find({ status: { $ne: "Rejected" } }).sort({
      createdAt: -1,
    });

    const formattedPets = pets.map((pet) => {
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
    console.error("GET /api/listings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/listings
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const requiredFields = [
      "title",
      "petName",
      "species",
      "breed",
      "gender",
      "age",
      "color",
      "listingType",
      "description",
      "ownerName",
      "phone",
      "email",
      "city",
      "state",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: `Missing required fields: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 }
      );
    }

    const listingId = body.listingId || Math.random().toString(36).substring(2, 11);

    const newPet = await Pet.create({
      ...body,
      listingId,
      status: body.status || "Pending",
      views: 0,
      featured: body.featured || false,
    });

    const responseObj = {
      ...newPet.toObject(),
      id: newPet._id.toString(),
    };

    return NextResponse.json(responseObj, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("POST /api/listings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: errorMessage },
      { status: 500 }
    );
  }
}
