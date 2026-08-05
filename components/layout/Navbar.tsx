"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, PlusCircle, Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

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
    <header className="fixed top-0 left-0 right-0 z-50 py-3.5 px-4 sm:px-6 md:px-8 transition-all duration-300 pointer-events-none">
      <div
        className={`mx-auto max-w-6xl pointer-events-auto rounded-full transition-all duration-500 ${
          isScrolled
            ? "glass-panel bg-white/85 shadow-glass-lg py-2.5 px-6 border-white"
            : "glass-panel bg-white/70 shadow-glass-md py-3.5 px-7 border-white/80"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left - Giraffe & Paw Badge Logo */}
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center border border-white/90 shadow-glass-sm group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 giraffe-pattern-overlay opacity-40" />
              <span className="text-xl relative z-10 group-hover:rotate-12 transition-transform duration-300">
                🐾
              </span>
            </div>
            <div>
              <span className="font-black text-xl md:text-2xl tracking-tight text-brand-brown block leading-none">
                Paw<span className="text-grass-green">Rescue</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-wood/80 block mt-0.5">
                Rescue • Adopt • Reunite
              </span>
            </div>
          </Link>

          {/* Middle - Floating Navigation Links with Grass Green Selected Pill */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-white/50 p-1.5 rounded-full border border-white/70 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-black tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-grass-green text-white shadow-glass-sm scale-102"
                      : "text-brand-brown/85 hover:text-brand-brown hover:bg-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right - Giraffe Pattern CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-brand-brown hover:text-grass-green hover:bg-white/70 border border-transparent hover:border-white/70 transition-all duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-4.5 h-4.5" />
              ) : (
                <Sun className="w-4.5 h-4.5" />
              )}
            </button>

            <Link
              href="/browse"
              className="p-2.5 rounded-2xl text-brand-brown hover:text-grass-green hover:bg-white/70 border border-transparent hover:border-white/70 transition-all duration-200 cursor-pointer"
              aria-label="Search listings"
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

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-brand-brown hover:bg-white/60 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <Link
              href="/browse"
              className="p-2 rounded-xl text-brand-brown hover:bg-white/60 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-brown hover:bg-white/60 transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-6xl pointer-events-auto glass-panel bg-white/95 shadow-glass-lg rounded-3xl p-6 animate-in fade-in slide-in-from-top-4 duration-300 border-white">
          <nav className="flex flex-col space-y-3 mb-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-black py-3 px-4 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-grass-green text-white shadow-glass-sm"
                      : "text-brand-brown hover:bg-brand-bg/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="primary"
            size="md"
            fullWidth
            href="/add-listing"
            onClick={() => setIsOpen(false)}
          >
            ➕ Add Listing
          </Button>
        </div>
      )}
    </header>
  );
}
