"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Pets", href: "/browse" },
    { label: "Categories", href: "/#categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full py-4 px-4 sm:px-6 md:px-8 bg-brand-bg/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl bg-white border-2 border-brand-cardboard/40 shadow-soft rounded-2xl md:rounded-3xl py-3 px-6 flex items-center justify-between transition-all duration-300 hover:border-brand-wood/30">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110">
            🐾
          </span>
          <span className="font-extrabold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-brand-brown to-brand-wood bg-clip-text text-transparent">
            PawRescue
          </span>
        </Link>

        {/* Middle - Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-brand-brown font-bold text-sm tracking-wide transition-all duration-200 hover:text-brand-green relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right - Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="p-2.5 rounded-xl text-brand-brown hover:text-brand-green hover:bg-brand-bg transition-all duration-200 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Button variant="primary" size="md" href="/listings/add">
            Add Listing
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            className="p-2 rounded-xl text-brand-brown hover:text-brand-green hover:bg-brand-bg transition-all duration-200 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-brand-brown hover:text-brand-green hover:bg-brand-bg transition-all duration-200 cursor-pointer focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl bg-white border-2 border-brand-cardboard/40 shadow-soft-lg rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-brand-brown font-bold text-base py-2 border-b border-brand-bg hover:text-brand-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="primary"
            size="md"
            fullWidth
            href="/listings/add"
            onClick={() => setIsOpen(false)}
          >
            Add Listing
          </Button>
        </div>
      )}
    </header>
  );
}
