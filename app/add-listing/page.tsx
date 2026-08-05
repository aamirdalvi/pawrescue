"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
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

const DRAFT_STORAGE_KEY = "pawrescue_add_listing_draft";

export default function AddListingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const activeStepRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormInputs>({
    mode: "onBlur",
    defaultValues: {
      listingType: "adopt",
      species: "Dog",
      gender: "Male",
      color: "Brown",
      vaccinated: true,
      sterilized: false,
      microchipped: false,
      specialNeeds: false,
      friendlyChildren: true,
      friendlyDogs: true,
      friendlyCats: false,
      preferredContact: "phone",
      country: "India",
    },
  });

  const watchedValues = useWatch({ control });

  // 1. Restore draft on mount if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) {
          reset(parsed.formData);
        }
        if (parsed.images) {
          setImages(parsed.images);
        }
        if (parsed.video) {
          setVideo(parsed.video);
        }
        toast((t) => (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold">Draft restored from your last session.</span>
            <button
              onClick={() => {
                localStorage.removeItem(DRAFT_STORAGE_KEY);
                toast.dismiss(t.id);
                toast.success("Draft cleared.");
              }}
              className="text-[10px] font-black text-red-600 underline cursor-pointer"
            >
              Clear Draft
            </button>
          </div>
        ), { duration: 6000 });
      }
    } catch (err) {
      console.error("Failed to restore draft:", err);
    }
  }, [reset]);

  // 2. Autosave draft to localStorage on changes
  useEffect(() => {
    if (isDirty || images.length > 0) {
      const timeoutId = setTimeout(() => {
        try {
          const draftPayload = {
            formData: getValues(),
            images,
            video,
          };
          localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPayload));
        } catch (err) {
          console.error("Autosave draft error:", err);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, images, video, isDirty, getValues]);

  // 3. Warn before leaving page if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || images.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, images]);

  // Scroll active stepper item into view on mobile
  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentStep]);

  // Validate step fields before advancing
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormInputs)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["title", "listingType", "species", "breed"];
        break;
      case 2:
        fieldsToValidate = ["age", "color", "description"];
        break;
      case 3:
        fieldsToValidate = [];
        break;
      case 4:
        fieldsToValidate = ["state", "city"];
        break;
      case 5:
        if (images.length === 0) {
          toast.error("Please upload at least 1 image of the pet.");
          return;
        }
        break;
      case 6:
        fieldsToValidate = ["ownerName", "phone"];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) {
        toast.error("Please fill in all required fields marked with *.");
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: FormInputs) => {
    if (images.length === 0) {
      toast.error("Please upload at least 1 pet photo.");
      return;
    }

    setIsPublishing(true);
    const toastId = toast.loading("Publishing listing to PawRescue sanctuary...");

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

      localStorage.removeItem(DRAFT_STORAGE_KEY);

      toast.success("Listing published successfully!", {
        id: toastId,
      });
      router.push("/browse");
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
            watch={watch}
          />
        );
      case 2:
        return (
          <StepPetDetails
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
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
            setValue={setValue}
            watch={watch}
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
            watch={watch}
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
      <Breadcrumb />

      <main className="flex-grow py-8 md:py-12">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <SectionTitle
              title="Add A Pet Listing"
              subtitle="Connect this animal with local caretakers, adopters, and neighborhood rescue teams."
              align="center"
            />

            {/* Main responsive grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
              {/* Left Column: Form & Stepper */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Stepper Progress Indicator */}
                <div className="glass-panel rounded-3xl p-5 shadow-glass-sm border-white">
                  <div className="overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 relative">
                    <div className="flex items-center justify-between min-w-[760px] md:min-w-0 w-full relative px-10">
                      
                      {/* Connector line behind steps */}
                      <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-brand-cardboard/25 -z-0" />
                      
                      {/* Completed progress fill line */}
                      <div
                        className="absolute left-12 top-1/2 -translate-y-1/2 h-1 bg-grass-green transition-all duration-500 ease-out -z-0"
                        style={{
                          width: `${((currentStep - 1) / (steps.length - 1)) * 84}%`,
                        }}
                      />

                      {steps.map((label, idx) => {
                        const stepNum = idx + 1;
                        const isCompleted = stepNum < currentStep;
                        const isActive = stepNum === currentStep;

                        return (
                          <div
                            key={idx}
                            ref={isActive ? activeStepRef : null}
                            className="flex flex-col items-center relative z-10 snap-center group cursor-pointer"
                            onClick={() => {
                              if (stepNum < currentStep) {
                                setCurrentStep(stepNum);
                              }
                            }}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 shadow-glass-sm border-2 ${
                                isCompleted
                                  ? "bg-grass-green text-white border-grass-green"
                                  : isActive
                                  ? "btn-giraffe-primary scale-110"
                                  : "bg-white text-[#5C4E3D] border-brand-cardboard/40"
                              }`}
                            >
                              {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                            </div>
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider mt-2 transition-colors ${
                                isActive
                                  ? "text-grass-green font-extrabold"
                                  : isCompleted
                                  ? "text-[#2C241B]"
                                  : "text-[#5C4E3D]/70"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Form Step Body Card */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass-card rounded-3xl p-6 sm:p-8 shadow-glass-lg border-white/95 space-y-6"
                >
                  {renderStepContent()}

                  {/* Wizard Bottom Nav Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-brand-cardboard/20">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                    >
                      ← Back
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleNext}
                      >
                        Next Step →
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isPublishing}
                      >
                        🐾 Publish Rescue Listing
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Desktop Sticky Live Preview Card */}
              <div className="hidden lg:block lg:col-span-4 sticky top-28">
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#2C241B] flex items-center gap-1.5">
                      <span>👁</span> Live Card Preview
                    </h3>
                    <span className="text-[10px] font-bold text-grass-green glass-pill px-2.5 py-0.5 bg-emerald-50">
                      Real-time update
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
