'use client';

import { ArrowRight, Zap, MessageSquare, CalendarCheck, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { trackEvent } from "@/lib/trackEvent";

const perks = [
  {
    icon: <CalendarCheck size={20} className="text-sky-600" />,
    title: "Enterprise onboarding",
    body: "A structured rollout with clear milestones for HQ, regional teams, and center staff.",
  },
  {
    icon: <Shield size={20} className="text-sky-600" />,
    title: "Keep your data",
    body: "We migrate students, tutors, and session records without losing operational history.",
  },
  {
    icon: <Zap size={20} className="text-sky-600" />,
    title: "Scale rollout by region",
    body: "Launch in phases so each region adopts consistent workflows with minimal disruption.",
  },
  {
    icon: <MessageSquare size={20} className="text-sky-600" />,
    title: "Dedicated support",
    body: "Get responsive implementation and operations support as your network grows.",
  },
];

export default function CallToAction() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(16,185,129,0.14),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.08),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none ai-grid" />
      <div className="mx-auto max-w-5xl px-6">
        <div className="ai-surface overflow-hidden border border-slate-300 shadow-2xl rounded-none">

          {/* Top band */}
          <div className="bg-sky-100 px-8 py-3 flex items-center gap-2 border-b border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            <p className="text-sky-700 text-xs font-semibold uppercase tracking-widest">
              Enterprise readiness session
            </p>
          </div>

          {/* Main content */}
          <div className="p-8 md:p-16 space-y-12">

            {/* Headline */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[0.95]">
                From admin chaos to
                predictable growth.
              </h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Book a 30-minute demo and see how Thetix standardizes multi-location operations, cuts admin hours, and protects billable hours.
              </p>
            </div>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-slate-100/85 border border-slate-300 rounded-none p-5"
                >
                  <div className="shrink-0 w-9 h-9 rounded-none bg-white border border-slate-300 flex items-center justify-center">
                    {perk.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-900 font-semibold text-sm leading-tight mb-1">
                      {perk.title}
                    </p>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">
                      {perk.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/book-demo"
                onClick={() => trackEvent("bottom_cta_click")}
                className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-none transition-all active:scale-95 shadow-lg group"
              >
                Book Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-slate-500 text-xs font-medium">No commitment. No card. Just a concrete plan and live walkthrough.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}