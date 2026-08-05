"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import {
  Activity,
  Calendar,
  Layers,
  Scale,
  Compass,
  Sparkles,
  MapPin,
  Share2,
  Copy,
  Check,
  AlertCircle,
  Heart,
  User,
  Eye,
} from "lucide-react";
import { PetListing } from "@/components/cards/PetCard";

interface RightPanelCardProps {
  pet: PetListing;
}

export default function RightPanelCard({ pet }: RightPanelCardProps) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const statusConfig = {
    lost: { variant: "danger" as const, label: "🚨 Lost Pet" },
    found: { variant: "warning" as const, label: "🔍 Found Stray" },
    adopt: { variant: "success" as const, label: "🏡 Adopt Me" },
    foster: { variant: "info" as const, label: "🤝 Foster Needed" },
  };

  const currentStatus =
    statusConfig[pet.listingType as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  const formattedDate = pet.createdAt
    ? new Date(pet.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${origin}/pets/${pet._id || pet.id}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Listing link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSaveListing = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved
        ? "Pet removed from your saved list."
        : "Pet saved to your favorites!"
    );
  };

  const handleReportListing = () => {
    const reason = window.prompt(
      "Please provide a reason for reporting this listing:"
    );
    if (reason && reason.trim() !== "") {
      toast.success(
        "Thank you! Our community moderation team has received your report."
      );
    }
  };

  const handleContactOwner = () => {
    const ownerCardElement = document.getElementById("owner-card");
    if (ownerCardElement) {
      ownerCardElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      toast.success(`Owner contact information is at the bottom of the page!`);
    }
  };

  const infoGrid = [
    {
      icon: <Layers className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Species",
      value: pet.species,
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Breed",
      value: pet.breed,
    },
    {
      icon: <Compass className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Gender",
      value: pet.gender,
    },
    {
      icon: <Calendar className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Age",
      value: pet.age,
    },
    {
      icon: <Activity className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Height",
      value: pet.height ? `${pet.height} ${pet.heightUnit || "cm"}` : "Not Specified",
    },
    {
      icon: <Scale className="w-3.5 h-3.5 text-brand-wood" />,
      label: "Weight",
      value: pet.weight ? `${pet.weight} ${pet.weightUnit || "kg"}` : "Not Specified",
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 shadow-glass-lg space-y-6 border-white/90 sticky top-28">
      {/* Header Badge & Name */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={currentStatus.variant} className="shadow-glass-sm">
            {currentStatus.label}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-brand-brown glass-pill px-3 py-1 shadow-glass-sm">
            <Eye className="w-3.5 h-3.5 text-brand-wood" />
            <span>{pet.views || 0} Views</span>
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-brown leading-tight">
            {pet.petName}
          </h1>
          <p className="text-xs font-bold text-brand-wood tracking-wider uppercase mt-1">
            {pet.breed} • {pet.age}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* Traits Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {infoGrid.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-3 rounded-2xl flex flex-col space-y-0.5 border-white/60 hover:border-white transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-wood/80 uppercase tracking-wider">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <span className="text-xs font-extrabold text-brand-brown capitalize truncate">
              {item.value || "—"}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* Health Badges */}
      <div className="space-y-3 text-xs font-bold text-brand-brown">
        <div className="flex items-center justify-between">
          <span className="text-brand-wood">Primary Color:</span>
          <span className="font-extrabold capitalize">{pet.color}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-brand-wood">Vaccination:</span>
          <span
            className={`inline-flex items-center text-[10px] font-black px-2.5 py-0.5 rounded-full ${
              pet.vaccinated
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {pet.vaccinated ? "Up to Date" : "Not Vaccinated"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-brand-wood">Sterilized:</span>
          <span
            className={`inline-flex items-center text-[10px] font-black px-2.5 py-0.5 rounded-full ${
              pet.sterilized
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {pet.sterilized ? "Neutered / Spayed" : "Intact"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-brand-wood">Location:</span>
          <span className="font-extrabold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-green" />
            {pet.city}, {pet.state}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] border-t border-dashed border-brand-cardboard/15 pt-2">
          <span className="text-brand-wood">Posted Date:</span>
          <span className="font-semibold">{formattedDate}</span>
        </div>
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* Buttons Panel */}
      <div className="space-y-2.5">
        <Button
          variant="primary"
          fullWidth
          onClick={handleContactOwner}
          className="flex items-center justify-center gap-2 text-xs py-3.5 shadow-glass-hover"
        >
          <User className="w-4 h-4" /> Contact Owner & Caretaker
        </Button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full flex items-center justify-between text-xs font-bold text-brand-brown hover:text-brand-green glass-panel px-4 py-3 rounded-2xl border-white/70 transition-all duration-200 cursor-pointer focus:outline-hidden"
        >
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-brand-wood" />
            <span>Share Listing</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-brand-green">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Link
              </>
            )}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleSaveListing}
            className={`flex items-center justify-center gap-1.5 text-xs font-extrabold px-3 py-2.5 rounded-2xl border transition-all duration-200 cursor-pointer focus:outline-hidden ${
              isSaved
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "glass-panel text-brand-brown border-white/60 hover:bg-white/80"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : "text-brand-wood"}`} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={handleReportListing}
            className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-red-600 hover:text-red-700 bg-red-50/40 hover:bg-red-50/70 px-3 py-2.5 rounded-2xl border border-red-200/60 transition-all duration-200 cursor-pointer focus:outline-hidden"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
