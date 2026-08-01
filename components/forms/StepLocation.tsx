import React from "react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { FormInputs } from "@/types/form";
import CustomSelect from "@/components/ui/CustomSelect";

interface StepLocationProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const countryOptions = [
  { value: "United States", label: "🇺🇸 United States" },
  { value: "India", label: "🇮🇳 India" },
  { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
  { value: "Canada", label: "🇨🇦 Canada" },
  { value: "Australia", label: "🇦🇺 Australia" },
];

const stateOptions = [
  { value: "New York", label: "New York" },
  { value: "California", label: "California" },
  { value: "Texas", label: "Texas" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Delhi", label: "Delhi" },
  { value: "London", label: "London" },
  { value: "Ontario", label: "Ontario" },
];

const cityOptions = [
  { value: "Brooklyn", label: "Brooklyn" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Houston", label: "Houston" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "Toronto", label: "Toronto" },
  { value: "Sydney", label: "Sydney" },
];

export default function StepLocation({
  control,
  register,
  errors,
}: StepLocationProps) {
  const handleDigitsOnly = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Location Details
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Where is this pet located? Accurate location helps neighborhood rescues and owners find them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Country */}
        <div className="space-y-2">
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Country *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Country"
                searchable={true}
                error={errors.country?.message}
                options={countryOptions}
              />
            )}
          />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <CustomSelect
                label="State *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select State"
                searchable={true}
                error={errors.state?.message}
                options={stateOptions}
              />
            )}
          />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <CustomSelect
                label="City *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select City"
                searchable={true}
                error={errors.city?.message}
                options={cityOptions}
              />
            )}
          />
        </div>

        {/* Area */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Area / Neighborhood *
          </label>
          <input
            type="text"
            placeholder="e.g. Park Slope / Green Valley"
            {...register("area", { required: "Area/Neighborhood is required" })}
            className={`input-friendly font-medium ${
              errors.area ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.area && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.area.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Street Address *
          </label>
          <input
            type="text"
            placeholder="e.g. 123 Sanctuary Road, Apt 4B"
            {...register("address", { required: "Address is required" })}
            className={`input-friendly font-medium ${
              errors.address ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Pincode (Digits Only) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Pincode / Zip Code *
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 11201"
            onInput={handleDigitsOnly}
            {...register("pincode", { required: "Pincode/Zip Code is required" })}
            className={`input-friendly font-medium ${
              errors.pincode ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.pincode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
