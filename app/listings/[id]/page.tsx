"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";

// Modular Listing details components
import ImageGallery from "@/components/listings/ImageGallery";
import PetInfoCard from "@/components/listings/PetInfoCard";
import DescriptionCard from "@/components/listings/DescriptionCard";
import LocationCard from "@/components/listings/LocationCard";
import OwnerCard from "@/components/listings/OwnerCard";
import SimilarListings from "@/components/listings/SimilarListings";

import { PetListing } from "@/components/cards/PetCard";

export default function ListingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);

  const [pet, setPet] = useState<PetListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`/api/pets/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Listing not found.");
          }
          throw new Error("Failed to load details.");
        }
        const data = await res.json();
        setPet(data);
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : "Failed to load listing.";
        if (errMsg !== "Listing not found.") {
          console.error("Fetch listing details error:", err);
        }
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing permanently?"
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting listing...");
    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete listing.");
      }

      toast.success("Listing deleted successfully!", { id: toastId });
      router.push("/browse");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <Breadcrumb />

      <main className="flex-grow py-8 md:py-12">
        <Container>
          {isLoading ? (
            /* Loading State Skeleton */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-brand-bg/50 rounded-3xl h-[400px] w-full" />
                <div className="bg-white border rounded-3xl h-60 w-full" />
              </div>
              <div className="lg:col-span-4 bg-white border rounded-3xl h-80 w-full" />
            </div>
          ) : error || !pet ? (
            /* Premium Error / Not Found Empty State */
            <div className="bg-white border-2 border-brand-cardboard/35 rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-6 my-10">
              <div className="w-24 h-24 bg-red-50 border border-red-200 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                ⚠️
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-brand-brown">
                  Listing Not Found
                </h3>
                <p className="text-xs font-bold text-brand-wood/80 leading-relaxed">
                  The listing you are searching for does not exist or was deleted by the caretaker.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="wood" size="lg" href="/browse">
                  👈 Back to Browse
                </Button>
              </div>
            </div>
          ) : (
            /* Listing Details Layout */
            <div className="space-y-6">
              {/* Management controls */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  href={`/listings/edit/${id}`}
                  className="flex items-center gap-1.5 text-xs font-bold bg-white"
                >
                  ✍️ Edit Listing
                </Button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-extrabold rounded-xl border border-red-200/50 flex items-center gap-1.5 transition-all cursor-pointer focus:outline-hidden"
                >
                  🗑️ Delete Listing
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Media, Info, Description, Location */}
                <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                  {/* Image Gallery */}
                  <ImageGallery images={pet.images} />

                  {/* Pet Info Card */}
                  <PetInfoCard pet={pet} />

                  {/* Description Card */}
                  <DescriptionCard description={pet.description} />

                  {/* Location Card */}
                  <LocationCard
                    city={pet.city}
                    state={pet.state}
                    area={pet.area}
                    address={pet.address}
                    pincode={pet.pincode}
                  />
                </div>

                {/* Right Column: Sticky Caretaker Details */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                  <OwnerCard
                    ownerName={pet.ownerName}
                    phone={pet.phone}
                    email={pet.email}
                    listingId={id}
                  />
                </div>
              </div>

              {/* Similar listings */}
              <div className="pt-6 border-t border-brand-cardboard/25">
                <SimilarListings />
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
