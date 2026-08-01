"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function Statistics() {
  const statItems = [
    {
      value: "10,000+",
      label: "Animals Helped",
      description: "Strays rescued, lost companions reunited, and adoptions facilitated.",
      bgClass: "bg-emerald-50/60 border-emerald-100",
      colorClass: "text-brand-green",
    },
    {
      value: "3,500+",
      label: "Successful Adoptions",
      description: "Pets placed in loving, permanent homes with happy families.",
      bgClass: "bg-amber-50/60 border-amber-100",
      colorClass: "text-amber-700",
    },
    {
      value: "900+",
      label: "Active Listings",
      description: "Neighborhood alerts and animals currently in transition.",
      bgClass: "bg-blue-50/60 border-blue-100",
      colorClass: "text-blue-600",
    },
  ];

  return (
    <section className="section-spacing bg-white border-y border-brand-cardboard/15">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {statItems.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: idx * 0.08,
              }}
              whileHover={{ y: -4 }}
              className={`p-8 border-2 ${stat.bgClass} rounded-3xl text-center shadow-xs transition-all duration-300 hover:shadow-soft`}
            >
              <span className={`text-4xl md:text-5xl font-black ${stat.colorClass} block mb-2`}>
                {stat.value}
              </span>
              <h3 className="text-lg font-extrabold text-brand-brown mb-2">
                {stat.label}
              </h3>
              <p className="text-xs font-semibold text-brand-wood/80 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
