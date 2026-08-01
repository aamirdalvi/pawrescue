"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Phone, Mail, MessageSquare, AlertCircle, Share2, Copy, Check } from "lucide-react";

interface OwnerCardProps {
  ownerName?: string;
  phone?: string;
  email?: string;
  listingId?: string;
}

export default function OwnerCard({
  ownerName = "Jane Doe",
  phone = "+1 (555) 019-2834",
  email = "jane@example.com",
  listingId = "mock-listing-id",
}: OwnerCardProps) {
  const [copied, setCopied] = useState(false);

  const handleAction = (type: string) => {
    const contactInfo = type === "Phone" || type === "Message" ? phone : email;
    toast.success(
      `Action Triggered: Mock ${type} call to caretaker (${contactInfo})!`
    );
  };

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${origin}/listings/${listingId}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Listing link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReport = () => {
    const reason = window.prompt("Please state the reason for reporting this listing:");
    if (reason) {
      toast.success("Thank you. Our community moderators have received your report.");
    }
  };

  const nameInitials = ownerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border-2 border-brand-cardboard/45 rounded-3xl p-6 shadow-medium space-y-6">
      {/* 1. Caretaker Avatar & Identity */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-brand-cardboard/25 flex items-center justify-center border border-brand-cardboard/35 shrink-0 shadow-inner">
          <span className="text-xl font-extrabold text-brand-brown tracking-wider">
            {nameInitials}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-wood uppercase tracking-wider block bg-brand-bg/50 px-2 py-0.5 rounded-md w-max border border-brand-cardboard/15">
            Caretaker
          </span>
          <h3 className="text-base font-extrabold text-brand-brown">
            {ownerName}
          </h3>
        </div>
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* 2. Primary CTAs Action Controls */}
      <div className="space-y-3">
        <Button
          variant="wood"
          fullWidth
          onClick={() => handleAction("Phone")}
          className="flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" /> Call Caretaker
        </Button>
        
        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleAction("Message")}
          className="flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-brand-wood" /> Message Caretaker
        </Button>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleAction("Email")}
          className="flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" /> Email Caretaker
        </Button>
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* 3. Social Actions Area (Share & Report) */}
      <div className="flex flex-col gap-2.5">
        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full flex items-center justify-between text-xs font-bold text-brand-wood hover:text-brand-brown bg-brand-bg/30 hover:bg-brand-bg/50 px-4 py-3 rounded-xl border border-brand-cardboard/25 transition-all duration-200 cursor-pointer focus:outline-hidden"
        >
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-brand-wood" />
            <span>Share Listing</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-brand-green">
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Link
              </>
            )}
          </span>
        </button>

        {/* Report Button */}
        <button
          type="button"
          onClick={handleReport}
          className="w-full flex items-center justify-center gap-2 text-xs font-extrabold text-red-500 hover:text-red-700 bg-red-50/20 hover:bg-red-50/45 px-4 py-3 rounded-xl border border-red-200/40 transition-all duration-200 cursor-pointer focus:outline-hidden"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> Report Listing
        </button>
      </div>
    </div>
  );
}
