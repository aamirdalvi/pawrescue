import React from "react";
import { clsx } from "clsx";

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        "flex flex-col mb-8 md:mb-12",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2C241B] tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-[#5C4E3D] max-w-2xl font-bold leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={clsx(
          "h-1.5 w-16 bg-grass-green rounded-full mt-3",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
      />
    </div>
  );
}
