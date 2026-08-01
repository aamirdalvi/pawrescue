import React from "react";

interface DescriptionCardProps {
  description?: string;
}

export default function DescriptionCard({
  description = "No description details provided.",
}: DescriptionCardProps) {
  return (
    <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden group">
      {/* Decorative top strip matching paper style */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cardboard/40 via-brand-wood/20 to-brand-cardboard/40" />

      <h2 className="text-xl font-extrabold text-brand-brown mb-4 border-b border-brand-cardboard/10 pb-2">
        📖 About This Pet
      </h2>

      <p className="text-sm text-brand-wood leading-relaxed font-medium whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
