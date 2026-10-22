"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import PetCard, { PetListing } from "@/components/cards/PetCard";

export default function FeaturedListings() {
  const [listings, setListings] = useState<PetListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch("/api/pets");
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  return (
    <section className="section-spacing bg-brand-bg">
      <Container>
        <SectionTitle
          title="Featured Listings"
          subtitle="Discover active listings of lost, found, adoptable, and foster-requested pets in your region."
          align="left"
        />

        {isLoading ? (
          /* Loading State Skeleton Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-brand-cardboard/20 rounded-3xl p-4 space-y-4 animate-pulse"
              >
                <div className="bg-brand-bg/50 rounded-2xl h-48 w-full" />
                <div className="h-4 bg-brand-bg rounded-md w-3/4" />
                <div className="h-3 bg-brand-bg rounded-md w-1/2" />
                <div className="h-8 bg-brand-bg rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          /* Active Listings Grid */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {listings.slice(0, 8).map((pet, idx) => (
                <motion.div
                  key={pet._id || pet.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    delay: idx * 0.04,
                  }}
                >
                  <PetCard listing={pet} />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="wood" size="lg" href="/browse">
                View All Listings
              </Button>
            </div>
          </>
        ) : (
          /* Premium Empty State */
          <div className="bg-white dark:bg-[#16120D] border-2 border-brand-cardboard/35 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-5 sm:space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-cardboard/15 dark:bg-white/5 border border-brand-cardboard/30 dark:border-white/10 rounded-full mx-auto flex items-center justify-center text-3xl sm:text-4xl shadow-inner animate-bounce duration-[1500ms]">
              🔍
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-brand-brown dark:text-[#FAF5ED]">
                No Listings Yet
              </h3>
              <p className="text-xs font-bold text-brand-wood/80 dark:text-[#C2B3A4] leading-relaxed max-w-md mx-auto">
                Be the first in your community to report a lost pet, share a found stray, or make a foster/adoption request.
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="lg" href="/add-listing">
                ➕ Create First Listing
              </Button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
