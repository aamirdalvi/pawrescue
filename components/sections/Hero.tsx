"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroIllustration from "@/components/ui/HeroIllustration";
import { Sparkles, Heart, ShieldAlert } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 85,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-amber-100/50 via-orange-50/40 to-transparent">
      {/* Moving Background Organic Blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-amber-300/40 via-orange-200/30 to-rose-200/25 rounded-full blur-3xl animate-blob-slow pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[520px] h-[520px] bg-gradient-to-br from-emerald-200/35 via-teal-200/30 to-sky-200/25 rounded-full blur-3xl animate-blob-reverse pointer-events-none" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10"
        >
          {/* Left Column - High-Contrast Hero Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8">
            <motion.div variants={itemVariants} className="space-y-5">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 glass-pill px-4.5 py-2 text-xs font-black text-grass-green uppercase tracking-widest shadow-glass-sm bg-white/95 border-white">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Rescue • Adopt • Reunite</span>
              </div>

              {/* Massive Display Headline */}
              <h1 className="font-hero text-[#2C241B] tracking-tight drop-shadow-xs">
                FIND YOUR <br />
                <span className="text-giraffe-gradient relative inline-block">
                  FOREVER
                </span>{" "}
                <span className="bg-gradient-to-r from-grass-green via-emerald-700 to-[#7A4E29] bg-clip-text text-transparent">
                  FRIEND
                </span>
              </h1>

              {/* High-Contrast Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-[#5C4E3D] max-w-xl font-bold leading-relaxed">
                Every pet deserves a safe and loving home. Connect with local shelters, foster caretakers, and neighbors to restore hope and reunite lost companions.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                href="/browse?listingType=adopt"
                className="shadow-glass-hover text-base py-4 px-8"
              >
                <Heart className="w-5 h-5 fill-[#2C241B] stroke-none" />
                <span>Adopt Now</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/add-listing"
                className="shadow-glass-sm hover:shadow-glass-md text-base py-4 px-8"
              >
                <ShieldAlert className="w-5 h-5 text-white" />
                <span>Report Lost Pet</span>
              </Button>
            </motion.div>

            {/* Glass Statistics Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-brand-cardboard/35"
            >
              <div className="glass-panel p-4 rounded-2xl text-center bg-white/95 border-white shadow-glass-sm">
                <span className="text-2xl sm:text-3xl font-black text-[#2C241B] block">
                  1,200+
                </span>
                <span className="text-[10px] sm:text-xs font-black text-[#5C4E3D] uppercase tracking-wider block mt-0.5">
                  Pets Rescued
                </span>
              </div>

              <div className="glass-panel p-4 rounded-2xl text-center bg-white/95 border-white shadow-glass-sm">
                <span className="text-2xl sm:text-3xl font-black text-grass-green block">
                  98%
                </span>
                <span className="text-[10px] sm:text-xs font-black text-[#5C4E3D] uppercase tracking-wider block mt-0.5">
                  Happy Families
                </span>
              </div>

              <div className="glass-panel p-4 rounded-2xl text-center bg-white/95 border-white shadow-glass-sm">
                <span className="text-2xl sm:text-3xl font-black text-[#D35400] block">
                  24/7
                </span>
                <span className="text-[10px] sm:text-xs font-black text-[#5C4E3D] uppercase tracking-wider block mt-0.5">
                  Active Support
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Liquid Glass 3D Scene */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <HeroIllustration />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
