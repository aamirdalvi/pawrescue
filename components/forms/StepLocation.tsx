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
import toast from "react-hot-toast";

interface StepLocationProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  setValue?: UseFormSetValue<FormInputs>;
  watch?: UseFormWatch<FormInputs>;
}

const countryOptions = [
  { value: "India", label: "🇮🇳 India" },
  { value: "United States", label: "🇺🇸 United States" },
  { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
  { value: "Canada", label: "🇨🇦 Canada" },
  { value: "Australia", label: "🇦🇺 Australia" },
  { value: "United Arab Emirates", label: "🇦🇪 United Arab Emirates" },
  { value: "Singapore", label: "🇸🇬 Singapore" },
  { value: "Other", label: "🌐 Other Country" },
];

const stateOptions: Record<string, { value: string; label: string }[]> = {
  India: [
    { value: "Karnataka", label: "Karnataka" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Kerala", label: "Kerala" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Punjab", label: "Punjab" },
    { value: "Haryana", label: "Haryana" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Goa", label: "Goa" },
    { value: "Other State", label: "Other State" },
  ],
  "United States": [
    { value: "California", label: "California" },
    { value: "New York", label: "New York" },
    { value: "Texas", label: "Texas" },
    { value: "Florida", label: "Florida" },
    { value: "Illinois", label: "Illinois" },
  ],
  "United Kingdom": [
    { value: "England", label: "England" },
    { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" },
  ],
  Other: [
    { value: "Default Region", label: "Default Region" },
  ],
};

const citiesByState: Record<string, { value: string; label: string }[]> = {
  Karnataka: [
    { value: "Bangalore", label: "Bangalore (Bengaluru)" },
    { value: "Mysore", label: "Mysore (Mysuru)" },
    { value: "Hubli", label: "Hubli-Dharwad" },
    { value: "Mangalore", label: "Mangalore (Mangaluru)" },
    { value: "Belgaum", label: "Belgaum" },
    { value: "Gulbarga", label: "Gulbarga" },
    { value: "Davangere", label: "Davangere" },
    { value: "Tumkur", label: "Tumkur" },
  ],
  Maharashtra: [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Pune", label: "Pune" },
    { value: "Nagpur", label: "Nagpur" },
    { value: "Nashik", label: "Nashik" },
    { value: "Thane", label: "Thane" },
    { value: "Chhatrapati Sambhaji Nagar", label: "Chhatrapati Sambhaji Nagar" },
    { value: "Solapur", label: "Solapur" },
    { value: "Navi Mumbai", label: "Navi Mumbai" },
  ],
  Delhi: [
    { value: "New Delhi", label: "New Delhi" },
    { value: "North Delhi", label: "North Delhi" },
    { value: "South Delhi", label: "South Delhi" },
    { value: "East Delhi", label: "East Delhi" },
    { value: "West Delhi", label: "West Delhi" },
  ],
  "Tamil Nadu": [
    { value: "Chennai", label: "Chennai" },
    { value: "Coimbatore", label: "Coimbatore" },
    { value: "Madurai", label: "Madurai" },
    { value: "Tiruchirappalli", label: "Tiruchirappalli" },
    { value: "Salem", label: "Salem" },
  ],
  Telangana: [
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Warangal", label: "Warangal" },
    { value: "Nizamabad", label: "Nizamabad" },
  ],
  Gujarat: [
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Surat", label: "Surat" },
    { value: "Vadodara", label: "Vadodara" },
    { value: "Rajkot", label: "Rajkot" },
  ],
  Kerala: [
    { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
    { value: "Kochi", label: "Kochi (Cochin)" },
    { value: "Kozhikode", label: "Kozhikode (Calicut)" },
    { value: "Thrissur", label: "Thrissur" },
  ],
  "West Bengal": [
    { value: "Kolkata", label: "Kolkata" },
    { value: "Howrah", label: "Howrah" },
    { value: "Siliguri", label: "Siliguri" },
    { value: "Durgapur", label: "Durgapur" },
  ],
  "Uttar Pradesh": [
    { value: "Lucknow", label: "Lucknow" },
    { value: "Kanpur", label: "Kanpur" },
    { value: "Ghaziabad", label: "Ghaziabad" },
    { value: "Noida", label: "Noida" },
    { value: "Agra", label: "Agra" },
    { value: "Varanasi", label: "Varanasi" },
  ],
  Rajasthan: [
    { value: "Jaipur", label: "Jaipur" },
    { value: "Jodhpur", label: "Jodhpur" },
    { value: "Kota", label: "Kota" },
    { value: "Udaipur", label: "Udaipur" },
  ],
  Punjab: [
    { value: "Ludhiana", label: "Ludhiana" },
    { value: "Amritsar", label: "Amritsar" },
    { value: "Jalandhar", label: "Jalandhar" },
    { value: "Mohali", label: "Mohali" },
  ],
  Haryana: [
    { value: "Gurgaon", label: "Gurgaon (Gurugram)" },
    { value: "Faridabad", label: "Faridabad" },
    { value: "Panipat", label: "Panipat" },
  ],
  "Madhya Pradesh": [
    { value: "Indore", label: "Indore" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Jabalpur", label: "Jabalpur" },
  ],
  California: [
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "San Diego", label: "San Diego" },
  ],
  "New York": [
    { value: "Brooklyn", label: "Brooklyn" },
    { value: "Manhattan", label: "Manhattan" },
    { value: "Queens", label: "Queens" },
  ],
  England: [
    { value: "London", label: "London" },
    { value: "Manchester", label: "Manchester" },
    { value: "Birmingham", label: "Birmingham" },
  ],
};

const pincodeLookup: Record<string, { state: string; city: string }> = {
  "560": { state: "Karnataka", city: "Bangalore" },
  "570": { state: "Karnataka", city: "Mysore" },
  "400": { state: "Maharashtra", city: "Mumbai" },
  "411": { state: "Maharashtra", city: "Pune" },
  "110": { state: "Delhi", city: "New Delhi" },
  "600": { state: "Tamil Nadu", city: "Chennai" },
  "500": { state: "Telangana", city: "Hyderabad" },
  "380": { state: "Gujarat", city: "Ahmedabad" },
  "700": { state: "West Bengal", city: "Kolkata" },
  "682": { state: "Kerala", city: "Kochi" },
  "302": { state: "Rajasthan", city: "Jaipur" },
  "201": { state: "Uttar Pradesh", city: "Noida" },
  "122": { state: "Haryana", city: "Gurgaon" },
};

export default function StepLocation({
  control,
  register,
  errors,
  setValue,
  watch,
}: StepLocationProps) {
  const selectedCountry = watch ? watch("country") || "India" : "India";
  const selectedState = watch ? watch("state") : "";
  const pincodeVal = watch ? watch("pincode") || "" : "";

  // Dynamic state options based on country
  const currentStates =
    stateOptions[selectedCountry] || stateOptions.India;

  // Dynamic city options based on state
  const currentCities = selectedState
    ? citiesByState[selectedState] || [
        { value: "Central City", label: `${selectedState} Main City` },
        { value: "Other Location", label: "Other Location" },
      ]
    : [];

  // Pincode auto-detection logic
  useEffect(() => {
    if (!setValue || pincodeVal.length !== 6) return;
    const prefix = pincodeVal.substring(0, 3);
    const match = pincodeLookup[prefix];

    if (match) {
      setValue("country", "India", { shouldValidate: true });
      setValue("state", match.state, { shouldValidate: true });
      setTimeout(() => {
        setValue("city", match.city, { shouldValidate: true });
      }, 50);
      toast.success(`Location auto-detected: ${match.city}, ${match.state}`);
    }
  }, [pincodeVal, setValue]);

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
          Accurate location helps local caretakers and animal lovers find this listing quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Country Searchable Dropdown */}
        <div className="space-y-2">
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Country *"
                value={field.value || "India"}
                onChange={(val) => {
                  field.onChange(val);
                  if (setValue) {
                    setValue("state", "");
                    setValue("city", "");
                  }
                }}
                placeholder="Select Country"
                searchable={true}
                error={errors.country?.message}
                options={countryOptions}
              />
            )}
          />
        </div>

        {/* State Searchable Dropdown */}
        <div className="space-y-2">
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <CustomSelect
                label="State / Region *"
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  if (setValue) setValue("city", "");
                }}
                placeholder={`Select ${selectedCountry} State`}
                searchable={true}
                error={errors.state?.message}
                options={currentStates}
              />
            )}
          />
        </div>

        {/* City Searchable Dropdown */}
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
                placeholder={
                  selectedState
                    ? `Select City in ${selectedState}`
                    : "Select State First"
                }
                searchable={true}
                error={errors.city?.message}
                options={
                  currentCities.length > 0
                    ? currentCities
                    : [{ value: "Main City", label: "Main City" }]
                }
              />
            )}
          />
        </div>

        {/* Area / Neighborhood */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Area / Neighborhood *
          </label>
          <input
            type="text"
            placeholder="e.g. Indiranagar / Koramangala"
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

        {/* Pincode with 6-digit validation and auto-detect */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
              Pincode / Postal Code * (6-digit numeric)
            </label>
            <span className="text-[11px] font-bold text-brand-green">
              ⚡ Typing 6-digit pincode auto-detects City & State
            </span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="e.g. 560001"
            onInput={handleDigitsOnly}
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Pincode must be exactly 6 numeric digits",
              },
            })}
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

        {/* Multi-line Street Address Textarea */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Street Address * (Multi-line)
          </label>
          <textarea
            rows={3}
            placeholder="e.g. #42, 5th Cross, Near Sanctuary Park Gate, Indiranagar Stage 2"
            {...register("address", { required: "Street address is required" })}
            className={`input-friendly font-medium resize-none rounded-2xl ${
              errors.address ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
