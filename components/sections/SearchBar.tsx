"use client";

import React, { useState } from "react";
import { Search, MapPin, Grid, ChevronDown } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import Container from "@/components/ui/Container";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "dogs", label: "🐶 Dogs" },
  { value: "cats", label: "🐱 Cats" },
  { value: "rabbits", label: "🐰 Rabbits" },
  { value: "birds", label: "🦜 Birds" },
  { value: "reptiles", label: "🐢 Reptiles" },
  { value: "farm", label: "🐄 Farm Animals" },
  { value: "others", label: "🐾 Others" },
];

const locationOptions = [
  { value: "all", label: "All Locations" },
  { value: "newyork", label: "New York, NY" },
  { value: "losangeles", label: "Los Angeles, CA" },
  { value: "chicago", label: "Chicago, IL" },
  { value: "houston", label: "Houston, TX" },
  { value: "sanfrancisco", label: "San Francisco, CA" },
  { value: "seattle", label: "Seattle, WA" },
];

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { keyword, category, location });
  };

  return (
    <section className="relative -mt-10 z-20 px-4">
      <Container>
        <form
          onSubmit={handleSearch}
          className="bg-white border-2 border-brand-cardboard/40 rounded-2xl md:rounded-full p-2.5 md:p-3 shadow-soft-lg flex flex-col md:flex-row items-stretch md:items-center gap-2.5 md:gap-1.5 transition-all duration-300 hover:border-brand-wood/30 max-w-5xl mx-auto"
        >
          {/* Keyword Search Input */}
          <div className="flex-grow flex items-center px-4 py-2.5 border-b md:border-b-0 md:border-r border-brand-cardboard/25 gap-3">
            <Search className="w-5 h-5 text-brand-wood shrink-0" />
            <input
              type="text"
              placeholder="Search for pets, breeds, keywords..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent border-none outline-hidden text-brand-brown placeholder-brand-wood/50 text-sm font-semibold"
            />
          </div>

          {/* Category Dropdown Selection */}
          <div className="flex-shrink-0 md:w-[220px] flex items-center px-4 py-2.5 border-b md:border-b-0 md:border-r border-brand-cardboard/25 gap-3 relative">
            <Grid className="w-5 h-5 text-brand-wood shrink-0" />
            <div className="w-full">
              <Listbox value={category} onChange={setCategory}>
                <div className="relative">
                  <ListboxButton className="w-full text-left bg-transparent border-none outline-hidden text-brand-brown text-sm font-semibold cursor-pointer flex items-center justify-between">
                    <span className="truncate">
                      {categoryOptions.find((opt) => opt.value === category)
                        ?.label || "All Categories"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-brand-wood/60 shrink-0 ml-1" />
                  </ListboxButton>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-50 mt-4 max-h-60 w-56 overflow-auto rounded-xl bg-white p-1 text-sm shadow-large border border-brand-cardboard/20 focus:outline-hidden">
                      {categoryOptions.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className={({ focus, selected }) =>
                            `relative cursor-pointer select-none py-2 px-3 rounded-lg transition-colors ${
                              focus || selected
                                ? "bg-brand-bg text-brand-brown font-extrabold"
                                : "text-brand-wood"
                            }`
                          }
                        >
                          {opt.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Location Dropdown Selection */}
          <div className="flex-shrink-0 md:w-[220px] flex items-center px-4 py-2.5 gap-3 relative">
            <MapPin className="w-5 h-5 text-brand-wood shrink-0" />
            <div className="w-full">
              <Listbox value={location} onChange={setLocation}>
                <div className="relative">
                  <ListboxButton className="w-full text-left bg-transparent border-none outline-hidden text-brand-brown text-sm font-semibold cursor-pointer flex items-center justify-between">
                    <span className="truncate">
                      {locationOptions.find((opt) => opt.value === location)
                        ?.label || "All Locations"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-brand-wood/60 shrink-0 ml-1" />
                  </ListboxButton>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-50 mt-4 max-h-60 w-56 overflow-auto rounded-xl bg-white p-1 text-sm shadow-large border border-brand-cardboard/20 focus:outline-hidden">
                      {locationOptions.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className={({ focus, selected }) =>
                            `relative cursor-pointer select-none py-2 px-3 rounded-lg transition-colors ${
                              focus || selected
                                ? "bg-brand-bg text-brand-brown font-extrabold"
                                : "text-brand-wood"
                            }`
                          }
                        >
                          {opt.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            className="md:ml-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold py-3.5 px-6 rounded-xl md:rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>
      </Container>
    </section>
  );
}
