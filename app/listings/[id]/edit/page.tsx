"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CustomSelect from "@/components/ui/CustomSelect";

interface ListingFormInput {
  title: string;
  petName: string;
  species: string;
  breed: string;
  gender: string;
  age: string;
  height?: string;
  weight?: string;
  color: string;
  listingType: string;
  vaccinated: boolean;
  sterilized: boolean;
  description: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
}

export default function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ListingFormInput>();

  // Fetch existing listing data to populate the form
  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/pets/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Listing not found.");
          }
          throw new Error(`Failed to load listing data: ${res.status}`);
        }
        const data = await res.json();
        reset(data);
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : "Failed to load listing.";
        if (errMsg !== "Listing not found.") {
          console.error("Fetch listing edit error:", err);
        }
        setError(errMsg);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListing();
  }, [id, reset]);

  const onSubmit = async (data: ListingFormInput) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating your listing...");

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update listing");
      }

      toast.success("Listing updated successfully!", { id: toastId });
      router.push(`/pets/${id}`);
    } catch (err) {
      console.error("Update listing error:", err);
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green" />
            <p className="text-sm font-bold text-brand-wood animate-pulse">
              Loading listing details to edit...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Navbar />
        <main className="flex-grow py-16 md:py-24">
          <Container>
            <div className="text-center py-12 bg-red-50/50 border border-red-200 rounded-3xl max-w-lg mx-auto p-8 shadow-xs">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Edit Error
              </h3>
              <p className="text-sm text-red-600 mb-6">{error}</p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="secondary" size="sm" href="/">
                  Back Home
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Link
              href={`/listings/${id}`}
              className="inline-flex items-center text-sm font-bold text-brand-wood hover:text-brand-green mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to listing details
            </Link>

            {/* Page Header */}
            <SectionTitle
              title="Edit Listing"
              subtitle="Update the details of your animal rescue or adoption listing."
              align="center"
            />

            {/* Form Card Container */}
            <div className="bg-white border-2 border-brand-cardboard/40 rounded-3xl p-6 md:p-10 shadow-soft-lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* 1. Basic Listing Heading */}
                <div>
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/25 pb-2 mb-4">
                    Listing Title
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Friendly Golden Retriever looking for a foster family"
                      {...register("title", { required: "Title is required" })}
                      className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs font-bold mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Pet Specifications */}
                <div>
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/25 pb-2 mb-4">
                    Pet Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {/* Pet Name */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Pet&apos;s Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Max"
                        {...register("petName", {
                          required: "Pet name is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.petName && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.petName.message}
                        </p>
                      )}
                    </div>

                    {/* Species */}
                    <div>
                      <Controller
                        name="species"
                        control={control}
                        rules={{ required: "Species is required" }}
                        render={({ field }) => (
                          <CustomSelect
                            label="Species *"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.species?.message}
                            placeholder="Select Species"
                            options={[
                              { value: "Dog", label: "Dog" },
                              { value: "Cat", label: "Cat" },
                              { value: "Rabbit", label: "Rabbit" },
                              { value: "Bird", label: "Bird" },
                              { value: "Others", label: "Others" },
                            ]}
                          />
                        )}
                      />
                    </div>

                    {/* Breed */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Breed *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Beagle / Siamese"
                        {...register("breed", {
                          required: "Breed is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.breed && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.breed.message}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Gender is required" }}
                        render={({ field }) => (
                          <CustomSelect
                            label="Gender *"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.gender?.message}
                            placeholder="Select Gender"
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                            ]}
                          />
                        )}
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Age *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 years / 3 months"
                        {...register("age", { required: "Age is required" })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.age && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.age.message}
                        </p>
                      )}
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Color *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Golden / Black & White"
                        {...register("color", {
                          required: "Color is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.color && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.color.message}
                        </p>
                      )}
                    </div>

                    {/* Height (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Height (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 45 cm"
                        {...register("height")}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                    </div>

                    {/* Weight (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Weight (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 15 kg"
                        {...register("weight")}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                    </div>

                    {/* Listing Type */}
                    <div>
                      <Controller
                        name="listingType"
                        control={control}
                        rules={{ required: "Listing type is required" }}
                        render={({ field }) => (
                          <CustomSelect
                            label="Listing Type *"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.listingType?.message}
                            placeholder="Select Type"
                            options={[
                              { value: "lost", label: "🚨 Lost Pet" },
                              { value: "found", label: "🔍 Found Stray" },
                              { value: "adopt", label: "🏡 Adoption Listing" },
                              { value: "foster", label: "🤝 Foster Request" },
                            ]}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Health status toggles */}
                <div>
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/25 pb-2 mb-4">
                    Health & Status
                  </h3>
                  <div className="flex items-center space-x-8">
                    {/* Vaccinated Checkbox */}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("vaccinated")}
                        className="w-5 h-5 rounded-md border-brand-cardboard text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-sm font-semibold text-brand-brown group-hover:text-brand-green transition-colors">
                        🛡️ Vaccinated
                      </span>
                    </label>

                    {/* Sterilized Checkbox */}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register("sterilized")}
                        className="w-5 h-5 rounded-md border-brand-cardboard text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-sm font-semibold text-brand-brown group-hover:text-brand-green transition-colors">
                        ✂️ Sterilized / Spayed
                      </span>
                    </label>
                  </div>
                </div>

                {/* 4. Description */}
                <div>
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/25 pb-2 mb-4">
                    Description
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Write a thorough description about the animal's behavior, rescue situation, health, or compatibility..."
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-2xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium resize-y"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs font-bold mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Contact Info */}
                <div>
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/25 pb-2 mb-4">
                    Caretaker / Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Owner Name */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Caretaker Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        {...register("ownerName", {
                          required: "Caretaker name is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.ownerName && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.ownerName.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Phone *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. +1 (555) 019-2834"
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. john@example.com"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Brooklyn"
                        {...register("city", { required: "City is required" })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New York"
                        {...register("state", {
                          required: "State is required",
                        })}
                        className="w-full bg-brand-bg/30 border border-brand-cardboard/40 rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-hidden focus:border-brand-wood transition-colors font-medium"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs font-bold mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Buttons Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-brand-cardboard/25">
                  <Button
                    variant="ghost"
                    size="lg"
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="wood"
                    size="lg"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
