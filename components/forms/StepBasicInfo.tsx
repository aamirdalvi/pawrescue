import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";
import { FormInputs } from "@/types/form";
import { Sparkles, Home, AlertTriangle, Search, HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";

interface StepBasicInfoProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  setValue?: UseFormSetValue<FormInputs>;
  getValues?: UseFormGetValues<FormInputs>;
  watch?: UseFormWatch<FormInputs>;
}

const listingTypes = [
  {
    id: "adopt",
    title: "Adoption",
    desc: "Find a loving permanent home",
    icon: Home,
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    activeCard: "border-brand-green bg-emerald-50/30 ring-2 ring-brand-green/20",
  },
  {
    id: "lost",
    title: "Lost Pet",
    desc: "Alert community to missing pet",
    icon: AlertTriangle,
    badgeBg: "bg-red-50 text-red-700 border-red-200",
    activeCard: "border-red-500 bg-red-50/30 ring-2 ring-red-500/20",
  },
  {
    id: "found",
    title: "Found Stray",
    desc: "Report a found animal in area",
    icon: Search,
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    activeCard: "border-amber-500 bg-amber-50/30 ring-2 ring-amber-500/20",
  },
  {
    id: "foster",
    title: "Foster Request",
    desc: "Need temporary shelter & care",
    icon: HeartHandshake,
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    activeCard: "border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20",
  },
];

export default function StepBasicInfo({
  control,
  register,
  errors,
  setValue,
  getValues,
  watch,
}: StepBasicInfoProps) {
  const descriptionValue = watch ? watch("description") || "" : "";

  const handleAutoSuggestTitle = () => {
    if (!getValues || !setValue) return;
    const type = getValues("listingType");
    const breed = getValues("breed") || "Companion";
    const name = getValues("petName");
    const city = getValues("city") || "your area";

    let suggestedTitle = "";

    switch (type) {
      case "lost":
        suggestedTitle = `🚨 ALERT: Lost ${breed}${name ? ` named ${name}` : ""} in ${city}`;
        break;
      case "found":
        suggestedTitle = `🔍 FOUND STRAY: ${breed} spotted in ${city}`;
        break;
      case "foster":
        suggestedTitle = `🤝 FOSTER NEEDED: Temporary care for ${name || breed} in ${city}`;
        break;
      case "adopt":
      default:
        suggestedTitle = `🏡 ADOPTION: ${name || breed} looking for a loving home in ${city}`;
        break;
    }

    setValue("title", suggestedTitle, { shouldValidate: true, shouldDirty: true });
    toast.success("Title auto-suggested!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Basic Information
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Choose the listing purpose and write a clear, informative title and description.
        </p>
      </div>

      {/* 1. Listing Type Icon Cards */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Listing Purpose *
        </label>
        <Controller
          name="listingType"
          control={control}
          rules={{ required: "Please select a listing purpose" }}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {listingTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = field.value === type.id;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => field.onChange(type.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-start space-x-3 cursor-pointer select-none ${
                      isSelected
                        ? type.activeCard
                        : "border-brand-cardboard/30 bg-white hover:border-brand-wood/40 hover:bg-brand-bg/20"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 ${type.badgeBg}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-sm font-extrabold text-brand-brown block truncate">
                        {type.title}
                      </span>
                      <span className="text-xs text-brand-wood font-medium block line-clamp-1">
                        {type.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.listingType && (
          <p className="text-red-500 text-xs font-bold mt-1">
            {errors.listingType.message}
          </p>
        )}
      </div>

      {/* 2. Listing Title & Auto-Suggest */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Listing Title *
          </label>
          {setValue && getValues && (
            <button
              type="button"
              onClick={handleAutoSuggestTitle}
              className="text-[11px] font-extrabold text-brand-green hover:text-brand-green-hover flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Auto-suggest Title
            </button>
          )}
        </div>
        <input
          type="text"
          placeholder="e.g. Friendly Golden Retriever Needs a Temporary Foster Home"
          {...register("title", {
            required: "Listing title is required",
            minLength: {
              value: 10,
              message: "Title must be at least 10 characters",
            },
            maxLength: {
              value: 120,
              message: "Title cannot exceed 120 characters",
            },
          })}
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

      {/* 3. Description Textarea with Character Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Detailed Description *
          </label>
          <span
            className={`text-xs font-bold ${
              descriptionValue.length > 2000
                ? "text-red-600 font-extrabold"
                : "text-brand-wood/80"
            }`}
          >
            {descriptionValue.length} / 2000 characters
          </span>
        </div>
        <textarea
          rows={6}
          placeholder="Describe the animal's story, temperament, how/where they were found or lost, medical needs, or foster requirements..."
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 2000,
              message: "Description cannot exceed 2000 characters",
            },
          })}
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
