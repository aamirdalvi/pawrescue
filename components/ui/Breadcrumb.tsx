"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Do not render breadcrumbs on the homepage
  if (pathname === "/") return null;

  const pathParts = pathname.split("/").filter((part) => part);

  return (
    <div className="bg-gradient-to-b from-amber-100/50 via-amber-50/30 to-transparent dark:from-white/5 dark:via-transparent border-b border-brand-cardboard/20 dark:border-white/10 pt-20 sm:pt-24 md:pt-32 pb-3 z-20 relative">
      <Container>
        <nav className="flex items-center space-x-2 text-xs font-black text-[#5C4E3D] dark:text-[#C2B3A4] uppercase tracking-wider select-none overflow-x-auto scrollbar-none py-1">
          <Link
            href="/"
            className="hover:text-grass-green dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-grass-green dark:text-emerald-400" />
            <span>Home</span>
          </Link>

          {pathParts.map((part, idx) => {
            const isLast = idx === pathParts.length - 1;
            const href = "/" + pathParts.slice(0, idx + 1).join("/");

            let label = part.replace(/-/g, " ");
            if (label.match(/^[0-9a-fA-F]{24}$/) || label.match(/^\d+$/)) {
              label = "Listing Detail";
            }

            return (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-[#5C4E3D]/50 dark:text-[#C2B3A4]/50 shrink-0" />
                {isLast ? (
                  <span className="text-[#2C241B] dark:text-[#FAF5ED] truncate font-black">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-grass-green dark:hover:text-emerald-400 transition-colors truncate"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
