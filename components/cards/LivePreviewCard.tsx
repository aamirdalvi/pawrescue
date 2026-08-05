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
    lost: { variant: "danger" as const, label: "🚨 Lost Pet" },
    found: { variant: "warning" as const, label: "🔍 Found Stray" },
    adopt: { variant: "success" as const, label: "🏡 Adopt Me" },
    foster: { variant: "info" as const, label: "🤝 Foster" },
  };

  const currentStatus =
    statusConfig[formData.listingType as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  const speciesEmoji: Record<string, string> = {
    Dog: "🐶",
    Cat: "🐱",
    Rabbit: "🐰",
    Bird: "🦜",
    Cow: "🐄",
    Horse: "🐴",
    Goat: "🐐",
    Buffalo: "🦬",
    Other: "🐾",
  };

  const emoji = speciesEmoji[formData.species || "Other"] || "🐾";

  const activeImage =
    imagePreviews && imagePreviews.length > 0
      ? imagePreviews[0]
      : formData.images && formData.images.length > 0
      ? formData.images[0]
      : null;

  return (
    <div className="glass-card rounded-3xl overflow-hidden shadow-glass-md flex flex-col h-full transition-all duration-300 border-white/90">
      {/* 1. Image / Animal Illustration Display */}
      <div className="relative h-48 bg-gradient-to-br from-brand-cardboard/20 via-brand-bg to-brand-cardboard/10 shrink-0 flex items-center justify-center border-b border-brand-cardboard/15 shadow-inner">
        {activeImage ? (
          <img
            src={activeImage}
            alt="Live listing preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <span className="text-5xl">{emoji}</span>
            <span className="text-[10px] font-black text-brand-wood uppercase tracking-widest glass-pill px-3 py-1">
              Photo Preview Placeholder
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 z-10">
          <Badge variant={currentStatus.variant} className="shadow-glass-sm">
            {currentStatus.label}
          </Badge>
        </div>

        <button
          type="button"
          className="absolute top-3 right-3 p-2 glass-pill bg-white/90 text-red-500 rounded-full shadow-glass-sm transition-transform duration-200 active:scale-90 z-10 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* 2. Content Body */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Title & Breed */}
          <div>
            <span className="text-[10px] font-bold text-brand-wood/80 uppercase tracking-wider block">
              {formData.breed || "Breed Not Specified"}
            </span>
            <h3 className="text-base font-extrabold text-brand-brown line-clamp-1">
              {formData.title || "New Rescue Listing"}
            </h3>
          </div>

          {/* Key Traits Grid */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="glass-panel p-2 text-center rounded-xl border-white/60">
              <span className="text-[9px] font-bold text-brand-wood/80 block uppercase tracking-wider">
                Name
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.petName || "Unknown"}
              </span>
            </div>
            <div className="glass-panel p-2 text-center rounded-xl border-white/60">
              <span className="text-[9px] font-bold text-brand-wood/80 block uppercase tracking-wider">
                Gender
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.gender || "Unknown"}
              </span>
            </div>
            <div className="glass-panel p-2 text-center rounded-xl border-white/60">
              <span className="text-[9px] font-bold text-brand-wood/80 block uppercase tracking-wider">
                Age
              </span>
              <span className="text-xs font-extrabold text-brand-brown block truncate">
                {formData.age || "Unknown"}
              </span>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-wood font-semibold">
            {formData.color && (
              <span>
                🎨 <strong className="text-brand-brown">{formData.color}</strong>
              </span>
            )}
            {formData.height && (
              <span>
                📏 <strong className="text-brand-brown">{formData.height} {formData.heightUnit || "cm"}</strong>
              </span>
            )}
            {formData.weight && (
              <span>
                ⚖️ <strong className="text-brand-brown">{formData.weight} {formData.weightUnit || "kg"}</strong>
              </span>
            )}
          </div>

          {/* Description Preview */}
          <p className="text-xs text-brand-wood/90 leading-relaxed line-clamp-3 italic pt-0.5">
            {formData.description || "Describe the pet details to see them live here..."}
          </p>
        </div>

        {/* 3. Caretaker & Health Summary */}
        <div className="pt-3 border-t border-brand-cardboard/15 space-y-2.5">
          {/* Health Badges */}
          <div className="flex flex-wrap gap-1.5">
            {formData.vaccinated && (
              <span className="glass-pill text-[10px] font-bold text-emerald-700 bg-emerald-50/70 border-emerald-200 px-2 py-0.5">
                <Activity className="w-3 h-3 mr-1 inline" /> Vaccinated
              </span>
            )}
            {formData.sterilized && (
              <span className="glass-pill text-[10px] font-bold text-blue-700 bg-blue-50/70 border-blue-200 px-2 py-0.5">
                ✂️ Sterilized
              </span>
            )}
            {formData.microchipped && (
              <span className="glass-pill text-[10px] font-bold text-purple-700 bg-purple-50/70 border-purple-200 px-2 py-0.5">
                🏷️ Chipped
              </span>
            )}
            {formData.specialNeeds && (
              <span className="glass-pill text-[10px] font-bold text-amber-700 bg-amber-50/70 border-amber-200 px-2 py-0.5">
                ♿ Special Needs
              </span>
            )}
            {formData.friendlyChildren && (
              <span className="glass-pill text-[10px] font-bold text-teal-700 bg-teal-50/70 border-teal-200 px-2 py-0.5">
                👶 Kids Friendly
              </span>
            )}
          </div>

          {/* Location & Contact Info */}
          <div className="space-y-1.5 text-[10px] font-bold text-brand-brown">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0" />
              <span className="truncate">
                {formData.city || "City"}, {formData.state || "State"}{formData.country ? `, ${formData.country}` : ""}
              </span>
            </div>

            {formData.ownerName && (
              <div className="flex items-center justify-between text-brand-wood/80 pt-1.5 border-t border-brand-cardboard/10">
                <div className="flex items-center gap-1.5">
                  <span className="glass-pill text-brand-wood text-[9px] font-bold px-2 py-0.5 uppercase">
                    Caretaker
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
