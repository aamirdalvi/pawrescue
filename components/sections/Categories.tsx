"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/ui/Container";

export default function Categories() {
  const categories = [
    {
      icon: "🐶",
      title: "Dogs",
      count: "320+ Listings",
      href: "/browse?category=dogs",
    },
    {
      icon: "🐱",
      title: "Cats",
      count: "245+ Listings",
      href: "/browse?category=cats",
    },
    {
      icon: "🦜",
      title: "Birds",
      count: "68 Listings",
      href: "/browse?category=birds",
    },
    {
      icon: "🐰",
      title: "Rabbits",
      count: "42 Listings",
      href: "/browse?category=rabbits",
    },
    {
      icon: "🐄",
      title: "Farm Animals",
      count: "19 Listings",
      href: "/browse?category=farm",
    },
    {
      icon: "🐾",
      title: "Others",
      count: "85 Listings",
      href: "/browse?category=others",
    },
  ];

  return (
    <section id="categories" className="section-spacing bg-white border-y border-brand-cardboard/15">
      <Container>
        <SectionTitle
          title="Browse by Category"
          subtitle="Explore different animal categories and find the right companion or report an alert."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: idx * 0.04,
              }}
              className="h-full"
            >
              <Link
                href={cat.href}
                className="flex flex-col items-center text-center p-6 bg-brand-bg/50 border border-brand-cardboard/25 rounded-2xl transition-all duration-300 hover:border-brand-wood/40 hover:bg-white hover:shadow-soft h-full"
              >
                <span className="text-4xl md:text-5xl mb-4 block transition-transform duration-300 hover:scale-110">
                  {cat.icon}
                </span>
                <h3 className="font-extrabold text-brand-brown text-base mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-brand-wood font-semibold">
                  {cat.count}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
