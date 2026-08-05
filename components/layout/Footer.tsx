"use client";

import React from "react";
import Link from "next/link";
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
      color: "hover:bg-rose-500 hover:text-white",
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      label: "Discord",
      href: "https://discord.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: "hover:bg-indigo-600 hover:text-white",
    },
    {
      label: "X (Twitter)",
      href: "https://x.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:bg-gray-900 hover:text-white",
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center border border-white shadow-glass-sm group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 giraffe-pattern-overlay opacity-40" />
                <span className="text-xl relative z-10">🐾</span>
              </div>
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
