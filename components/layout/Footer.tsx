import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-brand-bg border-t border-brand-wood/20 pt-16 pb-8 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-brand-bg/10">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 w-max">
              <span className="text-2xl">🐾</span>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                PawRescue
              </span>
            </Link>
            <p className="text-brand-cardboard/80 text-sm max-w-sm leading-relaxed">
              PawRescue is a warm, community-driven marketplace dedicated to
              connecting pets with fosters, strays with rescuers, and pets with
              happy forever families. Join our sanctuary today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-extrabold text-white text-lg">Quick Links</h3>
            <ul className="flex flex-col space-y-2 text-sm text-brand-cardboard/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-blue transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="hover:text-brand-blue transition-colors duration-200"
                >
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-brand-blue transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-blue transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-blue transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-extrabold text-white text-lg">Contact Us</h3>
            <ul className="flex flex-col space-y-3 text-sm text-brand-cardboard/80">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <span>support@pawrescue.org</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <span>+1 (800) 555-PAWS</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                <span>123 Sanctuary Way, Green Valley</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-brand-cardboard/60 space-y-4 md:space-y-0">
          <p>© {currentYear} PawRescue. All rights reserved.</p>
          <p className="flex items-center">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-brand-green fill-brand-green mx-1" />{" "}
            for animals everywhere
          </p>
        </div>
      </Container>
    </footer>
  );
}
