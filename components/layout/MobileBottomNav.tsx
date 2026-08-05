"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Plus, Info, PhoneCall } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Browse",
      href: "/browse",
      icon: Compass,
    },
    {
      label: "Add",
      href: "/add-listing",
      icon: Plus,
      isCta: true,
    },
    {
      label: "About",
      href: "/about",
      icon: Info,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: PhoneCall,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
      <nav className="pointer-events-auto mx-auto max-w-md glass-panel bg-white/90 dark:bg-[#1A140E]/95 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-glass-lg rounded-full px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCta) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative -top-5 flex flex-col items-center group cursor-pointer"
                aria-label="Add Listing"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 border-4 border-white dark:border-[#0B0907] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black text-brand-brown dark:text-[#FAF5ED] mt-0.5">
                  Add Listing
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? "text-grass-green dark:text-emerald-400 font-black"
                  : "text-brand-wood/80 dark:text-brand-wood hover:text-brand-brown dark:hover:text-cream font-bold"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-grass-green dark:bg-emerald-400" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
