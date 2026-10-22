"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, PlusCircle, Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Pets", href: "/browse" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2.5 sm:py-3.5 px-3 sm:px-6 md:px-8 transition-all duration-300 pointer-events-none">
      <div
        className={`mx-auto max-w-6xl pointer-events-auto rounded-full transition-all duration-500 backdrop-blur-2xl ${
          isScrolled
            ? "glass-panel bg-white/90 dark:bg-[#16120D]/92 shadow-glass-lg py-2 px-4 sm:px-6 border-white/90 dark:border-white/10"
            : "glass-panel bg-white/75 dark:bg-[#16120D]/85 shadow-glass-md py-2.5 sm:py-3.5 px-4 sm:px-7 border-white/80 dark:border-white/10"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left - Official PawRescue Logo & Brand Name */}
          <Link href="/" className="flex items-center space-x-2.5 group cursor-pointer shrink-0">
            <Image
              src="/PawRescueLogo.png"
              alt="PawRescue Logo"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <div className="min-w-0">
              <span className="font-black text-lg sm:text-xl md:text-2xl tracking-tight text-brand-brown dark:text-[#FAF5ED] block leading-none">
                Paw<span className="text-grass-green dark:text-emerald-400">Rescue</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-brand-wood/80 dark:text-brand-wood/70 block mt-0.5 truncate">
                Rescue • Adopt • Reunite
              </span>
            </div>
          </Link>

          {/* Middle - Floating Navigation Links on Desktop */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-white/50 dark:bg-white/5 p-1.5 rounded-full border border-white/70 dark:border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-grass-green text-white shadow-glass-sm scale-102"
                      : "text-brand-brown/85 dark:text-[#FAF5ED]/80 hover:text-brand-brown dark:hover:text-[#FAF5ED] hover:bg-white/80 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right - Desktop CTA & Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-brand-brown dark:text-[#FAF5ED] hover:text-grass-green dark:hover:text-emerald-400 hover:bg-white/70 dark:hover:bg-white/10 border border-transparent hover:border-white/70 dark:hover:border-white/10 transition-all duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4.5 h-4.5" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              )}
            </button>

            <Link
              href="/browse"
              className="p-2.5 rounded-2xl text-brand-brown dark:text-[#FAF5ED] hover:text-grass-green dark:hover:text-emerald-400 hover:bg-white/70 dark:hover:bg-white/10 border border-transparent hover:border-white/70 dark:hover:border-white/10 transition-all duration-200 cursor-pointer"
              aria-label="Search listings"
              title="Search listings"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>

            <Button
              variant="primary"
              size="sm"
              href="/add-listing"
              className="shadow-glass-sm hover:shadow-glass-hover"
            >
              <PlusCircle className="w-4 h-4 text-brand-brown stroke-[2.5px]" />
              <span>Add Listing</span>
            </Button>
          </div>

          {/* Mobile Right Controls: Fast 1-tap Theme Toggle & Search */}
          <div className="flex items-center space-x-1.5 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-brand-brown dark:text-[#FAF5ED] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-90"
              aria-label="Toggle dark mode"
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            <Link
              href="/browse"
              className="p-2 rounded-xl text-brand-brown dark:text-[#FAF5ED] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200 active:scale-90"
              aria-label="Search"
              title="Search listings"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
