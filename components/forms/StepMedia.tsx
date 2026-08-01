/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Upload, X, Film } from "lucide-react";

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      const newUrls = fileList.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newUrls]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideo(URL.createObjectURL(file));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-extrabold text-brand-brown mb-2">
          Photos & Videos
        </h2>
        <p className="text-sm text-brand-wood font-medium">
          Upload clear, high-quality media of the pet. Good images increase adoption and search success.
        </p>
      </div>

      {/* Image Drag & Drop Area */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
          Upload Images * (Select one or more)
        </label>

        <div className="relative border-2 border-dashed border-brand-cardboard/40 rounded-3xl p-8 text-center bg-brand-bg/15 hover:bg-brand-bg/35 transition-colors duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[160px] group">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-10 h-10 text-brand-wood/80 group-hover:scale-110 transition-transform duration-200 mb-3" />
          <span className="text-sm font-extrabold text-brand-brown block mb-1">
            Drag & Drop or Click to Upload
          </span>
          <span className="text-xs text-brand-wood font-medium">
            PNG, JPG, or WEBP formats up to 5MB each.
          </span>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
            {images.map((url, idx) => (
              <div
                key={idx}
                className="relative h-28 rounded-2xl overflow-hidden border border-brand-cardboard/20 shadow-xs group"
              >
                <img
                  src={url}
                  alt={`Preview ${url}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
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
              accept="video/*"
              onChange={handleVideoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Film className="w-8 h-8 text-brand-wood/80 group-hover:scale-110 transition-transform duration-200" />
            <div className="text-left">
              <span className="text-sm font-extrabold text-brand-brown block">
                Select a Video File
              </span>
              <span className="text-xs text-brand-wood font-medium">
                MP4 or WebM formats up to 20MB.
              </span>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-brand-cardboard/25 bg-black max-w-sm">
            <video src={video} controls className="w-full h-48 object-contain" />
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
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
