'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CallToAction() {

  const trackClick = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName);
    } else {
      console.log(`Tracking event: ${eventName}`);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-6">
        {/* The "Brutal" Container */}
        <div className="relative border-4 border-slate-900 bg-white p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(16,185,129,1)] overflow-hidden">
          
          {/* Subtle Background Icon */}
          <Zap size={200} className="absolute -bottom-10 -right-10 text-slate-50 -rotate-12 pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-balance text-5xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-[0.85]">
              Get your weekends <br /> 
              <span className="text-emerald-500 underline decoration-8 underline-offset-4">back.</span>
            </h2>
            
            <p className="max-w-xl mx-auto text-lg md:text-xl font-bold text-slate-600">
              Stop playing calendar tetris. Move your agency off spreadsheets and start managing your team like a pro.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                asChild 
                size="lg"
                className="h-16 px-10 text-lg font-black uppercase italic tracking-widest bg-slate-900 text-white border-2 border-slate-900 hover:bg-emerald-500 hover:border-emerald-500 transition-all shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                onClick={() => trackClick("CTA Get Started Click")}
              >
                <Link href="/free-trial" className="flex items-center gap-2">
                  Start Your Portal <ArrowRight size={20} />
                </Link>
              </Button>

              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="h-16 px-10 text-lg font-black uppercase italic tracking-widest border-4 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 transition-all"
                onClick={() => trackClick("CTA Book Demo Click")}
              >
                <Link href="/book-demo">
                  Book a Demo
                </Link>
              </Button>
            </div>

            <p className="pt-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              No credit card required • Setup in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}