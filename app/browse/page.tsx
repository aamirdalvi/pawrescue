"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PetCard, { PetListing } from "@/components/cards/PetCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { Search } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";
import Button from "@/components/ui/Button";

export default function BrowsePage() {
  const [listings, setListings] = useState<PetListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch("/api/pets");
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (err) {
        console.error("Failed to fetch browse listings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecies =
        selectedSpecies === "all" || item.species.toLowerCase() === selectedSpecies.toLowerCase();
      
      const matchesType =
        selectedType === "all" || item.listingType.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesSpecies && matchesType;
    });
  }, [listings, searchQuery, selectedSpecies, selectedType]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <Breadcrumb />

      <main className="flex-grow py-8 md:py-12">
        <Container>
          <div className="space-y-8">
            <SectionTitle
              title="Browse Pets"
              subtitle="Search and filter through stray alerts, lost companions, adoption posts, and foster requests."
              align="left"
            />

            {/* Marketplace Search Filter Bar Controls */}
            <div className="bg-white border-2 border-brand-cardboard/40 rounded-3xl p-5 md:p-6 shadow-soft space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Search Bar */}
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-brand-wood/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by breed, city, or title..."
                    className="w-full bg-brand-bg/30 border border-brand-cardboard/35 rounded-xl pl-10 pr-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood"
                  />
                </div>

                {/* Species Filter */}
                <div className="md:col-span-3">
                  <CustomSelect
                    value={selectedSpecies}
                    onChange={setSelectedSpecies}
                    placeholder="All Species"
                    options={[
                      { value: "all", label: "🐾 All Species" },
                      { value: "dog", label: "Dog" },
                      { value: "cat", label: "Cat" },
                      { value: "bird", label: "Bird" },
                      { value: "rabbit", label: "Rabbit" },
                      { value: "others", label: "Others" },
                    ]}
                  />
                </div>

                {/* Type Filter */}
                <div className="md:col-span-3">
                  <CustomSelect
                    value={selectedType}
                    onChange={setSelectedType}
                    placeholder="All Listings"
                    options={[
                      { value: "all", label: "🏷️ All Listings" },
                      { value: "adopt", label: "Adoption" },
                      { value: "lost", label: "Lost" },
                      { value: "found", label: "Found" },
                      { value: "foster", label: "Foster" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            {isLoading ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[...Array(8)].map((_, idx) => (
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
            ) : listings.length === 0 ? (
              /* Premium DB Empty State */
              <div className="bg-white border-2 border-brand-cardboard/35 rounded-3xl p-10 md:p-14 text-center max-w-xl mx-auto shadow-soft space-y-6">
                <div className="w-24 h-24 bg-brand-cardboard/15 border border-brand-cardboard/30 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner animate-bounce duration-[1500ms]">
                  🐶
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-brand-brown">
                    No rescue listings yet.
                  </h3>
                  <p className="text-xs font-bold text-brand-wood/80 leading-relaxed">
                    Be the first in your community to report a lost pet, share a found stray, or make a foster/adoption request.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="lg" href="/listings/add">
                    ➕ Create First Listing
                  </Button>
                </div>
              </div>
            ) : filteredListings.length > 0 ? (
              /* Search Results */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredListings.map((pet) => (
                  <PetCard key={pet._id || pet.id} listing={pet} />
                ))}
              </div>
            ) : (
              /* Filter Results Empty State */
              <div className="text-center py-20 bg-white border border-brand-cardboard/25 rounded-3xl p-8 max-w-lg mx-auto shadow-xs">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-lg font-extrabold text-brand-brown mb-2">
                  No listings found
                </h3>
                <p className="text-xs font-semibold text-brand-wood/80">
                  Try adjusting your keywords, species filters, or listing type alerts.
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
