"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import LivePreviewCard from "@/components/cards/LivePreviewCard";
import { FormInputs } from "@/types/form";

// Step Components
import StepBasicInfo from "@/components/forms/StepBasicInfo";
import StepPetDetails from "@/components/forms/StepPetDetails";
import StepHealth from "@/components/forms/StepHealth";
import StepLocation from "@/components/forms/StepLocation";
import StepMedia from "@/components/forms/StepMedia";
import StepOwnerInfo from "@/components/forms/StepOwnerInfo";
import StepReview from "@/components/forms/StepReview";

const steps = [
  "Basic Info",
  "Pet Details",
  "Health",
  "Location",
  "Media",
  "Contact",
  "Review",
];

export default function AddListingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  // Ref for active step button to center auto-scroll on mobile
  const activeStepRef = useRef<HTMLButtonElement | null>(null);

  // Elevated media states
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      listingType: "",
      description: "",
      petName: "",
      species: "",
      breed: "",
      gender: "",
      age: "",
      color: "",
      height: "",
      weight: "",
      country: "",
      state: "",
      city: "",
      area: "",
      address: "",
      pincode: "",
      ownerName: "",
      phone: "",
      email: "",
      preferredContact: "",
      vaccinated: false,
      sterilized: false,
      images: [],
      videos: [],
    },
  });

  // Watch form fields in real-time
  const watchedValues = useWatch({ control });

  // Scroll active step into view on mobile snap-scroll stepper
  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentStep]);

  // Target specific fields to validate on each step transition
  const getStepFields = (step: number): (keyof FormInputs)[] => {
    switch (step) {
      case 1:
        return ["title", "listingType", "description"];
      case 2:
        return ["petName", "species", "breed", "gender", "age", "color"];
      case 3:
        return ["vaccinated", "sterilized", "medicalNotes"];
      case 4:
        return ["country", "state", "city", "area", "address", "pincode"];
      case 5:
        return ["images", "videos"];
      case 6:
        return ["ownerName", "phone", "email", "preferredContact"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    // Trigger validation for only the current step's fields
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = async (data: FormInputs) => {
    setIsPublishing(true);
    const toastId = toast.loading("Publishing listing...");

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images,
          videos: video ? [video] : [],
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create listing.");
      }

      toast.success("Listing published successfully!", {
        id: toastId,
      });
      router.push("/pets");
    } catch (err) {
      console.error("Create listing error:", err);
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsPublishing(false);
    }
  };

  // Render current step form panel
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBasicInfo
            control={control}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepPetDetails
            control={control}
            register={register}
            errors={errors}
          />
        );
      case 3:
        return <StepHealth register={register} />;
      case 4:
        return (
          <StepLocation
            control={control}
            register={register}
            errors={errors}
          />
        );
      case 5:
        return (
          <StepMedia
            images={images}
            setImages={setImages}
            video={video}
            setVideo={setVideo}
          />
        );
      case 6:
        return (
          <StepOwnerInfo
            control={control}
            register={register}
            errors={errors}
          />
        );
      case 7:
        return <StepReview formData={getValues()} imagePreviews={images} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <SectionTitle
              title="Add A Listing"
              subtitle="Let's build a post to connect this animal with local caretakers."
              align="center"
            />

            {/* Main responsive grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
              {/* Left Column: Form & Stepper */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Redesigned Premium Stepper Progress Indicator */}
                <div className="bg-white border border-brand-cardboard/20 rounded-3xl p-5 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 relative">
                    <div className="flex items-center justify-between min-w-[760px] md:min-w-0 w-full relative px-10">
                      
                      {/* One continuous connector line behind ALL steps */}
                      <div className="absolute top-6 left-[68px] right-[68px] h-1.5 bg-brand-cardboard/15 z-0 rounded-full" />
                      
                      {/* Green active progression line */}
                      <div
                        className="absolute top-6 left-[68px] h-1.5 bg-brand-green z-0 rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `calc(${
                            ((currentStep - 1) / (steps.length - 1)) * 100
                          }% - 4px)`,
                        }}
                      />

                      {steps.map((label, idx) => {
                        const stepNum = idx + 1;
                        const isActive = currentStep === stepNum;
                        const isCompleted = currentStep > stepNum;

                        return (
                          <button
                            key={idx}
                            type="button"
                            ref={isActive ? activeStepRef : null}
                            disabled={!isCompleted && currentStep !== stepNum}
                            onClick={() =>
                              isCompleted && setCurrentStep(stepNum)
                            }
                            className="relative z-10 flex flex-col items-center snap-center focus:outline-hidden group shrink-0 w-24 cursor-pointer"
                          >
                            {/* Circle wrapper for perfect vertical centering */}
                            <div className="h-12 flex items-center justify-center relative">
                              {isActive && (
                                <>
                                  {/* Pulsing ring glowing behind active circle */}
                                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-brand-green/20 animate-ping -z-10" />
                                  <div className="absolute -inset-1 rounded-full border-2 border-brand-green/20 -z-10 animate-pulse" />
                                </>
                              )}

                              <div
                                className={`rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                                  isCompleted
                                    ? "w-9 h-9 bg-brand-green border-brand-green text-white shadow-xs hover:scale-105"
                                    : isActive
                                    ? "w-11 h-11 bg-white border-[3px] border-brand-green text-brand-green shadow-medium scale-110"
                                    : "w-9 h-9 bg-white border-2 border-brand-cardboard/35 text-brand-cardboard"
                                }`}
                              >
                                {isCompleted ? (
                                  <Check className="w-4 h-4 text-white stroke-[3px] animate-in zoom-in duration-200" />
                                ) : (
                                  <span>{stepNum}</span>
                                )}
                              </div>
                            </div>

                            {/* Centered label below with breathing room */}
                            <span
                              className={`text-[10px] font-extrabold uppercase mt-3 transition-all duration-300 tracking-wider text-center ${
                                isActive
                                  ? "text-brand-brown scale-105 font-black"
                                  : isCompleted
                                  ? "text-brand-green/90"
                                  : "text-brand-cardboard/80 opacity-75"
                              }`}
                            >
                              {label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Collapsible Preview Accordion */}
                <div className="lg:hidden bg-white border border-brand-cardboard/25 rounded-2xl overflow-hidden shadow-xs">
                  <button
                    type="button"
                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    className="w-full px-5 py-4 flex items-center justify-between font-extrabold text-sm text-brand-brown bg-brand-bg/25 hover:bg-brand-bg/35 transition-colors cursor-pointer focus:outline-hidden"
                  >
                    <span className="flex items-center gap-2">
                      👁️ Live Listing Preview (
                      {isPreviewExpanded ? "Hide" : "Show"})
                    </span>
                    <span className="text-xs">
                      {isPreviewExpanded ? "▲" : "▼"}
                    </span>
                  </button>
                  {isPreviewExpanded && (
                    <div className="p-4 border-t border-brand-cardboard/15 max-w-sm mx-auto animate-in slide-in-from-top-3 duration-250">
                      <LivePreviewCard
                        formData={watchedValues}
                        imagePreviews={images}
                      />
                    </div>
                  )}
                </div>

                {/* Form Card content */}
                <div className="bg-white border-2 border-brand-cardboard/40 rounded-3xl p-6 md:p-10 shadow-soft-lg">
                  <form
                    onSubmit={handleSubmit(handlePublish)}
                    className="space-y-8"
                  >
                    {/* Active step fields */}
                    {renderStepContent()}

                    {/* Navigation controls */}
                    <div className="flex items-center justify-between pt-6 border-t border-brand-cardboard/25">
                      <Button
                        variant="ghost"
                        size="md"
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentStep === 1 || isPublishing}
                        className="opacity-80 hover:opacity-100 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Previous
                      </Button>

                      {currentStep < steps.length ? (
                        <Button
                          variant="wood"
                          size="md"
                          type="button"
                          onClick={handleNext}
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="md"
                          type="submit"
                          loading={isPublishing}
                        >
                          Publish Listing
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Desktop Sticky Preview Card */}
              <div className="hidden lg:block lg:col-span-4 lg:self-start lg:sticky lg:top-28">
                <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-4 shadow-xs">
                  <div className="text-center py-2 border-b border-brand-cardboard/10 mb-4">
                    <span className="text-xs font-black text-brand-brown uppercase tracking-wider">
                      👁️ Live Listing Preview
                    </span>
                  </div>
                  <LivePreviewCard
                    formData={watchedValues}
                    imagePreviews={images}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
