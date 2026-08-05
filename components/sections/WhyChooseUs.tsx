"use client";

import { motion } from "framer-motion";
import { LifeBuoy, Heart, MapPin, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: LifeBuoy,
      title: "🛟 Rescue",
      subtitle: "Help abandoned animals.",
      description:
        "Provide emergency listings for strays, coordinate with local rescue services, and guide community efforts to secure animals safely.",
      badgeColor: "bg-emerald-100/90 text-emerald-950 border-emerald-300",
    },
    {
      icon: Heart,
      title: "❤️ Adopt",
      subtitle: "Give pets a forever home.",
      description:
        "Browse verified local adoptable listings, contact caretakers directly, and discover friendly, loving companions who need a second chance.",
      badgeColor: "bg-rose-100/90 text-rose-950 border-rose-300",
    },
    {
      icon: MapPin,
      title: "📍 Reunite",
      subtitle: "Reconnect lost pets with their families.",
      description:
        "Use instant location tagging and alert notifications to coordinate neighborhood search parties and bring missing family members back home.",
      badgeColor: "bg-amber-100/90 text-amber-950 border-amber-300",
    },
  ];

  return (
    <section className="section-spacing relative bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-transparent">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <SectionTitle
          title="Why PawRescue"
          subtitle="A dedicated community marketplace designed around compassion, collaboration, and pet safety."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 15,
                  delay: idx * 0.08,
                }}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full border-white/95 shadow-glass-md hover:shadow-glass-hover bg-white/95"
              >
                <div>
                  <div className={`p-4 rounded-2xl w-max mb-6 border shadow-glass-sm ${feat.badgeColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-[#2C241B] mb-2">
                    {feat.title}
                  </h3>
                  <h4 className="text-sm font-black text-grass-green mb-4">
                    {feat.subtitle}
                  </h4>
                  <p className="text-sm text-[#5C4E3D] leading-relaxed font-bold">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-cardboard/25 mt-6 flex items-center gap-2 text-xs font-black text-[#2C241B]">
                  <ShieldCheck className="w-4 h-4 text-grass-green shrink-0" />
                  <span>100% Community Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
