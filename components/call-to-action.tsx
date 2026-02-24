'use client';

import { ArrowRight, Zap, MessageSquare, CalendarCheck, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { trackEvent } from "@/lib/trackEvent";

const perks = [
  {
    icon: <CalendarCheck size={20} className="text-emerald-400" />,
    title: "We Handle the Setup",
    body: "Bring your spreadsheet or CRM. We move everything over on the call with you.",
  },
  {
    icon: <Shield size={20} className="text-emerald-400" />,
    title: "Nothing Gets Lost",
    body: "Every student, tutor, and session comes with you. We don't go live until you're confident.",
  },
  {
    icon: <Zap size={20} className="text-emerald-400" />,
    title: "Up and Running Same Day",
    body: "Most agencies are fully live by the end of the onboarding call.",
  },
  {
    icon: <MessageSquare size={20} className="text-emerald-400" />,
    title: "Direct Line to the Builder",
    body: "You get my personal contact. If something's off, I fix it fast.",
  },
];

export default function CallToAction() {
  return (
    <section className="py-24 md:py-40 bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl">

          {/* Top band */}
          <div className="bg-emerald-500 px-8 py-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
            <p className="text-slate-900 text-xs font-black uppercase tracking-widest">
              30 Minutes. We Handle Everything.
            </p>
          </div>

          {/* Main content */}
          <div className="p-8 md:p-16 space-y-12">

            {/* Headline */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.9]">
                Still running on<br />
                <span className="text-emerald-500">spreadsheets?</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Book a free 30-minute call. We'll take a look at your current setup and get you running on something better — without losing anything you've already built.
              </p>
            </div>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    {perk.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm leading-tight mb-1">
                      {perk.title}
                    </p>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      {perk.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/free-trial"
                onClick={() => trackEvent("bottom_cta_click")}
                className="inline-flex items-center justify-center gap-2 h-16 px-10 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-sm uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 group"
              >
                Book Your Free Migration Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-slate-500 text-xs font-medium">No commitment. No credit card. Just a conversation.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}