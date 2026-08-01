import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  searchable?: boolean;
  className?: string;
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  searchable = false,
  className,
}: CustomSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div className={clsx("w-full space-y-1.5", className)}>
      {label && (
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          {label}
        </label>
      )}

      <Listbox value={value || ""} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "w-full text-left bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3.5 text-sm text-brand-brown focus:outline-hidden transition-all duration-200 cursor-pointer flex items-center justify-between shadow-xs",
              error
                ? "border-red-500 bg-red-50/10 focus:ring-1 focus:ring-red-500"
                : "focus:border-brand-wood focus:ring-1 focus:ring-brand-wood"
            )}
          >
            <span
              className={clsx(
                "block truncate font-medium",
                !selectedOption && "text-brand-wood/60"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none flex items-center pr-1">
              <ChevronDown
                className="h-4 w-4 text-brand-wood/70"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-sm shadow-large border border-brand-cardboard/25 focus:outline-hidden">
              {searchable && (
                <div className="sticky top-0 z-10 bg-white px-3 py-2 border-b border-brand-cardboard/10">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-bg/40 border border-brand-cardboard/35 rounded-xl px-3 py-2 text-xs text-brand-brown focus:outline-hidden focus:border-brand-wood"
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="relative cursor-default select-none py-3 px-4 text-brand-wood/70 text-xs italic font-medium">
                  No matching options.
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <ListboxOption
                    key={opt.value}
                    value={opt.value}
                    className={({ focus, selected }) =>
                      clsx(
                        "relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors font-medium text-brand-brown",
                        focus && "bg-brand-bg/60 text-brand-brown",
                        selected && "font-bold text-brand-wood bg-brand-bg/30"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            selected ? "font-bold" : "font-medium"
                          )}
                        >
                          {opt.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-3 flex items-center text-brand-wood">
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))
              )}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      {error && (
        <p className="text-red-500 text-xs font-bold mt-0.5">{error}</p>
      )}
    </div>
  );
}
