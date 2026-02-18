'use client';

import { ArrowRight, Zap, MessageSquare, Gift, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import { supabase } from "@/lib/supabase";

const perks = [
  {
    icon: <Gift size={20} className="text-emerald-400" />,
    title: "Free During Beta",
    body: "Full product, no credit card.",
  },
  {
    icon: <Zap size={20} className="text-emerald-400" />,
    title: "We Onboard You",
    body: "Send us your spreadsheet, we handle the rest.",
  },
  {
    icon: <MessageSquare size={20} className="text-emerald-400" />,
    title: "Direct Line to the Builder",
    body: "Your feedback shapes what gets built next.",
  },
  {
    icon: <Clock size={20} className="text-emerald-400" />,
    title: "Limited Spots",
    body: "Small group only. First come, first served.",
  },
];

export default function CallToAction() {

  const trackClick = async (eventName: string, metadata = {}) => {
    try {
      await supabase.from('analytics_events').insert([{
        event_name: eventName,
        page_path: window.location.pathname,
        metadata,
      }]);
    } catch (err) {
      console.error("Tracking failed:", err);
    }
  };

  return (
    <section className="py-24 md:py-40 bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl">

          {/* Top band */}
          <div className="bg-emerald-500 px-8 py-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
            <p className="text-slate-900 text-xs font-black uppercase tracking-widest">
              Early Access — Beta Now Open
            </p>
          </div>

          {/* Main content */}
          <div className="p-8 md:p-16 space-y-12">

            {/* Headline */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                Still Running on<br />
                <span className="text-emerald-500">Spreadsheets?</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                We're onboarding a small group of tutoring centers for free. No payment, no commitment — just a better way to run your schedule.
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
                    <p className="text-white font-black text-sm uppercase italic tracking-tight leading-tight mb-1">
                      {perk.title}
                    </p>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      {perk.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/free-trial"
                onClick={() => trackClick("cta_waitlist_click", { type: "primary" })}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-sm uppercase italic tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                Join the Waitlist <ArrowRight size={18} />
              </Link>
              <Link
                href="/demo-video"
                onClick={() => trackClick("cta_demo_click", { type: "secondary" })}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white/5 hover:bg-white/10 text-white font-black text-sm uppercase italic tracking-widest rounded-2xl border border-white/10 transition-all"
              >
                Watch the Demo
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}