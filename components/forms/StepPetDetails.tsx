import React, { useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FormInputs } from "@/types/form";
import CustomSelect from "@/components/ui/CustomSelect";

interface StepPetDetailsProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  setValue?: UseFormSetValue<FormInputs>;
  watch?: UseFormWatch<FormInputs>;
}

const speciesList = [
  { value: "Dog", label: "🐶 Dog" },
  { value: "Cat", label: "🐱 Cat" },
  { value: "Rabbit", label: "🐰 Rabbit" },
  { value: "Bird", label: "🦜 Bird" },
  { value: "Cow", label: "🐄 Cow" },
  { value: "Horse", label: "🐴 Horse" },
  { value: "Goat", label: "🐐 Goat" },
  { value: "Buffalo", label: "🦬 Buffalo" },
  { value: "Other", label: "🐾 Other" },
];

const breedBySpecies: Record<string, { value: string; label: string }[]> = {
  Dog: [
    { value: "Indian Pariah / Desi", label: "🐕 Indian Pariah / Desi Dog" },
    { value: "Labrador Retriever", label: "🐶 Labrador Retriever" },
    { value: "Golden Retriever", label: "🐶 Golden Retriever" },
    { value: "German Shepherd", label: "🐶 German Shepherd" },
    { value: "Beagle", label: "🐶 Beagle" },
    { value: "Pug", label: "🐶 Pug" },
    { value: "Shih Tzu", label: "🐶 Shih Tzu" },
    { value: "Poodle", label: "🐶 Poodle" },
    { value: "Siberian Husky", label: "🐶 Siberian Husky" },
    { value: "Rottweiler", label: "🐶 Rottweiler" },
    { value: "Doberman", label: "🐶 Doberman" },
    { value: "Mixed Breed", label: "🐾 Mixed Breed" },
  ],
  Cat: [
    { value: "Domestic Shorthair", label: "🐱 Domestic Shorthair / Desi Cat" },
    { value: "Persian Cat", label: "🐱 Persian Cat" },
    { value: "Siamese Cat", label: "🐱 Siamese Cat" },
    { value: "Maine Coon", label: "🐱 Maine Coon" },
    { value: "Bengal Cat", label: "🐱 Bengal Cat" },
    { value: "Tabby Cat", label: "🐱 Tabby Cat" },
    { value: "Bombay Cat", label: "🐱 Bombay Cat" },
    { value: "Mixed Breed", label: "🐾 Mixed Breed" },
  ],
  Rabbit: [
    { value: "Holland Lop", label: "🐰 Holland Lop" },
    { value: "Mini Rex", label: "🐰 Mini Rex" },
    { value: "Netherland Dwarf", label: "🐰 Netherland Dwarf" },
    { value: "Lionhead", label: "🐰 Lionhead" },
    { value: "Angora Rabbit", label: "🐰 Angora Rabbit" },
    { value: "Mixed Breed", label: "🐾 Mixed Breed" },
  ],
  Bird: [
    { value: "Budgerigar Parakeet", label: "🦜 Budgerigar Parakeet" },
    { value: "Cockatiel", label: "🦜 Cockatiel" },
    { value: "Lovebird", label: "🦜 Lovebird" },
    { value: "African Grey", label: "🦜 African Grey Parrot" },
    { value: "Canary", label: "🐤 Canary" },
    { value: "Pigeon / Dove", label: "🕊️ Pigeon / Dove" },
  ],
  Cow: [
    { value: "Gir", label: "🐄 Gir" },
    { value: "Sahiwal", label: "🐄 Sahiwal" },
    { value: "Holstein Friesian", label: "🐄 Holstein Friesian" },
    { value: "Jersey", label: "🐄 Jersey" },
    { value: "Indigenous / Desi Cow", label: "🐄 Indigenous / Desi Cow" },
  ],
  Horse: [
    { value: "Marwari", label: "🐴 Marwari Horse" },
    { value: "Kathiawari", label: "🐴 Kathiawari Horse" },
    { value: "Thoroughbred", label: "🐴 Thoroughbred" },
    { value: "Pony", label: "🐴 Pony" },
  ],
  Goat: [
    { value: "Jamunapari", label: "🐐 Jamunapari" },
    { value: "Boer", label: "🐐 Boer" },
    { value: "Barbari", label: "🐐 Barbari" },
    { value: "Black Bengal", label: "🐐 Black Bengal" },
  ],
  Buffalo: [
    { value: "Murrah", label: "🦬 Murrah Buffalo" },
    { value: "Nili-Ravi", label: "🦬 Nili-Ravi" },
    { value: "Surti", label: "🦬 Surti" },
    { value: "Indigenous Buffalo", label: "🦬 Indigenous Buffalo" },
  ],
  Other: [
    { value: "Mixed / Crossbreed", label: "🐾 Mixed / Crossbreed" },
    { value: "Others", label: "🐾 Others" },
  ],
};

const colorOptions = [
  { value: "Black", label: "⚫ Black" },
  { value: "White", label: "⚪ White" },
  { value: "Brown", label: "🟤 Brown / Chocolate" },
  { value: "Golden", label: "🟡 Golden / Fawn" },
  { value: "Tan", label: "🟠 Tan / Cream" },
  { value: "Gray", label: "🩶 Gray / Silver" },
  { value: "Spotted / Calico", label: "⚪⚫ Spotted / Calico" },
  { value: "Tricolor", label: "🎨 Tricolor" },
  { value: "Red / Ginger", label: "🔴 Red / Ginger" },
  { value: "Other", label: "🐾 Other" },
];

