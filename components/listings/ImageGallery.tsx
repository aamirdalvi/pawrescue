/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

interface ImageGalleryProps {
  images?: string[];
  videoUrl?: string;
}

const defaultGradients = [
  "linear-gradient(135deg, #FFE29F 0%, #FFA99F 100%)",
  "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
];

export default function ImageGallery({
  images = defaultGradients,
  videoUrl,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isVideo = (url: string) => url.includes("video") || url.startsWith("blob:video");

  return (
    <div className="space-y-4">
      {/* 1. Large Featured Media Display */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[450px] bg-brand-bg/50 border-2 border-brand-cardboard/35 rounded-3xl overflow-hidden shadow-medium flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center"
            style={{
              background: images[activeIndex].startsWith("linear")
                ? images[activeIndex]
                : undefined,
            }}
          >
            {!images[activeIndex].startsWith("linear") ? (
              <img
                src={images[activeIndex]}
                alt="Active pet listing media"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <span className="text-7xl">🐾</span>
                <span className="text-[10px] font-black text-brand-wood/80 uppercase tracking-widest bg-brand-cardboard/30 px-3 py-1 rounded-full">
                  Media View {activeIndex + 1}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Media count overlay */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full select-none">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Optional video indicator */}
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200 pointer-events-auto cursor-pointer">
              <Play className="w-6 h-6 text-brand-green fill-current ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Horizontal Thumbnails Selector */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
          {images.map((mediaUrl, idx) => {
            const isActive = activeIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: mediaUrl.startsWith("linear") ? mediaUrl : undefined,
                }}
                className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                  isActive
                    ? "border-brand-green scale-105 shadow-sm"
                    : "border-brand-cardboard/30 opacity-70 hover:opacity-100"
                }`}
              >
                {!mediaUrl.startsWith("linear") ? (
                  <img
                    src={mediaUrl}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🐶</span>
                )}
                {isVideo(mediaUrl) && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
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
