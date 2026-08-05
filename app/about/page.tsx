"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Heart, Shield, Users, Laptop, GraduationCap } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function AboutPage() {
  const pillars = [
    {
      icon: <Heart className="w-8 h-8 text-brand-green" />,
      title: "Compassion First",
      desc: "Every animal represents a life worth protecting. We operate with a deep commitment to kindness and sanctuary values.",
    },
    {
      icon: <Shield className="w-8 h-8 text-brand-green" />,
      title: "Trusted Safeguards",
      desc: "We verify caretaker contacts and community alerts to prevent fraud and secure safe, healthy adoptions.",
    },
    {
      icon: <Users className="w-8 h-8 text-brand-green" />,
      title: "Community Action",
      desc: "Neighborhood alertness reunites lost companions. PawRescue unites rescuers, fosters, and adopters under one roof.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <Breadcrumb />

      <main className="flex-grow py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <span className="text-sm font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full inline-block">
                🌿 Our Mission
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-brand-brown tracking-tight">
                Helping Every Paw <br />
                <span className="text-brand-green">Find a Safe Sanctuary</span>
              </h1>
              <p className="text-base md:text-lg text-brand-wood font-medium leading-relaxed max-w-2xl mx-auto">
                PawRescue is a local, community-driven marketplace connecting
                rescuers, foster parents, and adopters with animals in transition. We believe in compassion without borders.
              </p>
            </div>

            {/* Main Mission Details */}
            <div className="bg-white border-2 border-brand-cardboard/45 rounded-3xl p-8 shadow-soft relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cardboard/30 via-brand-wood/10 to-brand-brand-cardboard/30" />
              <h2 className="text-xl font-extrabold text-brand-brown mb-4 border-b border-brand-cardboard/10 pb-2">
                📖 Our Story
              </h2>
              <p className="text-sm text-brand-wood leading-relaxed font-medium">
                Established as a grass-roots alert board, PawRescue has evolved into a professional marketplace designed to tackle stray animal welfare, facilitate adoption requests, coordinate fosters, and broadcast lost alerts. By combining intuitive, Airbnb-style listings with verification workflows, we help reduce the time stray animals spend in transition, connecting them directly with loving caretakers.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-cardboard/25 rounded-2xl p-6 shadow-xs space-y-3 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 hover:border-brand-wood/30"
                >
                  <div className="p-3 bg-brand-bg/50 border border-brand-cardboard/15 rounded-xl w-max">
                    {pillar.icon}
                  </div>
                  <h3 className="font-extrabold text-brand-brown text-base">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-wood font-semibold leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Volunteers / Core Crew */}
            <div className="space-y-6">
              <SectionTitle
                title="Our Core Organizer"
                subtitle="The passionate caretaker orchestrating the local PawRescue program."
                align="center"
              />

              <div className="flex justify-center">
                <div className="bg-brand-bg/40 border border-brand-cardboard/25 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xs transition-all duration-300 max-w-xs w-full">
                  <div className="w-14 h-14 rounded-full bg-brand-cardboard/20 border border-brand-cardboard/35 mx-auto flex items-center justify-center font-extrabold text-brand-brown text-lg mb-3">
                    AD
                  </div>
                  <h4 className="font-extrabold text-brand-brown text-base">
                    Aamir Dalvi
                  </h4>
                  <p className="text-xs text-brand-wood font-semibold mt-1">
                    Founder & Lead Dev
                  </p>
                </div>
              </div>
            </div>

            {/* Developer & Project Credits */}
            <div className="space-y-6 pt-2">
              <SectionTitle
                title="Project Credits"
                subtitle="PawRescue was crafted as an academic full-stack showcase."
                align="center"
              />

              <div className="bg-white border border-brand-cardboard/25 rounded-3xl p-6 md:p-8 shadow-glass-md relative overflow-hidden group transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-amber/40 via-grass-green/40 to-brand-amber/40" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-grass-green uppercase tracking-widest bg-grass-green/10 border border-grass-green/20 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5" /> Project Developer
                    </span>
                    <h3 className="text-2xl font-black text-brand-brown tracking-tight">
                      Designed & Developed by <span className="text-grass-green">Aamir Dalvi</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-brand-wood font-bold">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-brand-amber shrink-0" />
                        GN Khalsa College of Arts, Science and Commerce
                      </span>
                      <span className="hidden sm:inline text-brand-cardboard/50">•</span>
                      <span>Roll No: <strong>417</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      variant="secondary"
                      href="https://github.com/aamirdalvi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shadow-glass-sm hover:shadow-glass-hover"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Profile</span>
                    </Button>
                  </div>
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
