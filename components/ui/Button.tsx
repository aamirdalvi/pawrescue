import React from "react";
import { clsx } from "clsx";
import Link from "next/link";

interface BaseButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "cta"
    | "ghost"
    | "wood";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

type HTMLButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type HTMLAnchorProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = HTMLButtonProps | HTMLAnchorProps;

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-black transition-all duration-300 cursor-pointer focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-3xl";

  const variants = {
    primary: "btn-giraffe-primary",
    secondary: "btn-grass-secondary",
    outline: "btn-brand-outline",
    danger: "btn-brand-danger",
    cta: "btn-giraffe-primary",
    ghost:
      "bg-transparent text-brand-brown hover:bg-brand-cardboard/20 rounded-3xl transition-colors duration-200",
    wood: "btn-grass-secondary",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const resolvedSize = variant === "cta" ? "lg" : size;

  const buttonClasses = clsx(
    baseStyles,
    variants[variant],
    sizes[resolvedSize],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props as HTMLAnchorProps;
    return (
      <Link href={href} className={buttonClasses} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as HTMLButtonProps;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
