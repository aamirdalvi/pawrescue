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
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-amber-100/50 via-orange-50/40 to-transparent">
      {/* Moving Background Organic Blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-amber-300/40 via-orange-200/30 to-rose-200/25 rounded-full blur-3xl animate-blob-slow pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[520px] h-[520px] bg-gradient-to-br from-emerald-200/35 via-teal-200/30 to-sky-200/25 rounded-full blur-3xl animate-blob-reverse pointer-events-none" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
        >
          {/* Left Column - High-Contrast Hero Content */}
          <div className="lg:col-span-7 flex flex-col space-y-5 md:space-y-8">
            <motion.div variants={itemVariants} className="space-y-4 md:space-y-5">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-[11px] sm:text-xs font-black text-grass-green dark:text-emerald-400 uppercase tracking-widest shadow-glass-sm bg-white/95 dark:bg-[#16120D]/90 border-white/90 dark:border-white/10">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 animate-pulse" />
                <span>Rescue • Adopt • Reunite</span>
              </div>

              {/* Massive Display Headline */}
              <h1 className="font-hero text-[#2C241B] dark:text-[#FAF5ED] tracking-tight drop-shadow-xs">
                FIND YOUR <br />
                <span className="text-giraffe-gradient relative inline-block">
                  FOREVER
                </span>{" "}
                <span className="bg-gradient-to-r from-grass-green via-emerald-700 to-[#7A4E29] dark:from-emerald-400 dark:via-teal-300 dark:to-amber-200 bg-clip-text text-transparent">
                  FRIEND
                </span>
              </h1>

              {/* High-Contrast Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5C4E3D] dark:text-[#C2B3A4] max-w-xl font-bold leading-relaxed">
                Every pet deserves a safe and loving home. Connect with local shelters, foster caretakers, and neighbors to restore hope and reunite lost companions.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1"
            >
              <Button
                variant="primary"
                size="lg"
                href="/browse?listingType=adopt"
                className="shadow-glass-hover text-sm sm:text-base py-3.5 px-6 sm:py-4 sm:px-8 w-full sm:w-auto"
              >
                <Heart className="w-5 h-5 fill-[#2C241B] stroke-none" />
                <span>Adopt Now</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/add-listing"
                className="shadow-glass-sm hover:shadow-glass-md text-sm sm:text-base py-3.5 px-6 sm:py-4 sm:px-8 w-full sm:w-auto"
              >
                <ShieldAlert className="w-5 h-5 text-white" />
                <span>Report Lost Pet</span>
              </Button>
            </motion.div>

            {/* Glass Statistics Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-brand-cardboard/35 dark:border-white/10"
            >
              <div className="glass-panel p-2.5 sm:p-4 rounded-2xl text-center bg-white/95 dark:bg-[#16120D]/90 border-white/90 dark:border-white/10 shadow-glass-sm">
                <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#2C241B] dark:text-[#FAF5ED] block">
                  1,200+
                </span>
                <span className="text-[9px] sm:text-[11px] font-black text-[#5C4E3D] dark:text-[#C2B3A4] uppercase tracking-wider block mt-0.5 truncate">
                  Pets Rescued
                </span>
              </div>

              <div className="glass-panel p-2.5 sm:p-4 rounded-2xl text-center bg-white/95 dark:bg-[#16120D]/90 border-white/90 dark:border-white/10 shadow-glass-sm">
                <span className="text-lg sm:text-2xl md:text-3xl font-black text-grass-green dark:text-emerald-400 block">
                  98%
                </span>
                <span className="text-[9px] sm:text-[11px] font-black text-[#5C4E3D] dark:text-[#C2B3A4] uppercase tracking-wider block mt-0.5 truncate">
                  Happy Families
                </span>
              </div>

              <div className="glass-panel p-2.5 sm:p-4 rounded-2xl text-center bg-white/95 dark:bg-[#16120D]/90 border-white/90 dark:border-white/10 shadow-glass-sm">
                <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#D35400] dark:text-amber-400 block">
                  24/7
                </span>
                <span className="text-[9px] sm:text-[11px] font-black text-[#5C4E3D] dark:text-[#C2B3A4] uppercase tracking-wider block mt-0.5 truncate">
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
