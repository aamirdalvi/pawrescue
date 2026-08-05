"use client";

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
  UseFormWatch,
} from "react-hook-form";
import { FormInputs } from "@/types/form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  Check,
  Lock,
  Sun,
  Sunrise,
  Sunset,
  Clock,
  Sparkles,
} from "lucide-react";

interface StepOwnerInfoProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  watch?: UseFormWatch<FormInputs>;
}

const contactMethodCards = [
  {
    id: "Phone",
    label: "Phone Call",
    symbol: "📞",
    icon: Phone,
    desc: "Direct phone calls",
  },
  {
    id: "Email",
    label: "Email Address",
    symbol: "✉️",
    icon: Mail,
    desc: "Email messages",
  },
  {
    id: "WhatsApp",
    label: "WhatsApp",
    symbol: "💬",
    icon: MessageSquare,
    desc: "WhatsApp chat",
  },
  {
    id: "Both",
    label: "Phone & Email",
    symbol: "📞✉️",
    icon: Sparkles,
    desc: "Calls or emails",
  },
];

const contactTimeOptions = [
  { id: "Anytime", label: "Anytime", icon: Clock, desc: "24/7 Available" },
  { id: "Morning", label: "Morning", icon: Sunrise, desc: "8 AM - 12 PM" },
  { id: "Afternoon", label: "Afternoon", icon: Sun, desc: "12 PM - 5 PM" },
  { id: "Evening", label: "Evening", icon: Sunset, desc: "5 PM - 9 PM" },
];

