"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Sparkles, Heart, PlusCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="glass-panel-dark bg-gradient-to-br from-[#1E3A2B] via-[#2D1E18] to-[#1E3A2B] text-white rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-glass-lg relative overflow-hidden border-white/20"
        >
          {/* Subtle Giraffe Pattern Accent Overlay */}
          <div className="absolute inset-0 giraffe-pattern-overlay opacity-20 pointer-events-none" />

          {/* Floating Paw Accents */}
          <div className="absolute top-4 left-6 text-4xl opacity-20 select-none animate-float-slow">
            🐾
          </div>
          <div className="absolute bottom-4 right-6 text-4xl opacity-20 select-none animate-float-delayed">
            🐾
          </div>

          <div className="inline-flex items-center gap-2 glass-pill px-4.5 py-2 text-xs font-black text-amber-300 uppercase tracking-widest mb-6 bg-black/40 border-white/20 shadow-glass-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Join Our Rescue Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white leading-tight drop-shadow-md">
            Ready to Make a Difference?
          </h2>
          <p className="text-emerald-100/90 text-base md:text-lg max-w-xl mx-auto mb-8 font-bold leading-relaxed">
            Join thousands of caring neighbors creating a safer world for our furry, feathered, and scaly companions. Every small action restores hope.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button
              variant="primary"
              size="lg"
              href="/browse"
              className="shadow-glass-hover"
            >
              <Heart className="w-5 h-5 fill-[#2C241B] stroke-none" />
              <span>Browse Listings</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              href="/add-listing"
              className="shadow-glass-sm hover:shadow-glass-md"
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span>Add A Listing</span>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
