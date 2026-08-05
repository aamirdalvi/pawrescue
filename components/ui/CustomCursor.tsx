"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const pawRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer desktop devices (mouse)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;
    let animationFrameId: number;

    const checkIsInteractive = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      return !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.closest("[role='button']")
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (pawRef.current) pawRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const isHovering = checkIsInteractive(target);

      if (pawRef.current) {
        if (isHovering) {
          pawRef.current.classList.add("cat-paw-hover");
        } else {
          pawRef.current.classList.remove("cat-paw-hover");
        }
      }
    };

    const handleMouseDown = () => {
      if (pawRef.current) pawRef.current.classList.add("cat-paw-tap");
    };

    const handleMouseUp = () => {
      if (pawRef.current) pawRef.current.classList.remove("cat-paw-tap");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (pawRef.current) pawRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (pawRef.current) pawRef.current.style.opacity = "1";
    };

    // 120fps direct DOM animation loop
    const render = () => {
      if (isVisible && pawRef.current) {
        pawRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden hidden md:block select-none">
      {/* Main High-Fidelity Cat Paw Vector Cursor Only */}
      <div
        ref={pawRef}
        className="fixed top-0 left-0 opacity-0 transition-opacity duration-150 will-change-transform drop-shadow-md"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cat-paw-svg transition-transform duration-150 ease-out"
        >
          {/* Outer Soft White/Cream Fur Backing */}
          <path
            d="M16 12C11 12 7.5 15.5 7.5 20.5C7.5 25.5 11 28.5 16 28.5C21 28.5 24.5 25.5 24.5 20.5C24.5 15.5 21 12 16 12Z"
            fill="#FFFDF9"
            stroke="#2C241B"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Main Pink Toe Bean */}
          <path
            d="M16 17.5C13.5 17.5 11.5 19.5 11.5 22C11.5 24 13.2 25.5 16 25.5C18.8 25.5 20.5 24 20.5 22C20.5 19.5 18.5 17.5 16 17.5Z"
            fill="#FF85A1"
          />

          {/* Toe 1 (Left Outer) */}
          <ellipse cx="8.5" cy="14" rx="2.8" ry="4" fill="#FF85A1" stroke="#2C241B" strokeWidth="1.4" transform="rotate(-25 8.5 14)" />
          
          {/* Toe 2 (Left Inner) */}
          <ellipse cx="13" cy="10" rx="2.8" ry="4.5" fill="#FF85A1" stroke="#2C241B" strokeWidth="1.4" transform="rotate(-8 13 10)" />
          
          {/* Toe 3 (Right Inner) */}
          <ellipse cx="19" cy="10" rx="2.8" ry="4.5" fill="#FF85A1" stroke="#2C241B" strokeWidth="1.4" transform="rotate(8 19 10)" />
          
          {/* Toe 4 (Right Outer) */}
          <ellipse cx="23.5" cy="14" rx="2.8" ry="4" fill="#FF85A1" stroke="#2C241B" strokeWidth="1.4" transform="rotate(25 23.5 14)" />

          {/* Toe Bean Highlights */}
          <ellipse cx="14.8" cy="20" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.6" />
          <circle cx="12.2" cy="9.2" r="0.8" fill="#FFFFFF" opacity="0.6" />
          <circle cx="18.2" cy="9.2" r="0.8" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
