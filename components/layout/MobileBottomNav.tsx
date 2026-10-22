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
      label: "Add Listing",
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
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto w-full max-w-sm glass-panel bg-[#FFFDF9]/92 dark:bg-[#16120D]/95 backdrop-blur-2xl border border-white/90 dark:border-white/10 shadow-[0_12px_36px_-6px_rgba(44,36,27,0.18)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] rounded-full px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCta) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative -top-4 flex flex-col items-center group cursor-pointer px-1 active:scale-95 transition-transform duration-200"
                aria-label="Add Listing"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 border-3 border-white dark:border-[#16120D] transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-500/60">
                  <Plus className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-[9px] font-black text-brand-brown dark:text-[#FAF5ED] mt-0.5 tracking-tight">
                  Add Listing
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? "text-grass-green dark:text-emerald-400 font-extrabold"
                  : "text-[#5C4E3D]/80 dark:text-[#C2B3A4]/80 hover:text-brand-brown dark:hover:text-[#FAF5ED] font-semibold"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                {isActive && (
                  <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-grass-green dark:bg-emerald-400 shadow-sm" />
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
