"use client";

import React, { useRef } from "react";
import { Upload, X, Film, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface StepMediaProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  video: string | null;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function StepMedia({
  images,
  setImages,
  video,
  setVideo,
}: StepMediaProps) {
  const objectUrlsRef = useRef<string[]>([]);

  // Helper to convert File to base64 Data URL for persistent storage
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const fileList = Array.from(e.target.files);
    const toastId = toast.loading(`Processing ${fileList.length} image(s)...`);

    try {
      // 1. Create temporary Object URLs for zero-latency local preview
      const tempUrls = fileList.map((file) => {
        const url = URL.createObjectURL(file);
        objectUrlsRef.current.push(url);
        return url;
      });

      // Show temporary object URLs immediately for instant UI feedback
      setImages((prev) => [...prev, ...tempUrls]);

      // 2. Convert files to base64 Data URLs to ensure they persist across steps, localStorage, and MongoDB
      const base64Results = await Promise.all(
        fileList.map((file) => convertFileToBase64(file))
      );

      // Replace the temporary object URLs with persistent base64 strings & revoke temp object URLs
      setImages((prev) => {
        const filtered = prev.filter((img) => !tempUrls.includes(img));
        return [...filtered, ...base64Results];
      });

      tempUrls.forEach((url) => URL.revokeObjectURL(url));
      toast.success("Images loaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Image processing error:", err);
      toast.error("Failed to process selected images.", { id: toastId });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        toast.error("Video file size must be less than 25MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      objectUrlsRef.current.push(url);
      setVideo(url);
      toast.success("Video added!");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if (target && target.startsWith("blob:")) {
        URL.revokeObjectURL(target);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeVideo = () => {
    if (video && video.startsWith("blob:")) {
      URL.revokeObjectURL(video);
    }
    setVideo(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Photos & Videos
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Upload clear photos of the pet. Quality media increases adoption interest and helps lost pet identification.
        </p>
      </div>

      {/* Image Upload Area */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
            Upload Images * (Select one or more)
          </label>
          <span className="text-xs font-extrabold text-brand-green">
            {images.length} Image(s) Added
          </span>
        </div>

        <div className="relative border-2 border-dashed border-brand-cardboard/40 rounded-3xl p-8 text-center bg-brand-bg/15 hover:bg-brand-bg/35 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[160px] group">
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <Upload className="w-10 h-10 text-brand-wood/80 group-hover:scale-110 transition-transform duration-200 mb-3" />
          <span className="text-sm font-extrabold text-brand-brown block mb-1">
            Drag & Drop or Click to Upload Images
          </span>
          <span className="text-xs text-brand-wood font-medium">
            PNG, JPG, or WEBP up to 5MB each.
          </span>
        </div>

        {/* Image Previews Grid */}
        {images.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-brand-wood uppercase tracking-wider block">
              Active Photo Previews (Drag/Remove as needed)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-1">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className="relative h-28 rounded-2xl overflow-hidden border-2 border-brand-cardboard/35 shadow-xs group bg-black/5"
                >
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 text-[9px] font-black uppercase bg-brand-green text-white px-2 py-0.5 rounded-full shadow-xs">
                      Main Photo
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer shadow-xs z-10"
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-brand-cardboard/15" />

      {/* Video Upload Area */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Upload Video (optional)
        </label>

        {!video ? (
          <div className="relative border-2 border-dashed border-brand-cardboard/40 rounded-3xl p-6 text-center bg-brand-bg/15 hover:bg-brand-bg/35 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-4 group">
            <input
              type="file"
              accept="video/mp4, video/webm"
              onChange={handleVideoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <Film className="w-8 h-8 text-brand-wood/80 group-hover:scale-110 transition-transform duration-200" />
            <div className="text-left">
              <span className="text-sm font-extrabold text-brand-brown block">
                Select a Video File
              </span>
              <span className="text-xs text-brand-wood font-medium">
                MP4 or WebM formats up to 25MB.
              </span>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border-2 border-brand-cardboard/35 bg-black max-w-sm">
            <video src={video} controls className="w-full h-48 object-contain" />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer z-10"
              aria-label="Remove video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
