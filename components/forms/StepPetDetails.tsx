import React from "react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { FormInputs } from "@/types/form";
import CustomSelect from "@/components/ui/CustomSelect";

interface StepPetDetailsProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const breedOptions = [
  { value: "Labrador Retriever", label: "🐶 Labrador Retriever" },
  { value: "German Shepherd", label: "🐶 German Shepherd" },
  { value: "Golden Retriever", label: "🐶 Golden Retriever" },
  { value: "French Bulldog", label: "🐶 French Bulldog" },
  { value: "Beagle", label: "🐶 Beagle" },
  { value: "Poodle", label: "🐶 Poodle" },
  { value: "Siberian Husky", label: "🐶 Siberian Husky" },
  { value: "Siamese Cat", label: "🐱 Siamese Cat" },
  { value: "Persian Cat", label: "🐱 Persian Cat" },
  { value: "Maine Coon", label: "🐱 Maine Coon" },
  { value: "Tabby Cat", label: "🐱 Tabby Cat" },
  { value: "Domestic Shorthair", label: "🐱 Domestic Shorthair" },
  { value: "Angora Rabbit", label: "🐰 Angora Rabbit" },
  { value: "Budgerigar Parakeet", label: "🦜 Budgerigar Parakeet" },
  { value: "Nigerian Dwarf Goat", label: "🐄 Nigerian Dwarf Goat" },
  { value: "Mixed Breed", label: "🐾 Mixed Breed" },
  { value: "Others", label: "🐾 Others" },
];

export default function StepPetDetails({
  control,
  register,
  errors,
}: StepPetDetailsProps) {
  // Input constraint filters
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
          Tell us about the animal&apos;s traits. Provide as much detail as you can to help identification.
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

        {/* Species Dropdown */}
        <div className="space-y-2">
          <Controller
            name="species"
            control={control}
            rules={{ required: "Species is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Species *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Species"
                error={errors.species?.message}
                options={[
                  { value: "Dog", label: "🐶 Dog" },
                  { value: "Cat", label: "🐱 Cat" },
                  { value: "Bird", label: "🦜 Bird" },
                  { value: "Rabbit", label: "🐰 Rabbit" },
                  { value: "Farm Animal", label: "🐄 Farm Animal" },
                  { value: "Others", label: "🐾 Others" },
                ]}
              />
            )}
          />
        </div>

        {/* Breed Dropdown (Searchable) */}
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
                placeholder="Select Breed"
                searchable={true}
                error={errors.breed?.message}
                options={breedOptions}
              />
            )}
          />
        </div>

        {/* Gender Dropdown */}
        <div className="space-y-2">
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Gender *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Gender"
                error={errors.gender?.message}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Unknown", label: "Unknown" },
                ]}
              />
            )}
          />
        </div>

        {/* Age (Digits Only) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Age (Months/Years in Digits) *
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 12 (or '0' if newborn)"
            onInput={handleDigitsOnly}
            {...register("age", { required: "Age is required" })}
            className={`input-friendly font-medium ${
              errors.age ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.age && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.age.message}
            </p>
          )}
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Color *
          </label>
          <input
            type="text"
            placeholder="e.g. Golden / Black & White tabby"
            {...register("color", { required: "Color is required" })}
            className={`input-friendly font-medium ${
              errors.color ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.color && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.color.message}
            </p>
          )}
        </div>

        {/* Height (Decimals Only) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Height (cm)
          </label>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 45.5"
            onInput={handleDecimalsOnly}
            {...register("height")}
            className="input-friendly font-medium"
          />
        </div>

        {/* Weight (Decimals Only) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Weight (kg)
          </label>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 12.8"
            onInput={handleDecimalsOnly}
            {...register("weight")}
            className="input-friendly font-medium"
          />
        </div>
      </div>
    </div>
  );
}
