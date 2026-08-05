"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface ImageGalleryProps {
  images?: string[];
  videoUrl?: string;
  species?: string;
  petName?: string;
  listingId?: string;
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

export default function ImageGallery({
  images = [],
  videoUrl,
  species = "others",
  petName = "",
  listingId = "",
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImages = images && images.length > 0 ? images : ["placeholder"];
  const isVideo = (url: string) => url.includes("video") || url.startsWith("blob:video");

  const speciesLower = (species?.toLowerCase() || "others") as
    | "dog"
    | "cat"
    | "rabbit"
    | "bird"
    | "others";

  const speciesEmojiMap = {
    dog: "🐶",
    cat: "🐱",
    rabbit: "🐰",
    bird: "🐦",
    others: "🐾",
  };

  const speciesEmoji = speciesEmojiMap[speciesLower] || speciesEmojiMap.others;
  const mainGradient = getGradient(listingId + petName);

  const renderPetPlaceholder = (gradient: string) => {
    const fillColors = {
      dog: "#9A6B3F",
      cat: "#4E342E",
      rabbit: "#E7C79F",
      bird: "#5FA85B",
      others: "#B8E6FF",
    };

    const color = fillColors[speciesLower] || fillColors.others;

    return (
      <div style={{ background: gradient }} className="w-full h-full relative flex items-center justify-center">
        <svg
          viewBox="0 0 200 160"
          className="w-[200px] h-[160px] object-cover transition-transform duration-300"
        >
          <circle cx="100" cy="80" r="50" fill="#FFFFFF" opacity="0.3" />
          {speciesLower === "dog" && (
            <g fill={color}>
              <circle cx="100" cy="70" r="22" />
              <rect x="85" y="85" width="30" height="30" rx="8" />
              <circle cx="92" cy="68" r="2" fill="#FFFFFF" />
              <circle cx="108" cy="68" r="2" fill="#FFFFFF" />
            </g>
          )}
          {speciesLower === "cat" && (
            <g fill={color}>
              <circle cx="100" cy="70" r="20" />
              <rect x="86" y="85" width="28" height="28" rx="8" />
              <polygon points="85,55 93,70 85,70" />
              <polygon points="115,55 107,70 115,70" />
            </g>
          )}
          {speciesLower === "rabbit" && (
            <g fill={color}>
              <ellipse cx="100" cy="85" rx="25" ry="18" />
              <circle cx="118" cy="70" r="10" />
            </g>
          )}
          {speciesLower === "bird" && (
            <g fill={color}>
              <circle cx="100" cy="75" r="18" />
              <polygon points="116,70 125,74 116,78" fill="#FFC107" />
            </g>
          )}
          {speciesLower === "others" && (
            <g fill={color}>
              <circle cx="100" cy="80" r="24" />
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Large Featured Media Display */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[480px] glass-panel rounded-3xl overflow-hidden shadow-glass-lg border-white/90 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center relative"
          >
            {activeImages[activeIndex] !== "placeholder" && !activeImages[activeIndex].startsWith("linear") ? (
              <Image
                src={activeImages[activeIndex]}
                alt={`${petName || "Pet"} listing media`}
                fill
                priority
                className="object-cover"
                unoptimized
              />
            ) : (
              renderPetPlaceholder(mainGradient)
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Glass Counter Badge */}
        <div className="absolute bottom-4 right-4 glass-pill text-white text-xs font-black px-4 py-1.5 shadow-glass-sm z-10 bg-black/40 border-white/20">
          {activeIndex + 1} / {activeImages.length}
        </div>

        {/* Video Play Overlay */}
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-16 h-16 glass-pill bg-white/95 rounded-full flex items-center justify-center shadow-glass-lg transform hover:scale-110 transition-transform duration-200 pointer-events-auto cursor-pointer">
              <Play className="w-6 h-6 text-brand-green fill-current ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Liquid Glass Thumbnails Selector */}
      {activeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
          {activeImages.map((mediaUrl, idx) => {
            const isActive = activeIndex === idx;
            const thumbGradient = getGradient(listingId + petName + idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-20 h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 cursor-pointer relative flex items-center justify-center ${
                  isActive
                    ? "border-brand-green scale-105 shadow-glass-sm ring-2 ring-brand-green/20"
                    : "border-white/60 opacity-70 hover:opacity-100"
                }`}
              >
                {mediaUrl !== "placeholder" && !mediaUrl.startsWith("linear") ? (
                  <Image
                    src={mediaUrl}
                    alt={`Thumbnail ${idx}`}
                    width={80}
                    height={64}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div
                    style={{ background: thumbGradient }}
                    className="w-full h-full flex items-center justify-center text-xl select-none"
                  >
                    {speciesEmoji}
                  </div>
                )}
                {isVideo(mediaUrl) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
