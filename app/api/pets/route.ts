import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Pet from "@/models/Pet";

// GET /api/pets - Get all public (non-rejected) pet listings sorted by newest
export async function GET() {
  try {
    await connectToDatabase();

    console.log("=================================");
    console.log("✅ MongoDB Connected");
    console.log("📦 Database:", mongoose.connection.db?.databaseName);
    console.log("🌐 Host:", mongoose.connection.host);

    const collections = await mongoose.connection.db
      ?.listCollections()
      .toArray();

    console.log("📂 Collections:", collections);
    console.log("=================================");

    // Query for all public listings
    const pets = await Pet.find({
      status: { $ne: "Rejected" },
    }).sort({
      createdAt: -1,
    });

    console.log(`🐾 Found ${pets.length} pet(s)`);

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

    console.error("❌ GET /api/pets error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/pets - Create a new pet listing
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    console.log("=================================");
    console.log("✅ MongoDB Connected");
    console.log("📦 Database:", mongoose.connection.db?.databaseName);
    console.log("🌐 Host:", mongoose.connection.host);
    console.log("=================================");

    const body = await request.json();

    // Validate required fields
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
        {
          status: 400,
        }
      );
    }

    // Generate listingId if not passed
    const listingId =
      body.listingId || Math.random().toString(36).substring(2, 11);

    const newPet = await Pet.create({
      ...body,
      listingId,
      status: body.status || "Pending",
      views: 0,
      featured: body.featured || false,
    });

    console.log("✅ Document Saved Successfully!");
    console.log("🆔 MongoDB _id:", newPet._id.toString());
    console.log("🐶 Pet:", newPet.petName);

    const responseObj = {
      ...newPet.toObject(),
      id: newPet._id.toString(),
    };

    return NextResponse.json(responseObj, {
      status: 201,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("❌ POST /api/pets error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}