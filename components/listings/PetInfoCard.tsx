import React from "react";
import Badge from "@/components/ui/Badge";
import {
  Activity,
  Calendar,
  Layers,
  Scale,
  Compass,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { FormInputs } from "@/types/form";

interface PetInfoCardProps {
  pet: Partial<FormInputs> & { views?: number };
}

export default function PetInfoCard({ pet }: PetInfoCardProps) {
  const statusConfig = {
    lost: { variant: "lost" as const, label: "🚨 Lost Pet" },
    found: { variant: "found" as const, label: "🔍 Found Stray" },
    adopt: { variant: "adopt" as const, label: "🏡 Adoptable" },
    foster: { variant: "foster" as const, label: "🤝 Foster Requested" },
  };

  const currentStatus =
    statusConfig[pet.listingType as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  const infoItems = [
    {
      icon: <Layers className="w-4 h-4 text-brand-wood" />,
      label: "Species",
      value: pet.species || "Unknown",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-brand-wood" />,
      label: "Breed",
      value: pet.breed || "Mixed Breed",
    },
    {
      icon: <Compass className="w-4 h-4 text-brand-wood" />,
      label: "Gender",
      value: pet.gender || "Unknown",
    },
    {
      icon: <Calendar className="w-4 h-4 text-brand-wood" />,
      label: "Age",
      value: pet.age || "Unknown",
    },
    {
      icon: <Activity className="w-4 h-4 text-brand-wood" />,
      label: "Height",
      value: pet.height ? `${pet.height} cm` : "Not Specified",
    },
    {
      icon: <Scale className="w-4 h-4 text-brand-wood" />,
      label: "Weight",
      value: pet.weight ? `${pet.weight} kg` : "Not Specified",
    },
  ];

  return (
    <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
      {/* 1. Header with Badge & Primary Details */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-cardboard/15">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-bold text-brand-wood uppercase tracking-wider block">
              {pet.breed || "Mixed Breed"}
            </span>
            {pet.views !== undefined && (
              <span className="text-[10px] font-black text-brand-wood/80 bg-brand-bg px-2.5 py-0.5 rounded-md flex items-center gap-1 select-none">
                👁 {pet.views} Views
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-brand-brown">
            {pet.petName || "Unnamed Pet"}
          </h1>
        </div>
        <div>
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>
      </div>

      {/* 2. Key Traits Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-brand-bg/30 border border-brand-cardboard/20 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-brand-wood/30 transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-bold text-brand-wood/80 uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-extrabold text-brand-brown capitalize">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Physical & Health Details */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-extrabold text-brand-brown uppercase tracking-wider border-b border-brand-cardboard/10 pb-1.5">
          🎨 Physical & Health status
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-lg">🎨</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider">
                Primary Color
              </span>
              <span className="text-brand-brown font-extrabold text-sm">
                {pet.color || "Not Specified"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-lg">🛡️</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider">
                Vaccination Status
              </span>
              <span
                className={`inline-flex items-center text-xs font-black px-2.5 py-0.5 rounded-full mt-0.5 ${
                  pet.vaccinated
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {pet.vaccinated ? "Up to Date" : "Not Vaccinated"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-lg">✂️</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider">
                Sterilized / Spayed
              </span>
              <span
                className={`inline-flex items-center text-xs font-black px-2.5 py-0.5 rounded-full mt-0.5 ${
                  pet.sterilized
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {pet.sterilized ? "Neutered / Spayed" : "Intact"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Medical Notes */}
      {pet.medicalNotes && (
        <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-extrabold text-amber-900 uppercase tracking-wider mb-1">
              Medical Notes
            </h4>
            <p className="text-brand-brown font-medium leading-relaxed">
              {pet.medicalNotes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
