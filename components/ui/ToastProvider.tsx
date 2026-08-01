"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#4E342E", // brand-brown
          color: "#FFF9F1", // brand-bg
          borderRadius: "1rem", // brand-radius
          fontFamily: "inherit",
          fontSize: "0.875rem",
          fontWeight: 600,
        },
      }}
    />
  );
}