export default function StepOwnerInfo({
  control,
  register,
  errors,
  watch,
}: StepOwnerInfoProps) {
  const nameVal = watch ? watch("ownerName") || "" : "";
  const emailVal = watch ? watch("email") || "" : "";
  const phoneVal = watch ? watch("phone") || "" : "";
  const contactTimeVal = watch ? watch("contactTime") || "Anytime" : "Anytime";

  const isEmailValid =
    emailVal.length > 0 &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal);
  const isNameValid = nameVal.trim().length >= 3;
  const isPhoneValid =
    phoneVal.replace(/[^0-9]/g, "").length >= 8;

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Auto capitalize first letter of words
    const val = e.currentTarget.value;
    const capitalized = val.replace(/\b\w/g, (char) => char.toUpperCase());
    e.currentTarget.value = capitalized;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header with Verified Shield Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-brand-cardboard/15">
        <div>
          <h2 className="text-xl font-extrabold text-brand-brown flex items-center gap-2">
            <span>👤</span> Owner & Caretaker Information
          </h2>
          <p className="text-sm text-brand-wood font-medium mt-1">
            Your contact information will only be used by people interested in this listing.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full shadow-2xs text-xs font-extrabold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>🛡️ Verified Contact Information</span>
        </div>
      </div>

      {/* Main Two-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Caretaker Name Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
              Caretaker Name *
            </label>
            {isNameValid && (
              <span className="inline-flex items-center text-emerald-600 text-xs font-extrabold gap-1">
                <Check className="w-3.5 h-3.5" /> Valid Name
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-wood/70">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              onInput={handleNameChange}
              {...register("ownerName", {
                required: "Caretaker name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
              className={`input-friendly font-semibold pl-10 h-12 transition-all duration-200 ${
                errors.ownerName
                  ? "border-red-500 bg-red-50/10 focus:ring-2 focus:ring-red-500/20"
                  : isNameValid
                  ? "border-emerald-500/70 bg-emerald-50/10 focus:border-emerald-600"
                  : ""
              }`}
            />
          </div>
          {errors.ownerName && (
            <p className="text-red-500 text-xs font-bold mt-1 animate-in fade-in">
              {errors.ownerName.message}
            </p>
          )}
        </div>

        {/* 2. Email Address Field with Live Validation Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
              Email Address *
            </label>
            {isEmailValid && (
              <span className="inline-flex items-center text-emerald-600 text-xs font-extrabold gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3px]" /> Valid Email
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-wood/70">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address (e.g. john@example.com)",
                },
              })}
              className={`input-friendly font-semibold pl-10 h-12 transition-all duration-200 ${
                errors.email
                  ? "border-red-500 bg-red-50/10 focus:ring-2 focus:ring-red-500/20"
                  : isEmailValid
                  ? "border-emerald-500/70 bg-emerald-50/10 focus:border-emerald-600"
                  : ""
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs font-bold mt-1 animate-in fade-in">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* 3. Phone Number Field (with Country Flag & Auto-Formatting) */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
              Phone Number * (With Country Code & Flag)
            </label>
            {isPhoneValid && (
              <span className="inline-flex items-center text-emerald-600 text-xs font-extrabold gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3px]" /> Valid Phone
              </span>
            )}
          </div>

          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: (val) => {
                const digits = val ? val.replace(/[^0-9]/g, "") : "";
                if (digits.length < 8) {
                  return "Please enter a valid mobile number with country code";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <div
                className={`flex w-full rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-500 bg-red-50/20"
                    : isPhoneValid
                    ? "border-emerald-500/70 bg-emerald-50/10"
                    : "border-brand-cardboard/40 bg-brand-bg/40 focus-within:border-brand-wood"
                }`}
              >
                <PhoneInput
                  defaultCountry="in"
                  value={field.value}
                  onChange={(phoneStr) => {
                    const filtered = phoneStr.replace(/[^0-9+]/g, "");
                    field.onChange(filtered);
                  }}
                  className="w-full flex"
                  inputClassName="!w-full !h-12 !bg-transparent !border-none !text-brand-brown !font-semibold !text-sm !px-4 focus:!outline-none"
                  countrySelectorStyleProps={{
                    buttonClassName: "!h-12 !bg-transparent !border-none !px-3 hover:!bg-brand-cardboard/15 focus:!outline-none cursor-pointer",
                  }}
                />
              </div>
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs font-bold mt-1 animate-in fade-in">
              {errors.phone.message}
            </p>
          )}

          {/* Additional Checkbox: Same number available on WhatsApp */}
          <div className="pt-2">
            <label className="inline-flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked={true}
                {...register("sameWhatsApp")}
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-brand-cardboard cursor-pointer"
              />
              <span className="text-xs font-extrabold text-brand-brown">
                ☑️ Same number is available on WhatsApp
              </span>
            </label>
          </div>
        </div>

        {/* 4. Contact Method Selectable Cards */}
        <div className="space-y-3 md:col-span-2 pt-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Preferred Contact Method *
          </label>
          <Controller
            name="preferredContact"
            control={control}
            rules={{ required: "Please select a contact method" }}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {contactMethodCards.map((card) => {
                  const isSelected = field.value === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => field.onChange(card.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left relative flex flex-col justify-between cursor-pointer select-none group ${
                        isSelected
                          ? "border-brand-green bg-emerald-50/40 ring-2 ring-brand-green/20 scale-[1.02] shadow-xs"
                          : "border-brand-cardboard/30 bg-white hover:border-brand-wood/40 hover:bg-brand-bg/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{card.symbol}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center animate-in zoom-in duration-200">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-black text-brand-brown block">
                          {card.label}
                        </span>
                        <span className="text-[10px] text-brand-wood font-medium block mt-0.5">
                          {card.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.preferredContact && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.preferredContact.message}
            </p>
          )}
        </div>

        {/* 5. Optional Section: Preferred Contact Time */}
        <div className="space-y-3 md:col-span-2 pt-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Preferred Contact Time (Optional)
          </label>
          <Controller
            name="contactTime"
            control={control}
            defaultValue="Anytime"
            render={({ field }) => (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {contactTimeOptions.map((time) => {
                  const IconComp = time.icon;
                  const isSelected = (field.value || "Anytime") === time.id;

                  return (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => field.onChange(time.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center space-y-1 cursor-pointer select-none ${
                        isSelected
                          ? "border-brand-wood bg-brand-bg/60 ring-2 ring-brand-wood/15 font-black text-brand-brown scale-102"
                          : "border-brand-cardboard/30 bg-white hover:border-brand-wood/30 text-brand-wood"
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isSelected ? "text-brand-wood" : "text-brand-wood/70"}`} />
                      <span className="text-xs font-extrabold">{time.label}</span>
                      <span className="text-[9px] font-semibold text-brand-wood/80 block">{time.desc}</span>
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

      </div>

      {/* 6. Privacy Notice Card */}
      <div className="bg-brand-bg/40 border border-brand-cardboard/25 rounded-2xl p-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-brand-wood shrink-0" />
        <p className="text-xs font-bold text-brand-brown/90 leading-relaxed">
          🔒 Your phone number and email will only be shown to users viewing this listing. PawRescue keeps your data protected.
        </p>
      </div>
    </div>
  );
}
