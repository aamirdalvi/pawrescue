import React from "react";
import { UseFormRegister, FieldErrors, Controller, Control } from "react-hook-form";
import { FormInputs } from "@/types/form";
import CustomSelect from "@/components/ui/CustomSelect";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface StepOwnerInfoProps {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

export default function StepOwnerInfo({
  control,
  register,
  errors,
}: StepOwnerInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Owner & Caretaker Information
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Who should people contact? Rest assured, your email and phone will only be visible to verified community visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Caretaker Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Caretaker Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Jane Doe"
            {...register("ownerName", { required: "Caretaker name is required" })}
            className={`input-friendly font-medium ${
              errors.ownerName ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.ownerName && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.ownerName.message}
            </p>
          )}
        </div>

        {/* Preferred Contact Method Dropdown */}
        <div className="space-y-2">
          <Controller
            name="preferredContact"
            control={control}
            rules={{ required: "Preferred contact method is required" }}
            render={({ field }) => (
              <CustomSelect
                label="Preferred Contact *"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select contact method"
                error={errors.preferredContact?.message}
                options={[
                  { value: "phone", label: "📞 Phone Call" },
                  { value: "sms", label: "💬 SMS / Text" },
                  { value: "whatsapp", label: "📱 WhatsApp" },
                  { value: "email", label: "✉️ Email Address" },
                ]}
              />
            )}
          />
        </div>

        {/* Phone Number Input (with React International Phone) */}
        <div className="space-y-2">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: (val) => {
                const digits = val.replace(/[^0-9]/g, "");
                if (digits.length < 8) {
                  return "Invalid phone number length";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <div>
                <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <div className="flex">
                  <PhoneInput
                    defaultCountry="in"
                    value={field.value}
                    onChange={(phoneStr) => {
                      // Filter out letters/symbols, keep only numbers & '+'
                      const filtered = phoneStr.replace(/[^0-9+]/g, "");
                      field.onChange(filtered);
                    }}
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                    inputStyle={{
                      width: "100%",
                      backgroundColor: "rgba(255, 249, 241, 0.4)",
                      border: "1px solid rgba(231, 199, 159, 0.6)",
                      borderLeft: "none",
                      borderRadius: "0 12px 12px 0",
                      padding: "14px 16px",
                      color: "#4E342E",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                    countrySelectorStyleProps={{
                      buttonStyle: {
                        backgroundColor: "rgba(255, 249, 241, 0.4)",
                        border: "1px solid rgba(231, 199, 159, 0.6)",
                        borderRight: "none",
                        borderRadius: "12px 0 0 12px",
                        padding: "14px 12px",
                        cursor: "pointer",
                      },
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Email Input (with format checks) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="e.g. jane@example.com"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format (e.g. abc@gmail.com)",
              },
            })}
            className={`input-friendly font-medium ${
              errors.email ? "border-red-500 bg-red-50/10 focus:ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
