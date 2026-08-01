"use client";

import { motion } from "framer-motion";
import { LifeBuoy, Heart, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: LifeBuoy,
      title: "🛟 Rescue",
      subtitle: "Help abandoned animals.",
      description:
        "Provide emergency listings for strays, coordinate with local rescue services, and guide community efforts to secure stray pets safely.",
      color: "bg-emerald-100 text-brand-green",
      borderColor: "hover:border-brand-green/30",
    },
    {
      icon: Heart,
      title: "❤️ Adopt",
      subtitle: "Give pets a forever home.",
      description:
        "Browse verified local adoptable listings, contact caretakers directly, and discover friendly, loving companions who need a second chance.",
      color: "bg-amber-100 text-amber-800",
      borderColor: "hover:border-brand-cardboard/50",
    },
    {
      icon: MapPin,
      title: "📍 Reunite",
      subtitle: "Reconnect lost pets with their families.",
      description:
        "Use instant location tagging and alert notifications to coordinate neighborhood search parties and bring missing family members back home.",
      color: "bg-blue-100 text-blue-700",
      borderColor: "hover:border-brand-blue/40",
    },
  ];

  return (
    <section className="section-spacing bg-white border-y border-brand-cardboard/15">
      <Container>
        <SectionTitle
          title="Why PawRescue"
          subtitle="A dedicated community marketplace designed around compassion, collaboration, and pet safety."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  delay: idx * 0.08,
                }}
                className={`p-8 bg-brand-bg/40 border border-brand-cardboard/20 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-soft-lg ${feat.borderColor}`}
              >
                <div className={`p-4 rounded-xl w-max mb-6 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-brown mb-2">
                  {feat.title}
                </h3>
                <h4 className="text-sm font-extrabold text-brand-wood mb-4">
                  {feat.subtitle}
                </h4>
                <p className="text-sm text-brand-wood leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
