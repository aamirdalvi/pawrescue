"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function LostAndFound() {
  const alerts = [
    {
      id: "lf-1",
      petName: "Milo",
      species: "Dog",
      breed: "Cocker Spaniel",
      status: "lost" as const,
      badgeText: "🚨 Lost: Milo",
      badgeVariant: "danger" as const,
      location: "Central Park, NY",
      date: "Last seen yesterday",
      summary:
        "Wearing a brown leather collar with an ID tag. Very friendly but might be scared. Please call immediately if spotted.",
      gradient: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
      svgColor: "#9A6B3F",
    },
    {
      id: "lf-2",
      petName: "Stray Calico",
      species: "Cat",
      breed: "Domestic Shorthair",
      status: "found" as const,
      badgeText: "🔍 Found Stray",
      badgeVariant: "warning" as const,
      location: "West LA, CA",
      date: "Found 2 days ago",
      summary:
        "Multi-colored calico cat with distinct white socks on all paws. Extremely affectionate. Safely sheltered indoors.",
      gradient: "linear-gradient(135deg, #B5FFFC 0%, #FFDEE9 100%)",
      svgColor: "#4E342E",
    },
  ];

  return (
    <section className="section-spacing bg-white border-y border-brand-cardboard/15">
      <Container>
        <SectionTitle
          title="Lost & Found Alerts"
          subtitle="Urgent community alerts in your neighborhood. Help us reconnect these companions with their caretakers."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {alerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: idx * 0.05,
              }}
              whileHover={{ y: -4 }}
              className="bg-brand-bg/30 border border-brand-cardboard/25 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:bg-white hover:shadow-soft-lg hover:border-brand-cardboard"
            >
              {/* Left thumbnail SVG */}
              <div
                style={{ background: alert.gradient }}
                className="w-full sm:w-40 h-36 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center relative shadow-inner"
              >
                <div className="absolute top-2 left-2">
                  <Badge variant={alert.badgeVariant}>{alert.badgeText}</Badge>
                </div>

                <svg viewBox="0 0 200 160" className="w-24 h-24 drop-shadow-md">
                  <circle cx="100" cy="80" r="40" fill="#FFFFFF" opacity="0.3" />
                  {alert.species === "Dog" ? (
                    <g fill={alert.svgColor}>
                      <circle cx="100" cy="70" r="18" />
                      <rect x="87" y="82" width="26" height="26" rx="6" />
                      <circle cx="94" cy="68" r="1.5" fill="#FFFFFF" />
                      <circle cx="106" cy="68" r="1.5" fill="#FFFFFF" />
                      <path
                        d="M80 57 Q75 66 84 74"
                        stroke={alert.svgColor}
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M120 57 Q125 66 116 74"
                        stroke={alert.svgColor}
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  ) : (
                    <g fill={alert.svgColor}>
                      <circle cx="100" cy="70" r="16" />
                      <rect x="88" y="82" width="24" height="24" rx="6" />
                      <polygon points="88,57 94,69 90,69" />
                      <polygon points="112,57 106,69 110,69" />
                      <circle cx="94" cy="68" r="2" fill="#B8E6FF" />
                      <circle cx="106" cy="68" r="2" fill="#B8E6FF" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Right content details */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-extrabold text-brand-brown">
                      {alert.petName}
                    </h3>
                    <span className="text-xs font-bold text-brand-wood/80">
                      • {alert.breed}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-brand-wood leading-relaxed line-clamp-3">
                    {alert.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-cardboard/15 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] font-extrabold text-brand-brown/80 gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-wood" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center text-[10px] font-extrabold text-brand-wood/80 gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{alert.date}</span>
                    </div>
                  </div>

                  <Link
                    href={`/listings/${alert.id}`}
                    className="inline-flex items-center text-xs font-bold text-brand-green hover:text-brand-green-hover transition-colors gap-1 group"
                  >
                    <span>View Alert</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Inline helper Link simulation in case Next.js Link isn't imported correctly
function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
