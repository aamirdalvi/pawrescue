import React from "react";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  city?: string;
  state?: string;
  area?: string;
  address?: string;
  pincode?: string;
}

export default function LocationCard({
  city = "Brooklyn",
  state = "NY",
  area = "Prospect Park",
  address = "123 Sanctuary Way",
  pincode = "11201",
}: LocationCardProps) {
  return (
    <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs space-y-5">
      <h2 className="text-xl font-extrabold text-brand-brown border-b border-brand-cardboard/10 pb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-brand-green" /> Location Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Address Details */}
        <div className="md:col-span-5 space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-wood uppercase tracking-wider block">
              Neighborhood / Area
            </span>
            <span className="text-sm font-extrabold text-brand-brown">
              {area}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-wood uppercase tracking-wider block">
              Street Address
            </span>
            <span className="text-sm font-extrabold text-brand-brown">
              {address}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-wood uppercase tracking-wider block">
              City, State & Pincode
            </span>
            <span className="text-sm font-extrabold text-brand-brown block">
              {city}, {state} {pincode}
            </span>
          </div>
        </div>

        {/* Right Side: Stylized SVG Map Placeholder */}
        <div className="md:col-span-7 h-48 bg-emerald-50/50 border border-brand-cardboard/20 rounded-2xl overflow-hidden relative shadow-inner">
          <svg
            viewBox="0 0 400 200"
            className="w-full h-full object-cover opacity-85"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grid representing land/grass */}
            <rect width="400" height="200" fill="#E8F5E9" />

            {/* River */}
            <path
              d="M 0,40 Q 120,60 200,30 T 400,50 L 400,75 Q 300,50 200,60 T 0,65 Z"
              fill="#B8E6FF"
            />

            {/* Streets Grid */}
            <path
              d="M 50,0 L 50,200 M 150,0 L 150,200 M 270,0 L 270,200 M 0,90 L 400,90 M 0,160 L 400,160"
              stroke="#E7C79F"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Park shapes */}
            <circle cx="100" cy="130" r="30" fill="#C8E6C9" opacity="0.9" />
            <circle cx="340" cy="110" r="40" fill="#C8E6C9" opacity="0.9" />

            {/* Stylized trees */}
            <circle cx="90" cy="120" r="6" fill="#4CAF50" />
            <circle cx="110" cy="140" r="5" fill="#4CAF50" />
            <circle cx="330" cy="100" r="7" fill="#4CAF50" />
            <circle cx="350" cy="120" r="6" fill="#4CAF50" />

            {/* Marker Pin Ring Glow */}
            <circle
              cx="200"
              cy="100"
              r="12"
              fill="#E53935"
              opacity="0.15"
              className="animate-ping"
              style={{ transformOrigin: "200px 100px" }}
            />
            {/* Marker Pin */}
            <g transform="translate(188, 72) scale(0.8)">
              <path
                d="M15 0 C6.7 0 0 6.7 0 15 C0 26.2 15 40 15 40 C15 40 30 26.2 30 15 C30 6.7 23.3 0 15 0 Z"
                fill="#E53935"
              />
              <circle cx="15" cy="15" r="5" fill="#FFFFFF" />
            </g>
          </svg>

          {/* Centered locator overlay card */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-brand-cardboard/25 shadow-xs flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-brand-brown uppercase tracking-wider">
              Rescue Site
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
