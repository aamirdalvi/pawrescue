"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import toast from "react-hot-toast";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject) {
      toast.error("Please select a subject topic.");
      return;
    }
    setIsSending(true);
    const toastId = toast.loading("Sending message...");

    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.", {
        id: toastId,
      });
      setIsSending(false);
      // Reset form
      (e.target as HTMLFormElement).reset();
      setSubject("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <Breadcrumb />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8">
            <SectionTitle
              title="Get in Touch"
              subtitle="Have questions about listing adoptions, reporting strays, or voluntary work? We are here to support you."
              align="center"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Contact details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/10 pb-2">
                    📞 Contact Coordinates
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="p-2.5 bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl w-max h-max shrink-0">
                        <Phone className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="text-xs">
                        <span className="text-brand-wood block font-bold uppercase tracking-wider">
                          Phone Hotline
                        </span>
                        <span className="text-brand-brown font-extrabold text-sm block mt-0.5">
                          +1 (555) 019-2834
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-2.5 bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl w-max h-max shrink-0">
                        <Mail className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="text-xs">
                        <span className="text-brand-wood block font-bold uppercase tracking-wider">
                          Email Support
                        </span>
                        <span className="text-brand-brown font-extrabold text-sm block mt-0.5">
                          support@pawrescue.org
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-2.5 bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl w-max h-max shrink-0">
                        <Clock className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="text-xs">
                        <span className="text-brand-wood block font-bold uppercase tracking-wider">
                          Support Hours
                        </span>
                        <span className="text-brand-brown font-extrabold text-sm block mt-0.5">
                          Mon - Sat, 9:00 AM - 6:00 PM
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="p-2.5 bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl w-max h-max shrink-0">
                        <MapPin className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="text-xs">
                        <span className="text-brand-wood block font-bold uppercase tracking-wider">
                          Sanctuary Headquarters
                        </span>
                        <span className="text-brand-brown font-extrabold text-sm block mt-0.5 leading-relaxed">
                          123 Ocean Avenue, Suite 4B,<br />
                          Brooklyn, NY 11225
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact form card */}
              <div className="lg:col-span-7">
                <div className="bg-white border-2 border-brand-cardboard/45 rounded-3xl p-6 md:p-8 shadow-soft">
                  <h3 className="text-lg font-extrabold text-brand-brown border-b border-brand-cardboard/10 pb-2 mb-6">
                    ✉️ Send Us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="input-friendly font-medium"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@example.com"
                        className="input-friendly font-medium"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <CustomSelect
                        label="Subject *"
                        value={subject}
                        onChange={setSubject}
                        placeholder="Select subject topic"
                        options={[
                          { value: "support", label: "🐾 Adoption/Foster Support" },
                          { value: "alert", label: "🚨 Report Listing Issue" },
                          { value: "voluntary", label: "🤝 Volunteer Work Inquiry" },
                          { value: "feedback", label: "✨ Feedback & Suggestions" },
                        ]}
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-wood uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Write down your message context..."
                        className="input-friendly font-medium resize-none rounded-2xl"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="wood"
                        size="md"
                        type="submit"
                        loading={isSending}
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
