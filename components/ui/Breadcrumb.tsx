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
    <div className="bg-brand-bg/50 border-b border-brand-cardboard/15 py-3">
      <Container>
        <nav className="flex items-center space-x-2 text-xs font-bold text-brand-wood uppercase tracking-wider select-none">
          <Link
            href="/"
            className="hover:text-brand-brown transition-colors flex items-center gap-1 shrink-0"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          {pathParts.map((part, idx) => {
            const isLast = idx === pathParts.length - 1;
            const href = "/" + pathParts.slice(0, idx + 1).join("/");

            // Format dynamic params or labels nicely (e.g. "add-listing" -> "add listing")
            let label = part.replace(/-/g, " ");
            if (label.match(/^[0-9a-fA-F]{24}$/) || label.match(/^\d+$/)) {
              label = "Listing Detail"; // Label dynamic IDs nicely
            }

            return (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-brand-cardboard/80 shrink-0" />
                {isLast ? (
                  <span className="text-brand-brown truncate font-extrabold">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-brand-brown transition-colors truncate"
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
