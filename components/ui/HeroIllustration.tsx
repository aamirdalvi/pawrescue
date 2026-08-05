"use client";

import React from "react";
import { Heart, ShieldCheck } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="w-full max-w-[560px] mx-auto relative select-none py-2 sm:py-4">
      {/* Organic Animated Gradient Ambient Blobs */}
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-gradient-to-tr from-amber-300/40 via-orange-200/30 to-emerald-200/20 rounded-full blur-3xl animate-blob-slow z-0" />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-gradient-to-br from-emerald-300/30 via-teal-200/30 to-sky-200/30 rounded-full blur-3xl animate-blob-reverse z-0" />

      {/* Main Glass Illustration Card */}
      <div className="relative glass-card p-4 sm:p-6 md:p-8 rounded-3xl overflow-hidden shadow-glass-lg border-white/90 z-10">
        
        {/* Floating 3D/Glass Play Items & Accessories (Visible on sm+ screens) */}
        {/* 1. Floating Red Heart */}
        <div className="hidden sm:flex absolute top-5 left-5 glass-pill px-3.5 py-1.5 items-center gap-1.5 text-xs font-black text-rose-600 animate-float-slow shadow-glass-sm z-30">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Love & Care</span>
        </div>

        {/* 2. Floating Bone */}
        <div className="hidden sm:flex absolute top-10 right-6 glass-pill px-3.5 py-1.5 items-center gap-1.5 text-xs font-black text-amber-800 animate-float-delayed shadow-glass-sm z-30">
          <span>🦴</span>
          <span>Tasty Treats</span>
        </div>

        {/* 3. Floating Food Bowl */}
        <div className="hidden sm:flex absolute bottom-16 left-5 glass-pill px-3.5 py-1.5 items-center gap-1.5 text-xs font-extrabold text-brand-brown animate-float-slow shadow-glass-sm z-30" style={{ animationDelay: "1s" }}>
          <span>🥣</span>
          <span>Daily Care</span>
        </div>

        {/* 4. Floating Cat Yarn Toy */}
        <div className="hidden sm:flex absolute bottom-14 right-5 glass-pill px-3.5 py-1.5 items-center gap-1.5 text-xs font-extrabold text-blue-700 animate-float-delayed shadow-glass-sm z-30">
          <span>🧶</span>
          <span>Playful</span>
        </div>

        {/* 5. Floating Paw Print */}
        <div className="hidden sm:block absolute top-1/2 left-2 -translate-y-1/2 glass-pill p-2.5 text-xl animate-float-slow z-30 shadow-glass-sm">
          <span>🐾</span>
        </div>

        {/* 6. Floating Green Leaf */}
        <div className="hidden sm:block absolute top-1/3 right-3 glass-pill p-2 text-xl animate-float-delayed z-30 shadow-glass-sm">
          <span>🍃</span>
        </div>

        {/* Central High-Fidelity SVG Scene */}
        <div className="relative z-20 my-2">
          <svg
            viewBox="0 0 500 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
          >
            {/* Background Soft Glow Rays */}
            <circle cx="250" cy="180" r="155" fill="url(#sunGlow)" opacity="0.85" />
            
            {/* Ground Ellipse */}
            <ellipse cx="250" cy="335" rx="210" ry="42" fill="url(#groundGlow)" opacity="0.7" />

            {/* Central Golden Retriever Dog */}
            <g className="animate-float-slow">
              {/* Dog Body */}
              <rect x="180" y="215" width="140" height="115" rx="36" fill="url(#dogGolden)" />
              {/* Dog Chest Fur */}
              <path d="M 208 225 C 230 252 270 252 292 225 C 280 295 220 295 208 225 Z" fill="#FFF9ED" opacity="0.95" />
              {/* Collar & Tag */}
              <rect x="198" y="208" width="104" height="15" rx="7.5" fill="#2E5A44" />
              <circle cx="250" cy="225" r="9" fill="#E68A2E" />
              <circle cx="250" cy="225" r="4.5" fill="#FFFFFF" />

              {/* Dog Head */}
              <rect x="194" y="125" width="112" height="96" rx="32" fill="url(#dogGolden)" />
              
              {/* Ears */}
              <path d="M 178 140 C 158 168 168 212 194 200 Z" fill="#C97E2C" />
              <path d="M 322 140 C 342 168 332 212 306 200 Z" fill="#C97E2C" />
              
              {/* Snout & Cute Nose */}
              <ellipse cx="250" cy="186" rx="26" ry="19" fill="#FFF5DF" />
              <ellipse cx="250" cy="176" rx="11" ry="7.5" fill="#2D1E18" />
              <path d="M 250 183.5 Q 240 196 250 199 Q 260 196 250 183.5" fill="#E56A54" />

              {/* Sparkle Eyes */}
              <circle cx="224" cy="158" r="6.5" fill="#2D1E18" />
              <circle cx="222" cy="156" r="2.8" fill="#FFFFFF" />
              <circle cx="276" cy="158" r="6.5" fill="#2D1E18" />
              <circle cx="274" cy="156" r="2.8" fill="#FFFFFF" />
            </g>

            {/* Cozy Orange Cat Friend */}
            <g className="animate-float-delayed">
              {/* Cat Body */}
              <rect x="115" y="245" width="72" height="78" rx="24" fill="#E67E22" />
              {/* Cat Stripes */}
              <path d="M 130 260 Q 140 265 130 275 M 172 260 Q 162 265 172 275" stroke="#D35400" strokeWidth="3" strokeLinecap="round" />
              {/* Cat Head */}
              <circle cx="151" cy="220" r="30" fill="#E67E22" />
              {/* Cat Ears */}
              <polygon points="128,198 140,180 148,198" fill="#D35400" />
              <polygon points="174,198 162,180 154,198" fill="#D35400" />
              {/* Eyes */}
              <circle cx="142" cy="216" r="4.5" fill="#2ECC71" />
              <circle cx="160" cy="216" r="4.5" fill="#2ECC71" />
            </g>

            {/* Cute White Bunny */}
            <g className="animate-float-slow" style={{ animationDelay: "1.5s" }}>
              <ellipse cx="340" cy="290" rx="30" ry="24" fill="#FFFFFF" />
              <circle cx="356" cy="270" r="14" fill="#FFFFFF" />
              {/* Bunny Ears */}
              <ellipse cx="350" cy="245" rx="4.5" ry="15" fill="#FFFFFF" transform="rotate(-15 350 245)" />
              <ellipse cx="350" cy="245" rx="2.5" ry="11" fill="#FFB6C1" transform="rotate(-15 350 245)" />
              <ellipse cx="362" cy="245" rx="4.5" ry="15" fill="#FFFFFF" transform="rotate(10 362 245)" />
              <ellipse cx="362" cy="245" rx="2.5" ry="11" fill="#FFB6C1" transform="rotate(10 362 245)" />
              <circle cx="360" cy="268" r="1.8" fill="#E56A54" />
            </g>

            {/* Floating Sparkles in SVG */}
            <circle cx="105" cy="95" r="7" fill="#E56A54" opacity="0.85" className="animate-pulse" />
            <circle cx="395" cy="115" r="9" fill="#F2A93B" opacity="0.85" className="animate-pulse" />
            <circle cx="425" cy="255" r="6" fill="#3B7A57" opacity="0.85" className="animate-pulse" />

            {/* Gradients */}
            <defs>
              <linearGradient id="sunGlow" x1="100" y1="30" x2="400" y2="330" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF3E0" />
                <stop offset="0.5" stopColor="#FFE0B2" stopOpacity="0.6" />
                <stop offset="1" stopColor="#E8F5E9" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="dogGolden" x1="180" y1="125" x2="320" y2="330" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5C67C" />
                <stop offset="1" stopColor="#D89235" />
              </linearGradient>
              <linearGradient id="groundGlow" x1="50" y1="335" x2="450" y2="335" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B9E87" stopOpacity="0.4" />
                <stop offset="1" stopColor="#2E5A44" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Bottom Trust Badge */}
        <div className="relative z-30 mt-3 glass-pill py-2.5 px-4 sm:py-3 sm:px-5 flex flex-col sm:flex-row items-center justify-between text-xs font-black text-brand-brown bg-white/90 shadow-glass-sm gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-brand-brown">1,200+ Pets Rescued & Adopted</span>
          </div>
          <span className="text-brand-golden flex items-center gap-1 font-black">
            <ShieldCheck className="w-4 h-4 text-brand-green" /> 100% Trust Verified
          </span>
        </div>
      </div>
    </div>
  );
}