export default function StepPetDetails({
  control,
  register,
  errors,
  setValue,
  watch,
}: StepPetDetailsProps) {
  const selectedSpecies = watch ? watch("species") : "Dog";
  const ageYears = watch ? watch("ageYears") || "0" : "0";
  const ageMonths = watch ? watch("ageMonths") || "0" : "0";
  const weightNum = watch ? watch("weight") || "" : "";
  const weightUnit = watch ? watch("weightUnit") || "kg" : "kg";
  const heightNum = watch ? watch("height") || "" : "";
  const heightUnit = watch ? watch("heightUnit") || "cm" : "cm";

  // Automatically compute the unified age string
  useEffect(() => {
    if (!setValue) return;
    const yrs = parseInt(ageYears, 10) || 0;
    const mths = parseInt(ageMonths, 10) || 0;

    let computedAge = "";
    if (yrs > 0 && mths > 0) {
      computedAge = `${yrs} Yr${yrs > 1 ? "s" : ""} ${mths} Mth${mths > 1 ? "s" : ""}`;
    } else if (yrs > 0) {
      computedAge = `${yrs} Year${yrs > 1 ? "s" : ""}`;
    } else if (mths > 0) {
      computedAge = `${mths} Month${mths > 1 ? "s" : ""}`;
    } else {
      computedAge = "Under 1 Month";
    }

    setValue("age", computedAge, { shouldValidate: true });
  }, [ageYears, ageMonths, setValue]);

  const currentBreedOptions =
    breedBySpecies[selectedSpecies] || breedBySpecies.Dog;

  const handleDigitsOnly = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  const handleDecimalsOnly = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "");
    const parts = e.currentTarget.value.split(".");
    if (parts.length > 2) {
      e.currentTarget.value = parts[0] + "." + parts.slice(1).join("");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Pet Information
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Tell us about the animal&apos;s physical traits, age, gender, and breed to help caretakers identify them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pet Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Pet&apos;s Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Max (or 'Unknown' if stray)"
            {...register("petName", { required: "Pet name is required" })}
            className={`input-friendly font-medium ${
              errors.petName ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.petName && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.petName.message}
            </p>
          )}
        </div>

        {/* Species Searchable Dropdown */}
        <div className="space-y-2">
          <Controller
            name="species"
            control={control}
            rules={{ required: "Species is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Species *"
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  if (setValue) setValue("breed", "");
                }}
                placeholder="Select Species"
                searchable={true}
                error={errors.species?.message}
                options={speciesList}
              />
            )}
          />
        </div>

        {/* Breed Searchable Input */}
        <div className="space-y-2">
          <Controller
            name="breed"
            control={control}
            rules={{ required: "Breed is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Breed *"
                value={field.value}
                onChange={field.onChange}
                placeholder={`Select ${selectedSpecies || "Pet"} Breed`}
                searchable={true}
                error={errors.breed?.message}
                options={currentBreedOptions}
              />
            )}
          />
        </div>

        {/* Color Searchable Dropdown */}
        <div className="space-y-2">
          <Controller
            name="color"
            control={control}
            rules={{ required: "Primary color is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Color *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Color"
                searchable={true}
                error={errors.color?.message}
                options={colorOptions}
              />
            )}
          />
        </div>

        {/* Segmented Gender Buttons */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Gender *
          </label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Please select a gender" }}
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "Male", label: "♂️ Male" },
                  { value: "Female", label: "♀️ Female" },
                  { value: "Unknown", label: "❓ Unknown" },
                ].map((g) => {
                  const isSelected = field.value === g.value;
                  return (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => field.onChange(g.value)}
                      className={`py-3 px-4 rounded-xl text-sm font-extrabold border-2 transition-all duration-200 cursor-pointer text-center select-none ${
                        isSelected
                          ? "bg-brand-green text-white border-brand-green shadow-xs scale-102"
                          : "bg-white text-brand-brown border-brand-cardboard/35 hover:border-brand-wood/40 hover:bg-brand-bg/30"
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.gender && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Structured Age (Years + Months) */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Pet Age *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-brand-wood mb-1">
                Years
              </label>
              <select
                {...register("ageYears")}
                className="input-friendly font-medium bg-white"
              >
                {Array.from({ length: 26 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-brand-wood mb-1">
                Months
              </label>
              <select
                {...register("ageMonths")}
                className="input-friendly font-medium bg-white"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i} {i === 1 ? "Month" : "Months"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-[11px] font-bold text-brand-green mt-1">
            Selected Age: {watch ? watch("age") || "Under 1 Month" : ""}
          </p>
        </div>

        {/* Weight with Unit Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Weight
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              placeholder="e.g. 12.5"
              onInput={handleDecimalsOnly}
              {...register("weight")}
              className="input-friendly font-medium flex-grow"
            />
            <select
              {...register("weightUnit")}
              className="input-friendly font-extrabold w-24 bg-white"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        {/* Height with Unit Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Height
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              placeholder="e.g. 45"
              onInput={handleDecimalsOnly}
              {...register("height")}
              className="input-friendly font-medium flex-grow"
            />
            <select
              {...register("heightUnit")}
              className="input-friendly font-extrabold w-24 bg-white"
            >
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
