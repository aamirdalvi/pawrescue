import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import InteractiveParticleField from "@/components/ui/InteractiveParticleField";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PawRescue",
  description:
    "A modern community marketplace for lost pets, stray animals, fostering, and adoption.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/PawRescueLogo.png", sizes: "512x512", type: "image/png" },
      { url: "/PawRescueLogo.png", sizes: "192x192", type: "image/png" },
      { url: "/PawRescueLogo.png", sizes: "96x96", type: "image/png" },
      { url: "/PawRescueLogo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: [
      { url: "/PawRescueLogo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/PawRescueLogo.png", sizes: "180x180", type: "image/png" },
      { url: "/PawRescueLogo.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-16 md:pb-0">
        <ToastProvider />
        <CustomCursor />
        <InteractiveParticleField />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
