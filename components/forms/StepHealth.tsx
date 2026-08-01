import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormInputs } from "@/types/form";

interface StepHealthProps {
  register: UseFormRegister<FormInputs>;
}

export default function StepHealth({ register }: StepHealthProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Health & Medical Status
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Provide basic health states. Check these boxes to alert potential caretakers.
        </p>
      </div>

      <div className="space-y-5 bg-brand-bg/40 border border-brand-cardboard/25 rounded-2xl p-6">
        {/* Vaccinated Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm font-extrabold text-brand-brown">
              🛡️ Vaccinated
            </span>
            <span className="text-xs text-brand-wood font-medium">
              Has this pet received up-to-date vaccinations?
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("vaccinated")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-brand-cardboard/35 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-brand-cardboard after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green" />
          </label>
        </div>

        <div className="border-t border-brand-cardboard/15" />

        {/* Sterilized Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm font-extrabold text-brand-brown">
              ✂️ Sterilized / Spayed
            </span>
            <span className="text-xs text-brand-wood font-medium">
              Is this pet neutered, spayed, or sterilized?
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("sterilized")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-brand-cardboard/35 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-brand-cardboard after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green" />
          </label>
        </div>
      </div>

      {/* Medical Notes Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Medical Notes (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Mention special diet, allergies, medications, past injuries, or current treatments..."
          {...register("medicalNotes")}
          className="input-friendly font-medium resize-none rounded-2xl"
        />
      </div>
    </div>
  );
}
