import React from "react";
import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      {/* 1. Header/Navbar & Breadcrumbs Skeleton placeholders */}
      <div className="h-16 w-full bg-white border-b border-brand-cardboard/15 animate-pulse" />
      <div className="py-4 border-b border-brand-cardboard/10 bg-brand-bg/50">
        <Container>
          <div className="h-4 w-48 bg-brand-cardboard/25 rounded-md animate-pulse" />
        </Container>
      </div>

      <main className="flex-grow py-8 md:py-12">
        <Container>
          <div className="space-y-8">
            {/* 2. Top-level action/edit bar skeleton */}
            <div className="flex justify-end gap-3">
              <div className="w-28 h-9 bg-white border border-brand-cardboard/20 rounded-xl animate-pulse" />
              <div className="w-28 h-9 bg-red-50/50 border border-red-100 rounded-xl animate-pulse" />
            </div>

            {/* 3. Main Dual-Column Details Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column Skeleton */}
              <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                {/* Image Gallery Skeleton */}
                <div className="bg-white border-2 border-brand-cardboard/25 rounded-3xl p-2 shadow-soft space-y-3 animate-pulse">
                  <div className="h-[300px] sm:h-[400px] md:h-[450px] bg-brand-bg/60 rounded-2xl w-full" />
                  <div className="flex gap-3 overflow-x-auto py-1">
                    <div className="w-20 h-16 bg-brand-bg/60 rounded-xl shrink-0" />
                    <div className="w-20 h-16 bg-brand-bg/60 rounded-xl shrink-0" />
                    <div className="w-20 h-16 bg-brand-bg/60 rounded-xl shrink-0" />
                  </div>
                </div>

                {/* About/Description Skeleton */}
                <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs space-y-4 animate-pulse">
                  <div className="h-6 w-32 bg-brand-cardboard/35 rounded-md" />
                  <div className="space-y-2">
                    <div className="h-4 bg-brand-bg/85 rounded-md w-full" />
                    <div className="h-4 bg-brand-bg/85 rounded-md w-11/12" />
                    <div className="h-4 bg-brand-bg/85 rounded-md w-4/5" />
                    <div className="h-4 bg-brand-bg/85 rounded-md w-3/4" />
                  </div>
                </div>

                {/* Location Card Skeleton */}
                <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs space-y-5 animate-pulse">
                  <div className="h-6 w-40 bg-brand-cardboard/35 rounded-md" />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 space-y-3">
                      <div className="space-y-1">
                        <div className="h-3 w-28 bg-brand-cardboard/20 rounded-md" />
                        <div className="h-4 w-40 bg-brand-bg/80 rounded-md" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-brand-cardboard/20 rounded-md" />
                        <div className="h-4 w-44 bg-brand-bg/80 rounded-md" />
                      </div>
                    </div>
                    <div className="md:col-span-7 h-48 bg-brand-bg/40 border border-brand-cardboard/15 rounded-2xl w-full" />
                  </div>
                </div>

                {/* Caretaker/Owner Card Skeleton */}
                <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 shadow-xs space-y-5 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-brand-bg/70" />
                    <div className="space-y-2">
                      <div className="h-3.5 w-16 bg-brand-cardboard/20 rounded-md" />
                      <div className="h-4 w-32 bg-brand-bg/80 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-10 bg-brand-bg/60 rounded-xl" />
                    <div className="h-10 bg-brand-bg/60 rounded-xl" />
                    <div className="h-10 bg-brand-bg/60 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="lg:col-span-4 bg-white border-2 border-brand-cardboard/45 rounded-3xl p-6 shadow-medium space-y-6 animate-pulse">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-24 bg-brand-cardboard/25 rounded-full" />
                    <div className="h-4 w-16 bg-brand-bg/60 rounded-md" />
                  </div>
                  <div className="h-7 w-3/4 bg-brand-bg/85 rounded-md" />
                  <div className="h-4 w-1/2 bg-brand-bg/60 rounded-md" />
                </div>
                <div className="border-t border-brand-cardboard/10" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-brand-bg/50 rounded-xl" />
                  <div className="h-12 bg-brand-bg/50 rounded-xl" />
                  <div className="h-12 bg-brand-bg/50 rounded-xl" />
                  <div className="h-12 bg-brand-bg/50 rounded-xl" />
                </div>
                <div className="border-t border-brand-cardboard/10" />
                <div className="space-y-3">
                  <div className="h-10 bg-brand-bg/70 rounded-xl w-full" />
                  <div className="h-10 bg-brand-bg/70 rounded-xl w-full" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
