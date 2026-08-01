"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CallToAction() {
  return (
    <section className="section-spacing bg-brand-bg relative overflow-hidden">
      {/* Background radial accent glow blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="bg-brand-brown border-2 border-brand-wood/30 text-white rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-soft-lg relative"
        >
          <div className="absolute top-4 left-4 text-3xl opacity-15 select-none">
            🐾
          </div>
          <div className="absolute bottom-4 right-4 text-3xl opacity-15 select-none">
            🐾
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-brand-cardboard/80 text-base md:text-lg max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Join thousands of neighbors in creating a safer environment for our
            furry, feathered, and scaly companions. Every small action helps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/browse">
              🐾 Browse Listings
            </Button>
            <Button variant="secondary" size="lg" href="/listings/add">
              ➕ Add Listing
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
