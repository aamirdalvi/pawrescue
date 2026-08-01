"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionTitle from "@/components/ui/SectionTitle";
import { Heart, Shield, Users } from "lucide-react";

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
                title="Our Core Organizers"
                subtitle="The passionate caretakers orchestrating the local PawRescue program."
                align="center"
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Dalmir S.", role: "Founder & Lead Dev" },
                  { name: "Jane Smith", role: "Volunteer Coord" },
                  { name: "Robert Ross", role: "Adoption Auditor" },
                  { name: "Emma Watson", role: "Outreach Liaison" },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-bg/40 border border-brand-cardboard/25 rounded-2xl p-5 text-center hover:bg-white hover:shadow-xs transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-cardboard/20 border border-brand-cardboard/35 mx-auto flex items-center justify-center font-extrabold text-brand-brown mb-3">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <h4 className="font-extrabold text-brand-brown text-sm">
                      {member.name}
                    </h4>
                    <p className="text-[10px] text-brand-wood font-semibold mt-0.5">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
