"use client";

import React, { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Calendar, Heart, Eye } from "lucide-react";
import toast from "react-hot-toast";

export interface PetListing {
  _id?: string;
  id?: string;
  title: string;
  petName: string;
  species: string; // dog, cat, rabbit, bird, cow, horse, others
  breed: string;
  gender: string;
  age: string;
  height?: string;
  heightUnit?: string;
  weight?: string;
  weightUnit?: string;
  color: string;
  listingType: string;
  vaccinated: boolean;
  sterilized: boolean;
  description: string;
  images?: string[];
  videos?: string[];
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  area?: string;
  address?: string;
  pincode?: string;
  views?: number;
  preferredContact?: string;
  medicalNotes?: string;
  country?: string;
  createdAt?: string;
}

interface PetCardProps {
  listing: PetListing;
}

const speciesEmojiMap: Record<string, string> = {
  dog: "🐶",
  cat: "🐱",
  rabbit: "🐰",
  bird: "🐦",
  cow: "🐄",
  horse: "🐴",
  others: "🐾",
};

export default function PetCard({ listing }: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const statusConfig = {
    lost: { variant: "danger" as const, label: "🚨 Lost Pet" },
    found: { variant: "warning" as const, label: "🔍 Found Stray" },
    adopt: { variant: "success" as const, label: "🏡 Adopt Me" },
    foster: { variant: "info" as const, label: "🤝 Foster Needed" },
  };

  const currentStatus =
    statusConfig[listing.listingType as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  const speciesLower = (listing.species?.toLowerCase() || "others") as string;
  const fallbackEmoji = speciesEmojiMap[speciesLower] || "🐾";

  const mongoId = listing._id || listing.id || "";
  const detailsHref = `/pets/${mongoId}`;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite
        ? `Removed ${listing.petName} from favorites`
        : `Saved ${listing.petName} to your favorites!`
    );
  };

  const hasValidImage =
    listing.images &&
    listing.images.length > 0 &&
    listing.images[0] &&
    listing.images[0].trim() !== "" &&
    !imgError;

  return (
    <div className="glass-card group flex flex-col h-full overflow-hidden shadow-glass-md hover:shadow-glass-hover transition-all duration-300 border-white/90">
      {/* 1. Hero Image Container */}
      <div className="relative h-56 w-full bg-gradient-to-br from-brand-cardboard/25 via-brand-bg to-brand-cardboard/15 overflow-hidden shrink-0 border-b border-brand-cardboard/15">
        
        {/* Loading Skeleton */}
        {!imgLoaded && hasValidImage && (
          <div className="absolute inset-0 bg-brand-cardboard/20 animate-pulse z-0" />
        )}

        {hasValidImage ? (
          <Image
            src={listing.images![0]}
            alt={listing.petName || "Pet photo"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-emerald-100/40">
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
              {fallbackEmoji}
            </span>
            <span className="text-[10px] font-black text-brand-brown uppercase tracking-wider mt-2 glass-pill px-3 py-1 bg-white/80">
              {listing.species}
            </span>
          </div>
        )}

        {/* Gradient Overlay for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/70 via-brand-brown/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />

        {/* Floating Glass Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <Badge variant={currentStatus.variant} className="shadow-glass-sm">
            {currentStatus.label}
          </Badge>
        </div>

        {/* Floating Glass Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          type="button"
          aria-label="Favorite pet"
          className={`absolute top-3.5 right-3.5 p-2.5 glass-pill rounded-full shadow-glass-sm transition-all duration-300 z-20 cursor-pointer active:scale-90 ${
            isFavorite
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : "bg-white/80 hover:bg-white text-brand-wood"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              isFavorite ? "fill-rose-500 text-rose-500 scale-110" : ""
            }`}
          />
        </button>

        {/* Views & Breed overlay tag on bottom of image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between text-white text-xs font-bold">
          <span className="truncate drop-shadow-sm font-extrabold uppercase tracking-wider text-[11px]">
            {listing.breed}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-black glass-pill px-2.5 py-0.5 bg-black/40 text-white border-white/20">
            <Eye className="w-3 h-3" /> {listing.views || 0}
          </span>
        </div>
      </div>

      {/* 2. Glass Details Body */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-xl font-black text-brand-brown truncate group-hover:text-grass-green transition-colors">
              {listing.petName}
            </h3>
            <span className="text-xs font-black text-brand-wood glass-pill px-2.5 py-0.5 bg-brand-bg/50">
              {listing.age}
            </span>
          </div>

          {/* Quick Traits Badges */}
          <div className="flex flex-wrap items-center gap-1.5 py-1.5">
            <span className="text-[10px] font-extrabold text-brand-brown glass-pill px-2.5 py-0.5 bg-white/70">
              {listing.gender}
            </span>
            <span className="text-[10px] font-extrabold text-brand-brown glass-pill px-2.5 py-0.5 bg-white/70 capitalize">
              🎨 {listing.color}
            </span>
            {listing.vaccinated && (
              <span className="text-[10px] font-extrabold text-emerald-800 glass-pill px-2.5 py-0.5 bg-emerald-50 border-emerald-200">
                🛡️ Vaccinated
              </span>
            )}
          </div>

          <p className="text-xs text-brand-wood/90 leading-relaxed font-semibold line-clamp-2 mt-1">
            {listing.description || "Looking for a loving home..."}
          </p>
        </div>

        {/* 3. Location & Action CTA */}
        <div className="pt-3 border-t border-brand-cardboard/20 flex items-center justify-between gap-2">
          <div className="flex items-center text-xs font-extrabold text-brand-brown truncate max-w-[55%]">
            <MapPin className="w-3.5 h-3.5 text-grass-green shrink-0 mr-1" />
            <span className="truncate">{listing.city}, {listing.state}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            href={detailsHref}
            className="shadow-glass-sm py-2 px-4 text-xs font-black"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
