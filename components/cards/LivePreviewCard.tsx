/* eslint-disable @next/next/no-img-element */
import React from "react";
import Badge from "@/components/ui/Badge";
import { MapPin, Activity, Mail, Phone, Heart } from "lucide-react";
import { FormInputs } from "@/types/form";

interface LivePreviewCardProps {
  formData: Partial<FormInputs>;
  imagePreviews?: string[];
}

export default function LivePreviewCard({
  formData,
  imagePreviews = [],
}: LivePreviewCardProps) {
  const statusConfig = {
    lost: { variant: "lost" as const, label: "🚨 Lost Pet" },
    found: { variant: "found" as const, label: "🔍 Found Stray" },
    adopt: { variant: "adopt" as const, label: "🏡 Adopt Me" },
    foster: { variant: "foster" as const, label: "🤝 Foster" },
  };

  const currentStatus =
    statusConfig[formData.listingType as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  // Render a responsive animal representation when no custom photos exist
  const speciesEmoji = {
    Dog: "🐶",
    Cat: "🐱",
    Bird: "🦜",
    Rabbit: "🐰",
    "Farm Animal": "🐄",
    Others: "🐾",
  }[formData.species || "Others"] || "🐾";

  return (
    <div className="card-marketplace bg-white border-2 border-brand-cardboard/35 rounded-3xl overflow-hidden shadow-medium flex flex-col h-full">
      {/* 1. Header/Thumbnail Container */}
      <div className="relative h-48 bg-gradient-to-br from-brand-cardboard/20 to-brand-bg shrink-0 flex items-center justify-center border-b border-brand-cardboard/15 shadow-inner">
        {imagePreviews.length > 0 ? (
          <img
            src={imagePreviews[0]}
            alt="Live listing preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <span className="text-5xl">{speciesEmoji}</span>
            <span className="text-[10px] font-black text-brand-wood/80 uppercase tracking-widest bg-brand-cardboard/30 px-3 py-1 rounded-full">
              Photo Preview Placeholder
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>

        <button
          type="button"
          className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white text-red-500 rounded-full shadow-xs transition-transform duration-200 active:scale-90"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title & Breed */}
          <div>
            <span className="text-[10px] font-bold text-brand-wood uppercase tracking-wider block">
              {formData.breed || "Breed Not Specified"}
            </span>
            <h3 className="text-base font-extrabold text-brand-brown line-clamp-1">
              {formData.title || "New Rescue Post"}
            </h3>
          </div>

          {/* Key Traits Grid */}
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl p-2 text-center">
              <span className="text-[9px] font-bold text-brand-wood block uppercase tracking-wider">
                Name
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.petName || "Unknown"}
              </span>
            </div>
            <div className="bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl p-2 text-center">
              <span className="text-[9px] font-bold text-brand-wood block uppercase tracking-wider">
                Gender
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.gender || "Unknown"}
              </span>
            </div>
            <div className="bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl p-2 text-center">
              <span className="text-[9px] font-bold text-brand-wood block uppercase tracking-wider">
                Age
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.age ? `${formData.age}` : "Unknown"}
              </span>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-brand-wood font-semibold">
            {formData.color && (
              <span>
                🎨 <strong className="text-brand-brown">Color:</strong> {formData.color}
              </span>
            )}
            {formData.height && (
              <span>
                📏 <strong className="text-brand-brown">H:</strong> {formData.height}
              </span>
            )}
            {formData.weight && (
              <span>
                ⚖️ <strong className="text-brand-brown">W:</strong> {formData.weight}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-brand-wood/90 leading-relaxed line-clamp-3 italic pt-1">
            {formData.description || "Describe the pet details to see them live here..."}
          </p>
        </div>

        {/* 3. Caretaker & Health Summary */}
        <div className="pt-3 border-t border-brand-cardboard/15 space-y-2.5">
          {/* Health Stats */}
          <div className="flex flex-wrap gap-2">
            {formData.vaccinated && (
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                <Activity className="w-3 h-3 mr-1" /> Vaccinated
              </span>
            )}
            {formData.sterilized && (
              <span className="inline-flex items-center text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                ✂️ Sterilized
              </span>
            )}
          </div>

          {/* Location & Contact Info */}
          <div className="space-y-1.5 text-[10px] font-bold text-brand-brown">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-wood shrink-0" />
              <span className="truncate">
                {formData.city || "City"}, {formData.state || "State"}
              </span>
            </div>

            {formData.ownerName && (
              <div className="flex items-center justify-between text-brand-wood/80 pt-1 border-t border-brand-cardboard/10">
                <div className="flex items-center gap-1.5">
                  <span className="bg-brand-cardboard/25 text-brand-wood text-[9px] px-1.5 py-0.5 rounded-sm">
                    Owner
                  </span>
                  <span className="truncate">{formData.ownerName}</span>
                </div>
                <div className="flex gap-2">
                  {formData.phone && <Phone className="w-3 h-3 text-brand-wood" />}
                  {formData.email && <Mail className="w-3 h-3 text-brand-wood" />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
