"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, Filter, ChevronDown } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import Container from "@/components/ui/Container";

const speciesOptions = [
  { value: "all", label: "🐾 All Species" },
  { value: "Dog", label: "🐶 Dogs" },
  { value: "Cat", label: "🐱 Cats" },
  { value: "Rabbit", label: "🐰 Rabbits" },
  { value: "Bird", label: "🦜 Birds" },
  { value: "Cow", label: "🐄 Farm Animals" },
  { value: "Horse", label: "🐴 Horses" },
  { value: "Other", label: "🐾 Other Pets" },
];

const listingTypeOptions = [
  { value: "all", label: "🌟 All Purpose" },
  { value: "adopt", label: "🏡 Adoption" },
  { value: "lost", label: "🚨 Lost Pet" },
  { value: "found", label: "🔍 Found Stray" },
  { value: "foster", label: "🤝 Foster Request" },
];

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [species, setSpecies] = useState("all");
  const [listingType, setListingType] = useState("all");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (species !== "all") params.set("species", species);
    if (listingType !== "all") params.set("listingType", listingType);
    if (location.trim()) params.set("location", location.trim());

    router.push(`/browse?${params.toString()}`);
  };

  return (
    <section className="relative -mt-10 md:-mt-14 z-30 px-4">
      <Container>
        <form
          onSubmit={handleSearch}
          className="glass-panel bg-white/90 dark:bg-[#16120D]/95 p-3 md:p-3.5 rounded-3xl md:rounded-full shadow-glass-lg border-white/80 dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 max-w-5xl mx-auto backdrop-blur-2xl transition-all duration-300"
        >
          {/* 1. Keyword Search Input */}
          <div className="flex-grow flex items-center px-3.5 py-2.5 border-b md:border-b-0 md:border-r border-brand-cardboard/20 dark:border-white/10 gap-3">
            <Search className="w-5 h-5 text-brand-wood dark:text-[#C2B3A4] shrink-0" />
            <input
              type="text"
              placeholder="Search by breed, name, or keywords..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent border-none outline-hidden text-brand-brown dark:text-[#FAF5ED] placeholder-brand-wood/60 dark:placeholder-[#8E7E70] text-sm font-semibold"
            />
          </div>

          {/* 2. Species Dropdown Selection */}
          <div className="flex-shrink-0 md:w-[190px] flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-brand-cardboard/20 dark:border-white/10 gap-2 relative">
            <Filter className="w-4 h-4 text-brand-wood dark:text-[#C2B3A4] shrink-0" />
            <div className="w-full">
              <Listbox value={species} onChange={setSpecies}>
                <div className="relative">
                  <ListboxButton className="w-full text-left bg-transparent border-none outline-hidden text-brand-brown dark:text-[#FAF5ED] text-sm font-bold cursor-pointer flex items-center justify-between">
                    <span className="truncate">
                      {speciesOptions.find((opt) => opt.value === species)?.label ||
                        "All Species"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-brand-wood/70 dark:text-[#C2B3A4]/70 shrink-0 ml-1" />
                  </ListboxButton>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-50 mt-4 max-h-60 w-52 overflow-auto rounded-2xl glass-panel bg-white/95 dark:bg-[#16120D] p-1.5 text-xs shadow-glass-lg border-white dark:border-white/10 focus:outline-hidden">
                      {speciesOptions.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className={({ focus, selected }) =>
                            `relative cursor-pointer select-none py-2.5 px-3 rounded-xl transition-colors font-bold ${
                              focus || selected
                                ? "bg-grass-green text-white shadow-glass-sm"
                                : "text-brand-brown/80 dark:text-[#FAF5ED]/80 hover:bg-white/70 dark:hover:bg-white/10"
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

          {/* 3. Listing Type Selection */}
          <div className="flex-shrink-0 md:w-[190px] flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-brand-cardboard/20 dark:border-white/10 gap-2 relative">
            <Sparkles className="w-4 h-4 text-grass-green dark:text-emerald-400 shrink-0" />
            <div className="w-full">
              <Listbox value={listingType} onChange={setListingType}>
                <div className="relative">
                  <ListboxButton className="w-full text-left bg-transparent border-none outline-hidden text-brand-brown dark:text-[#FAF5ED] text-sm font-bold cursor-pointer flex items-center justify-between">
                    <span className="truncate">
                      {listingTypeOptions.find((opt) => opt.value === listingType)?.label ||
                        "All Purpose"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-brand-wood/70 dark:text-[#C2B3A4]/70 shrink-0 ml-1" />
                  </ListboxButton>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-50 mt-4 max-h-60 w-52 overflow-auto rounded-2xl glass-panel bg-white/95 dark:bg-[#16120D] p-1.5 text-xs shadow-glass-lg border-white dark:border-white/10 focus:outline-hidden">
                      {listingTypeOptions.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className={({ focus, selected }) =>
                            `relative cursor-pointer select-none py-2.5 px-3 rounded-xl transition-colors font-bold ${
                              focus || selected
                                ? "bg-grass-green text-white shadow-glass-sm"
                                : "text-brand-brown/80 dark:text-[#FAF5ED]/80 hover:bg-white/70 dark:hover:bg-white/10"
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

          {/* 4. Location Input */}
          <div className="flex-shrink-0 md:w-[180px] flex items-center px-3 py-2 gap-2 relative">
            <MapPin className="w-4 h-4 text-brand-wood dark:text-[#C2B3A4] shrink-0" />
            <input
              type="text"
              placeholder="City or state..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-hidden text-brand-brown dark:text-[#FAF5ED] placeholder-brand-wood/60 dark:placeholder-[#8E7E70] text-sm font-semibold"
            />
          </div>

          {/* Search Action Button with Giraffe Pattern */}
          <button
            type="submit"
            className="btn-giraffe-primary py-3 px-6 rounded-2xl md:rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-glass-sm hover:shadow-glass-hover active:scale-95 cursor-pointer shrink-0"
          >
            <Search className="w-4.5 h-4.5 text-brand-brown" />
            <span className="text-brand-brown font-extrabold">Search</span>
          </button>
        </form>
      </Container>
    </section>
  );
}
