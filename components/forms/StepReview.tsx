import React from "react";
import { FormInputs } from "@/types/form";
import LivePreviewCard from "@/components/cards/LivePreviewCard";

interface StepReviewProps {
  formData: FormInputs;
  imagePreviews?: string[];
}

export default function StepReview({
  formData,
  imagePreviews = [],
}: StepReviewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Review Your Listing
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Below is a live preview of how your listing will appear on the PawRescue marketplace. Please verify all information before publishing.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <LivePreviewCard formData={formData} imagePreviews={imagePreviews} />
      </div>
    </div>
  );
}
