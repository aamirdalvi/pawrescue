"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroIllustration from "@/components/ui/HeroIllustration";

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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative min-h-[calc(80vh-80px)] flex items-center pt-8 pb-16 md:py-20 overflow-hidden">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full w-max">
                <span className="text-xs md:text-sm font-bold text-brand-green">
                  🌱 Welcome to the Animal Sanctuary
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-brown tracking-tight leading-[1.1]">
                Helping Every Paw <br />
                <span className="text-brand-green">Find a Loving Home</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-wood max-w-xl leading-relaxed">
                Whether you&apos;re looking to adopt, rescue, reunite with a lost
                companion, or help a stray animal, PawRescue connects caring
                people with pets in need.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button
                variant="wood"
                size="lg"
                href="/browse"
                className="shadow-md"
              >
                🐾 Browse Listings
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/listings/add"
                className="shadow-xs"
              >
                ➕ Add Listing
              </Button>
            </motion.div>
          </div>

          {/* Right Column - SVG Illustration */}
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
