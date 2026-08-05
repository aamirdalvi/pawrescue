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
  Eye,
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
      value: pet.height ? `${pet.height} ${pet.heightUnit || "cm"}` : "Not Specified",
    },
    {
      icon: <Scale className="w-4 h-4 text-brand-wood" />,
      label: "Weight",
      value: pet.weight ? `${pet.weight} ${pet.weightUnit || "kg"}` : "Not Specified",
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 shadow-glass-lg space-y-6 border-white/90">
      {/* 1. Header with Badge & Primary Details */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-cardboard/15">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-bold text-brand-wood uppercase tracking-wider block">
              {pet.breed || "Mixed Breed"}
            </span>
            {pet.views !== undefined && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-brand-brown glass-pill px-3 py-0.5 shadow-glass-sm">
                <Eye className="w-3.5 h-3.5 text-brand-wood" />
                <span>{pet.views} Views</span>
              </span>
            )}
          </div>
          <h1 className="text-3xl font-black text-brand-brown">
            {pet.petName || "Unnamed Pet"}
          </h1>
        </div>
        <div>
          <Badge variant={currentStatus.variant} className="shadow-glass-sm">
            {currentStatus.label}
          </Badge>
        </div>
      </div>

      {/* 2. Key Traits Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-white transition-colors"
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
        <h3 className="text-xs font-extrabold text-brand-brown uppercase tracking-wider border-b border-brand-cardboard/10 pb-2 flex items-center gap-2">
          <span>🎨</span> Physical & Health Parameters
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass-panel p-3.5 rounded-2xl flex items-center space-x-3">
            <span className="text-xl">🎨</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider text-[10px]">
                Primary Color
              </span>
              <span className="text-brand-brown font-extrabold text-xs capitalize">
                {pet.color || "Not Specified"}
              </span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center space-x-3">
            <span className="text-xl">🛡️</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider text-[10px]">
                Vaccination Status
              </span>
              <span
                className={`inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-full mt-0.5 ${
                  pet.vaccinated
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {pet.vaccinated ? "Up to Date" : "Not Vaccinated"}
              </span>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center space-x-3">
            <span className="text-xl">✂️</span>
            <div className="text-xs">
              <span className="text-brand-wood block font-bold uppercase tracking-wider text-[10px]">
                Sterilized / Spayed
              </span>
              <span
                className={`inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-full mt-0.5 ${
                  pet.sterilized
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {pet.sterilized ? "Neutered / Spayed" : "Intact"}
              </span>
            </div>
          </div>
        </div>

        {/* Behavioral Traits */}
        <div className="flex flex-wrap gap-2 pt-2">
          {pet.microchipped && (
            <span className="glass-pill px-3 py-1 text-xs font-extrabold text-purple-800 bg-purple-50/60 border-purple-200">
              🏷️ Microchipped
            </span>
          )}
          {pet.specialNeeds && (
            <span className="glass-pill px-3 py-1 text-xs font-extrabold text-amber-800 bg-amber-50/60 border-amber-200">
              ♿ Special Needs
            </span>
          )}
          {pet.friendlyChildren && (
            <span className="glass-pill px-3 py-1 text-xs font-extrabold text-teal-800 bg-teal-50/60 border-teal-200">
              👶 Kids Friendly
            </span>
          )}
          {pet.friendlyDogs && (
            <span className="glass-pill px-3 py-1 text-xs font-extrabold text-indigo-800 bg-indigo-50/60 border-indigo-200">
              🐶 Dogs Friendly
            </span>
          )}
          {pet.friendlyCats && (
            <span className="glass-pill px-3 py-1 text-xs font-extrabold text-pink-800 bg-pink-50/60 border-pink-200">
              🐱 Cats Friendly
            </span>
          )}
        </div>
      </div>

      {/* 4. Medical Notes */}
      {pet.medicalNotes && (
        <div className="glass-panel bg-amber-50/40 border-amber-200 rounded-2xl p-4 flex gap-3">
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
