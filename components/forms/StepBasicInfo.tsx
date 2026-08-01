import React from "react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { FormInputs } from "@/types/form";
import CustomSelect from "@/components/ui/CustomSelect";

interface StepBasicInfoProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

export default function StepBasicInfo({
  control,
  register,
  errors,
}: StepBasicInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Basic Information
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Let&apos;s start with the basics. Choose a clear, descriptive title and the listing type.
        </p>
      </div>

      {/* Listing Title */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Listing Title *
        </label>
        <input
          type="text"
          placeholder="e.g. Friendly Labrador Puppy Needs a Temporary Foster Home"
          {...register("title", { required: "Listing title is required" })}
          className={`input-friendly font-medium ${
            errors.title ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs font-bold mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Listing Type Dropdown */}
      <div className="space-y-2">
        <Controller
          name="listingType"
          control={control}
          rules={{ required: "Listing type is required" }}
          render={({ field }) => (
            <CustomSelect
              label="Listing Type *"
              value={field.value}
              onChange={field.onChange}
              placeholder="Select listing purpose"
              error={errors.listingType?.message}
              options={[
                { value: "adopt", label: "🏡 Adoption Listing" },
                { value: "lost", label: "🚨 Lost Pet Alert" },
                { value: "found", label: "🔍 Found Stray Alert" },
                { value: "foster", label: "🤝 Foster Request" },
              ]}
            />
          )}
        />
      </div>

      {/* Description Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Description *
        </label>
        <textarea
          rows={6}
          placeholder="Describe the situation, pet&apos;s temperament, how they were found/lost, or why they need adoption. Be as thorough as possible..."
          {...register("description", { required: "Description is required" })}
          className={`input-friendly font-medium resize-none rounded-2xl ${
            errors.description ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs font-bold mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
