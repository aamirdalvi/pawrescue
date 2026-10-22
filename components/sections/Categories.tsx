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
      color: "from-emerald-100/90 to-teal-100/60 text-emerald-900 border-emerald-300",
      href: "/browse?species=Dog",
    },
    {
      icon: "🐱",
      title: "Cats",
      count: "245+ Listings",
      color: "from-amber-100/90 to-orange-100/60 text-amber-900 border-amber-300",
      href: "/browse?species=Cat",
    },
    {
      icon: "🐰",
      title: "Rabbits",
      count: "42 Listings",
      color: "from-rose-100/90 to-pink-100/60 text-rose-900 border-rose-300",
      href: "/browse?species=Rabbit",
    },
    {
      icon: "🦜",
      title: "Birds",
      count: "68 Listings",
      color: "from-sky-100/90 to-blue-100/60 text-sky-900 border-sky-300",
      href: "/browse?species=Bird",
    },
    {
      icon: "🐄",
      title: "Farm Animals",
      count: "19 Listings",
      color: "from-amber-100/90 to-yellow-100/60 text-amber-900 border-amber-300",
      href: "/browse?species=Cow",
    },
    {
      icon: "🐾",
      title: "Others",
      count: "85 Listings",
      color: "from-purple-100/90 to-indigo-100/60 text-purple-900 border-purple-300",
      href: "/browse?species=Other",
    },
  ];

  return (
    <section id="categories" className="section-spacing relative bg-gradient-to-b from-sky-50/70 via-blue-50/30 to-transparent">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <SectionTitle
          title="Browse by Category"
          subtitle="Explore different animal categories and find the right companion or report a community alert."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 relative z-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: idx * 0.04,
              }}
              className="h-full"
            >
              <Link
                href={cat.href}
                className="glass-card flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 h-full group border-white/90 dark:border-white/10 dark:bg-[#16120D]/90 shadow-glass-md hover:shadow-glass-hover"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} border flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-glass-sm`}>
                  {cat.icon}
                </div>
                <h3 className="font-black text-brand-brown dark:text-[#FAF5ED] text-sm sm:text-base mb-1 group-hover:text-grass-green dark:group-hover:text-emerald-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-wood dark:text-[#C2B3A4] font-bold">
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
