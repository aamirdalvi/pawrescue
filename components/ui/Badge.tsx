import React from "react";
import { clsx } from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "lost"
    | "found"
    | "adopt"
    | "foster"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "neutral"
    | "wood";
  children: React.ReactNode;
}

export default function Badge({
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center select-none transition-colors";

  const variants = {
    // Design System Badge Utilities
    lost: "badge-lost",
    found: "badge-found",
    adopt: "badge-adopt",
    foster: "badge-foster",

    // Compatibility mappings
    danger: "badge-lost",
    warning: "badge-found",
    success: "badge-adopt",
    info: "badge-foster",
    neutral:
      "bg-brand-bg text-brand-brown border border-brand-cardboard/35 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
    wood:
      "bg-brand-wood/10 text-brand-wood border border-brand-wood/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
  };

  return (
    <span
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
