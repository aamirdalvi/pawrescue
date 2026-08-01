import React from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Calendar, Heart } from "lucide-react";

export interface PetListing {
  _id?: string;
  id?: string;
  title: string;
  petName: string;
  species: string; // dog, cat, rabbit, bird, others
  breed: string;
  gender: string;
  age: string;
  height?: string;
  weight?: string;
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
  updatedAt?: string;
}

interface PetCardProps {
  listing: PetListing;
}

const colorSchemes = [
  "linear-gradient(135deg, #FFE29F 0%, #FFA99F 100%)",
  "linear-gradient(135deg, #B5FFFC 0%, #FFDEE9 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
  "linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)",
  "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)",
  "linear-gradient(135deg, #FDFBF7 0%, #E1DEC9 100%)",
  "linear-gradient(135deg, #E2EBF0 0%, #CFD9DF 100%)",
];

const getGradient = (id: string = "") => {
  let sum = 0;
  for (let i = 0; i < id.length; i++) {
    sum += id.charCodeAt(i);
  }
  return colorSchemes[sum % colorSchemes.length];
};

export default function PetCard({ listing }: PetCardProps) {
  const listingId = listing._id || listing.id || "";
  const name = listing.petName;
  const breed = listing.breed;
  const age = listing.age;
  const gender = listing.gender;
  const location = `${listing.city}, ${listing.state}`;
  const status = listing.listingType;
  const species = (listing.species?.toLowerCase() || "others") as
    | "dog"
    | "cat"
    | "rabbit"
    | "bird"
    | "others";
  const gradient = getGradient(listingId + name);

  // Map listing status to corresponding badge variant and label
  const statusConfig = {
    lost: { variant: "danger" as const, label: "🚨 Lost Pet" },
    found: { variant: "warning" as const, label: "🔍 Found Stray" },
    adopt: { variant: "success" as const, label: "🏡 Adopt Me" },
    foster: { variant: "info" as const, label: "🤝 Foster Needed" },
  };

  const currentStatus =
    statusConfig[status as "lost" | "found" | "adopt" | "foster"] ||
    statusConfig.adopt;

  // Helper to render stylized SVG animal placeholders representing each pet type
  const renderPetPlaceholder = () => {
    const fillColors = {
      dog: "#9A6B3F",
      cat: "#4E342E",
      rabbit: "#E7C79F",
      bird: "#5FA85B",
      others: "#B8E6FF",
    };

    const color = fillColors[species] || fillColors.others;

    return (
      <div style={{ background: gradient }} className="w-full h-full relative">
        <svg
          viewBox="0 0 200 160"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
          {/* Soft circle highlight */}
          <circle cx="100" cy="80" r="50" fill="#FFFFFF" opacity="0.3" />
          {species === "dog" && (
            <g fill={color}>
              <circle cx="100" cy="70" r="22" />
              <rect x="85" y="85" width="30" height="30" rx="8" />
              <circle cx="92" cy="68" r="2" fill="#FFFFFF" />
              <circle cx="108" cy="68" r="2" fill="#FFFFFF" />
              <path
                d="M78 54 Q72 65 82 74"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M122 54 Q128 65 118 74"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
          {species === "cat" && (
            <g fill={color}>
              <circle cx="100" cy="70" r="20" />
              <rect x="86" y="85" width="28" height="28" rx="8" />
              <polygon points="85,55 93,70 85,70" />
              <polygon points="115,55 107,70 115,70" />
              <circle cx="93" cy="68" r="2.5" fill="#B8E6FF" />
              <circle cx="107" cy="68" r="2.5" fill="#B8E6FF" />
            </g>
          )}
          {species === "rabbit" && (
            <g fill={color}>
              <ellipse cx="100" cy="85" rx="25" ry="18" />
              <circle cx="118" cy="70" r="10" />
              <ellipse
                cx="114"
                cy="52"
                rx="3"
                ry="10"
                transform="rotate(-10 114 52)"
              />
              <ellipse
                cx="122"
                cy="52"
                rx="3"
                ry="10"
                transform="rotate(10 122 52)"
              />
              <circle cx="120" cy="68" r="1.5" fill="#FFA7A7" />
            </g>
          )}
          {species === "bird" && (
            <g fill={color}>
              <circle cx="100" cy="75" r="18" />
              <path d="M100 75 Q120 70 116 90 Z" />
              <polygon points="116,70 125,74 116,78" fill="#FFC107" />
              <circle cx="108" cy="70" r="2" fill="#FFFFFF" />
            </g>
          )}
          {species === "others" && (
            <g fill={color}>
              <circle cx="100" cy="80" r="24" />
              <path d="M100 50 L115 70 L85 70 Z" />
              <circle cx="94" cy="78" r="3" fill="#4E342E" />
              <circle cx="106" cy="78" r="3" fill="#4E342E" />
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <article className="group bg-white border border-brand-cardboard/25 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-brand-cardboard transition-all duration-300 flex flex-col h-full">
      {/* Listing Cover Photo */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-brand-bg">
        {renderPetPlaceholder()}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-xs rounded-full text-brand-brown hover:text-red-500 shadow-soft transition-all duration-200 cursor-pointer"
          aria-label="Save pet to favorites"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Listing Content Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="font-extrabold text-brand-brown text-lg group-hover:text-brand-green transition-colors duration-200 truncate"
            title={listing.title}
          >
            {name}
          </h3>
          <span className="text-xs font-bold text-brand-wood bg-brand-cardboard/10 px-2 py-0.5 rounded-md">
            {gender}
          </span>
        </div>

        {/* Breed & Age */}
        <p className="text-sm font-semibold text-brand-wood mb-4 truncate">
          {breed} • {age}
        </p>

        {/* Location & Metadata info */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center text-xs font-bold text-brand-brown/85 gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-wood shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-xs font-bold text-brand-brown/85 gap-2">
            <Calendar className="w-3.5 h-3.5 text-brand-wood shrink-0" />
            <span>Active Listing</span>
          </div>
        </div>

        {/* Bottom Button wrapper */}
        <div className="mt-auto pt-3 border-t border-brand-cardboard/15">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            href={`/listings/${listingId}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
