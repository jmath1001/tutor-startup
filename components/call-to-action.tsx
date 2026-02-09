'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Database, Users } from "lucide-react";
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
    <section className="py-24 md:py-40 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6">
        {/* The Clean, High-Trust Container */}
        <div className="relative rounded-[3rem] bg-slate-900 p-8 md:p-20 shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-left space-y-8">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.85]">
                Switching is <br /> 
                <span className="text-emerald-500">Painless.</span>
              </h2>
              
              <p className="max-w-md text-lg md:text-xl font-medium text-slate-400">
                Coming from a CRM or a mountain of spreadsheets? We handle the data migration and integrations for you. No downtime, no lost data.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                  asChild 
                  size="lg"
                  className="h-16 px-10 text-lg font-black uppercase italic tracking-widest bg-emerald-500 text-slate-900 rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                  onClick={() => trackClick("CTA Get Started Click")}
                >
                  <Link href="/free-trial" className="flex items-center gap-2">
                    Start Your Portal <ArrowRight size={20} />
                  </Link>
                </Button>

                <Button 
                  asChild 
                  size="lg" 
                  variant="ghost"
                  className="h-16 px-10 text-lg font-black uppercase italic tracking-widest text-white hover:bg-white/10 transition-all rounded-2xl"
                  onClick={() => trackClick("CTA Book Demo Click")}
                >
                  <Link href="/book-demo">
                    Book a Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* "Bullshit-Free" Onboarding Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <OnboardingCard 
                icon={<Database className="text-emerald-500" />}
                title="Free Migration"
                text="Upload your CSVs and we'll map your data for you."
              />
              <OnboardingCard 
                icon={<RefreshCw className="text-blue-500" />}
                title="Easy Sync"
                text="Integrates with the CRMs and tools you already use."
              />
              <OnboardingCard 
                icon={<Users className="text-rose-500" />}
                title="Tutor Onboarding"
                text="We invite your team and get them synced in seconds."
              />
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-emerald-500 uppercase italic">Ready for Transition →</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function OnboardingCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-black text-white uppercase italic text-sm">{title}</h4>
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{text}</p>
    </div>
  );
}