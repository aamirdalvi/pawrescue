"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  ShieldAlert,
} from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      color: "hover:bg-pink-500 hover:text-white",
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      label: "Discord",
      href: "https://discord.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <path d="M7.5 7.5C9 7 10.5 6.8 12 6.8c1.5 0 3 .2 4.5.7.5 1.5 1.5 4.5 1.5 7.5 0 0-1 1-2.5 1.5l-.8-1.2c1-.3 1.5-.7 1.5-.7-1 .6-2.2 1-3.7 1-1.5 0-2.7-.4-3.7-1 0 0 .5.4 1.5.7l-.8 1.2C8 16 7 15 7 15c0-3 1-6 1.5-7.5z" />
        </svg>
      ),
      color: "hover:bg-indigo-600 hover:text-white",
    },
    {
      label: "X",
      href: "https://x.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
      color: "hover:bg-black hover:text-white",
    },
    {
      label: "GitHub",
      href: "https://github.com/aamirdalvi",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "hover:bg-blue-700 hover:text-white",
    },
  ];

  return (
    <footer className="pt-16 pb-10 mt-auto relative overflow-hidden select-none bg-gradient-to-b from-amber-50/40 via-[#FAF5ED] to-[#F5EDDF] border-t border-brand-cardboard/20">
      <Container className="relative z-10">

        {/* ========================================================== */}
        {/* ASYMMETRIC CONTENT AREA WITH VERTICAL DIVIDERS */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-0 pb-12 border-b border-[#2C241B]/15 relative z-20">
          
          {/* LEFT (Large Column - 4 Grid Spans) */}
          <div className="md:col-span-4 lg:pr-8 lg:border-r lg:border-[#2C241B]/15 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-3 group w-max">
              <Image
                src="/PawRescueLogo.png"
                alt="PawRescue Logo"
                width={48}
                height={48}
                className="w-11 h-11 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="font-black text-2xl tracking-tight text-[#2C241B] block leading-none">
                  Paw<span className="text-grass-green">Rescue</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#5C4E3D] block mt-0.5">
                  Rescue • Adopt • Reunite
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#5C4E3D] leading-relaxed font-bold max-w-sm">
              Connecting rescued, lost and adoptable pets with loving families through a trusted community sanctuary platform.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[10px] font-black text-[#5C4E3D] uppercase tracking-wider block mb-2.5">
                Follow Our Sanctuary
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-9 h-9 rounded-xl glass-pill bg-white/95 border-white shadow-glass-sm flex items-center justify-center text-[#5C4E3D] transition-all duration-300 hover:scale-110 active:scale-95 ${social.color}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CENTER 1: Explore (2 Grid Spans) */}
          <div className="md:col-span-2 lg:px-6 lg:border-r lg:border-[#2C241B]/15 flex flex-col space-y-3.5">
            <h3 className="font-black text-[#2C241B] text-xs uppercase tracking-wider">
              Explore
            </h3>
            <ul className="flex flex-col space-y-2 text-xs text-[#5C4E3D] font-bold">
              <li>
                <Link href="/browse" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Browse All Pets
                </Link>
              </li>
              <li>
                <Link href="/browse?listingType=lost" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  🚨 Lost Pets Alert
                </Link>
              </li>
              <li>
                <Link href="/browse?listingType=found" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  🔍 Found Strays
                </Link>
              </li>
              <li>
                <Link href="/browse?listingType=adopt" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  🏡 Adoption
                </Link>
              </li>
              <li>
                <Link href="/browse?listingType=foster" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  🤝 Foster
                </Link>
              </li>
            </ul>
          </div>

          {/* CENTER 2: Company (2 Grid Spans) */}
          <div className="md:col-span-2 lg:px-6 lg:border-r lg:border-[#2C241B]/15 flex flex-col space-y-3.5">
            <h3 className="font-black text-[#2C241B] text-xs uppercase tracking-wider">
              Company
            </h3>
            <ul className="flex flex-col space-y-2 text-xs text-[#5C4E3D] font-bold">
              <li>
                <Link href="/about" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT: Support (2 Grid Spans) */}
          <div className="md:col-span-2 lg:px-6 lg:border-r lg:border-[#2C241B]/15 flex flex-col space-y-3.5">
            <h3 className="font-black text-[#2C241B] text-xs uppercase tracking-wider">
              Support
            </h3>
            <ul className="flex flex-col space-y-2 text-xs text-[#5C4E3D] font-bold">
              <li>
                <Link href="/contact" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-grass-green transition-colors inline-block hover:translate-x-1 duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* FAR RIGHT: Contact Cards (2 Grid Spans) */}
          <div className="md:col-span-2 lg:pl-6 flex flex-col space-y-3">
            <h3 className="font-black text-[#2C241B] text-xs uppercase tracking-wider">
              Contact Desk
            </h3>
            <div className="space-y-2">
              <div className="glass-panel p-2.5 rounded-xl border-white flex items-center space-x-2 text-[11px] font-bold text-[#2C241B] shadow-glass-sm bg-white/95">
                <Mail className="w-3.5 h-3.5 text-grass-green shrink-0" />
                <span className="truncate">support@pawrescue.org</span>
              </div>
              <div className="glass-panel p-2.5 rounded-xl border-white flex items-center space-x-2 text-[11px] font-bold text-[#2C241B] shadow-glass-sm bg-white/95">
                <Phone className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="glass-panel p-2.5 rounded-xl border-white flex items-center space-x-2 text-[11px] font-bold text-[#2C241B] shadow-glass-sm bg-white/95">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">123 Sanctuary Way</span>
              </div>
            </div>

            {/* Emergency Badge */}
            <div className="pt-1">
              <div className="glass-pill px-3 py-1.5 bg-rose-50 border-rose-200 text-rose-800 text-[10px] font-black flex items-center gap-1.5 shadow-glass-sm">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Emergency Desk Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================== */}
        {/* BOTTOM BAR */}
        {/* ========================================================== */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#5C4E3D] font-bold space-y-3 md:space-y-0 relative z-20">
          <div>
            <span>© {currentYear} PawRescue</span>
          </div>

          <div className="flex items-center space-x-1 text-center">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1 inline" />
            <span>for animals</span>
            <span className="mx-2 text-[#2C241B]/30">•</span>
            <span className="text-[#2C241B] font-black">
              Designed & Developed by <strong className="text-grass-green font-black">Aamir Dalvi (417)</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-extrabold text-[#5C4E3D]">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-grass-green transition-colors">
              GitHub
            </a>
            <span>•</span>
            <Link href="/contact" className="hover:text-grass-green transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-grass-green transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </Container>
    </footer>
  );
}
