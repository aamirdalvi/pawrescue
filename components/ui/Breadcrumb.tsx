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
    <div className="bg-gradient-to-b from-amber-100/50 via-amber-50/30 to-transparent border-b border-brand-cardboard/20 pt-28 md:pt-32 pb-3.5 z-20 relative">
      <Container>
        <nav className="flex items-center space-x-2 text-xs font-black text-[#5C4E3D] uppercase tracking-wider select-none">
          <Link
            href="/"
            className="hover:text-grass-green transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-grass-green" />
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
                <ChevronRight className="w-3.5 h-3.5 text-[#5C4E3D]/50 shrink-0" />
                {isLast ? (
                  <span className="text-[#2C241B] truncate font-black">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-grass-green transition-colors truncate"
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
