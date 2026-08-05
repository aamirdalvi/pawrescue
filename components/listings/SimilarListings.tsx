"use client";

import React, { useEffect, useState } from "react";
import PetCard, { PetListing } from "@/components/cards/PetCard";
import SectionTitle from "@/components/ui/SectionTitle";

interface SimilarListingsProps {
  currentPetId?: string;
}

export default function SimilarListings({ currentPetId }: SimilarListingsProps) {
  const [similarPets, setSimilarPets] = useState<PetListing[]>([]);

  useEffect(() => {
    async function loadListings() {
      if (!currentPetId) return;
      try {
        const res = await fetch(`/api/pets/${currentPetId}/similar`);
        if (res.ok) {
          const data = await res.json();
          setSimilarPets(data);
        }
      } catch (err) {
        console.error("Failed to load similar listings:", err);
      }
    }
    loadListings();
  }, [currentPetId]);

  if (similarPets.length === 0) {
    return null; // Do not render section if no user-created listings exist
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Similar Pet Listings"
        subtitle="You may also want to explore these local active alerts and listings."
        align="left"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarPets.map((pet) => (
          <PetCard key={pet.id} listing={pet} />
        ))}
      </div>
    </div>
  );
}
