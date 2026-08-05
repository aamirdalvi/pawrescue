import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";

// Modular Listing details components
import ImageGallery from "@/components/listings/ImageGallery";
import RightPanelCard from "@/components/listings/RightPanelCard";
import DescriptionCard from "@/components/listings/DescriptionCard";
import LocationCard from "@/components/listings/LocationCard";
import OwnerCard from "@/components/listings/OwnerCard";
import SimilarListings from "@/components/listings/SimilarListings";
import CaretakerControls from "@/components/listings/CaretakerControls";

import { connectToDatabase } from "@/lib/mongodb";
import Pet from "@/models/Pet";
import mongoose from "mongoose";
import { PetListing } from "@/components/cards/PetCard";

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let query = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  } else {
    query = { listingId: id };
  }

  try {
    await connectToDatabase();
    const pet = await Pet.findOne(query);

    if (!pet) {
      return {
        title: "Pet Not Found | PawRescue",
        description: "The requested pet listing does not exist or has been removed.",
      };
    }

    return {
      title: `${pet.petName.toUpperCase()} | PawRescue`,
      description: `Adopt ${pet.petName}, a ${pet.breed} available in ${pet.city}, ${pet.state}.`,
    };
  } catch (error) {
    console.error("SEO Metadata Generation Error:", error);
    return {
      title: "Error | PawRescue",
      description: "Failed to load pet details.",
    };
  }
}

export default async function PetDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate ID format (either valid ObjectId or alphanumeric listingId)
  const isObjectId = mongoose.Types.ObjectId.isValid(id);
  const isListingId = /^[a-z0-9]{9}$/i.test(id);

  if (!isObjectId && !isListingId) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow py-12">
          <Container>
            <div className="bg-white border-2 border-brand-cardboard/35 rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-6 my-10">
              <div className="w-24 h-24 bg-red-50 border border-red-200 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                ⚠️
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-brown">
                  Invalid Listing ID
                </h3>
                <p className="text-xs font-bold text-brand-wood/80 leading-relaxed">
                  The ID provided in the URL is not in a valid format. Please check the address or try again.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="wood" size="lg" href="/browse">
                  👈 Back to Browse
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  let query = {};
  if (isObjectId) {
    query = { _id: id };
  } else {
    query = { listingId: id };
  }

  let pet: any = null;
  let dbError: string | null = null;

  try {
    await connectToDatabase();
    
    // Atomically increment views count and retrieve pet details in one DB query
    pet = await Pet.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.error("Database Query Error:", error);
    dbError = error instanceof Error ? error.message : "Unknown database error";
  }

  if (dbError) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow py-12">
          <Container>
            <div className="bg-white border-2 border-brand-cardboard/35 rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-6 my-10">
              <div className="w-24 h-24 bg-red-50 border border-red-200 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                💥
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-brown">
                  Database Connection Error
                </h3>
                <p className="text-xs font-bold text-brand-wood/80 leading-relaxed">
                  We encountered an issue connecting to the database server. Please reload the page or try again later.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="wood" size="lg" href="/browse">
                  👈 Back to Browse
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow py-12">
          <Container>
            <div className="bg-white border-2 border-brand-cardboard/35 rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-6 my-10">
              <div className="w-24 h-24 bg-red-50 border border-red-200 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                🔍
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-brown">
                  Listing Not Found
                </h3>
                <p className="text-xs font-bold text-brand-wood/80 leading-relaxed">
                  The listing you are searching for does not exist or has been deleted by the caretaker.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="wood" size="lg" href="/browse">
                  👈 Back to Browse
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  // Format pet document into a plain PetListing object to avoid serialization errors
  const formattedPet: PetListing = {
    ...pet.toObject(),
    _id: pet._id.toString(),
    id: pet._id.toString(),
    createdAt: pet.createdAt?.toISOString(),
    updatedAt: pet.updatedAt?.toISOString(),
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <Breadcrumb />

      <main className="flex-grow py-8 md:py-12">
        <Container>
          <div className="space-y-6">
            {/* 1. Caretaker Controls (Edit / Delete) */}
            <CaretakerControls id={formattedPet._id || ""} />

            {/* 2. Page Content Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image Gallery, Description, Location, and Caretaker Cards */}
              <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                {/* Hero Image Gallery */}
                <ImageGallery
                  images={formattedPet.images}
                  videoUrl={formattedPet.videos?.[0]}
                  species={formattedPet.species}
                  petName={formattedPet.petName}
                  listingId={formattedPet._id}
                />

                {/* About/Description Card */}
                <DescriptionCard description={formattedPet.description} />

                {/* Location Details Card */}
                <LocationCard
                  country={formattedPet.country || "United States"}
                  city={formattedPet.city}
                  state={formattedPet.state}
                  area={formattedPet.area}
                  address={formattedPet.address}
                  pincode={formattedPet.pincode}
                />

                {/* Professional Caretaker Card */}
                <div id="owner-card">
                  <OwnerCard
                    ownerName={formattedPet.ownerName}
                    phone={formattedPet.phone}
                    email={formattedPet.email}
                    listingId={formattedPet._id}
                  />
                </div>
              </div>

              {/* Right Column: Sticky Quick Stats & Actions */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <RightPanelCard pet={formattedPet} />
              </div>
            </div>

            {/* 3. Similar Listings Section */}
            <div className="pt-6 border-t border-brand-cardboard/25">
              <SimilarListings currentPetId={formattedPet._id} />
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
