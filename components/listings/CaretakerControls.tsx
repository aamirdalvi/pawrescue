"use client";

        import React from "react";
        import Button from "@/components/ui/Button";
        import toast from "react-hot-toast";
        import { useRouter } from "next/navigation";

        interface CaretakerControlsProps {
          id: string;
        }

        export default function CaretakerControls({ id }: CaretakerControlsProps) {
          const router = useRouter();

          const handleDelete = async () => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this listing permanently?"
            );
            if (!confirmDelete) return;

            const toastId = toast.loading("Deleting listing...");
            try {
              const res = await fetch(`/api/pets/${id}`, {
                method: "DELETE",
              });

              if (!res.ok) {
                throw new Error("Failed to delete listing.");
              }

              toast.success("Listing deleted successfully!", { id: toastId });
              router.push("/browse");
            } catch (err) {
              console.error(err);
              toast.error("Failed to delete listing.", { id: toastId });
            }
          };

          return (
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                href={`/listings/edit/${id}`}
                className="flex items-center gap-1.5 text-xs font-bold bg-white shadow-soft"
              >
                ✍️ Edit Listing
              </Button>
              <button
                onClick={handleDelete}
                type="button"
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-extrabold rounded-xl border border-red-200/50 flex items-center gap-1.5 transition-all cursor-pointer focus:outline-hidden shadow-soft"
              >
                🗑️ Delete Listing
              </button>
            </div>
          );
        }
