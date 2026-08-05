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
          Health & Behavior Traits
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Provide basic health states and behavioral characteristics to inform potential adopters and caretakers.
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

        <div className="border-t border-brand-cardboard/15" />

        {/* Microchipped Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm font-extrabold text-brand-brown">
              🏷️ Microchipped
            </span>
            <span className="text-xs text-brand-wood font-medium">
              Does this pet have an identification microchip?
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("microchipped")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-brand-cardboard/35 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-brand-cardboard after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green" />
          </label>
        </div>

        <div className="border-t border-brand-cardboard/15" />

        {/* Special Needs Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm font-extrabold text-brand-brown">
              ♿ Special Needs / Disabled
            </span>
            <span className="text-xs text-brand-wood font-medium">
              Does this pet require special physical or medical care?
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("specialNeeds")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-brand-cardboard/35 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-brand-cardboard after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green" />
          </label>
        </div>
      </div>

      {/* Behavioral Compatibilities Section */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Behavior & Environment Compatibility
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-brand-cardboard/30 hover:border-brand-green transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("friendlyChildren")}
              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-brand-cardboard"
            />
            <span className="text-xs font-extrabold text-brand-brown">
              👶 Good with Kids
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-brand-cardboard/30 hover:border-brand-green transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("friendlyDogs")}
              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-brand-cardboard"
            />
            <span className="text-xs font-extrabold text-brand-brown">
              🐶 Good with Dogs
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-brand-cardboard/30 hover:border-brand-green transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("friendlyCats")}
              className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-brand-cardboard"
            />
            <span className="text-xs font-extrabold text-brand-brown">
              🐱 Good with Cats
            </span>
          </label>
        </div>
      </div>

      {/* Medical Notes Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Medical & Behavioral Notes (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Mention special diet, allergies, current medications, past injuries, microchip number, or behavioral traits..."
          {...register("medicalNotes")}
          className="input-friendly font-medium resize-none rounded-2xl"
        />
      </div>
    </div>
  );
}
