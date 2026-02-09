'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { motion } from "framer-motion";
import { Zap, CheckCircle2, ArrowRight, Play } from 'lucide-react'; 

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="relative overflow-hidden bg-[#fafafa]">
        {/* Anti-Boring Texture: Subtle dot grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

        <section className="relative z-10 pb-20 pt-12 md:pb-32 lg:pt-32">
          <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row items-center px-6 gap-12 lg:gap-16">
            
            {/* TEXT SECTION */}
            <motion.div
              className="w-full lg:w-[42%] text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest mb-8 border border-emerald-100">
                <Zap size={14} fill="currentColor" />
                The Smarter Way to Scale
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase italic">
                Schedule <br /> 
                <span className="text-emerald-500 underline decoration-[12px] underline-offset-4">Minus</span> <br />
                the Meltdowns.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                Stop playing calendar tetris. We replace the mess of spreadsheets and texts with a single, automated source of truth for your tutors and students.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button
                  asChild
                  className="h-16 px-10 bg-slate-900 text-white text-lg font-black uppercase italic tracking-widest rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all shadow-2xl active:scale-95 group"
                >
                  <Link href="/free-trial" className="flex items-center gap-3">
                    Start Your Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <div className="flex flex-col items-start gap-1">
                   <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Zap key={i} size={12} className="text-emerald-500" fill="currentColor" />)}
                   </div>
                   <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                     Built for Agencies
                   </p>
                </div>
              </div>

              {/* Trust Pills */}
              <div className="mt-14 flex flex-wrap justify-center lg:justify-start gap-4">
                {["Auto-Sync", "Tutor Dashboard", "Instant Match"].map((text) => (
                  <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* THE PRESENTATION SECTION (The "Stage") */}
            <motion.div
              className="lg:w-[58%] w-full relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Browser Frame Wrapper */}
              <div className="relative z-10 p-2 rounded-[2.5rem] bg-gradient-to-b from-slate-200 to-slate-400 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
                <div className="bg-white rounded-[1.8rem] overflow-hidden border border-slate-300 shadow-inner">
                  
                  {/* Browser Toolbar */}
                  <div className="h-12 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md flex items-center px-6 gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                    </div>
                    <div className="mx-auto bg-white border border-slate-200 rounded-lg h-7 w-3/5 flex items-center px-3 justify-between">
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full" />
                      <Zap size={10} className="text-slate-300" />
                    </div>
                  </div>

                  {/* Video Content */}
                  <div className="aspect-video relative bg-white flex items-center justify-center">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    >
                      <source src="/videos/schedule-demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Subtle Overlay to make it feel like a screen */}
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5" />
                  </div>
                </div>
              </div>

              {/* Floating Status Tag */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 -bottom-6 md:-right-8 md:-bottom-8 z-20 bg-slate-900 p-5 rounded-3xl shadow-2xl border border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em] mb-0.5">System Status</span>
                    <span className="text-xs font-bold text-white tracking-tight">Syncing Live Calendars...</span>
                  </div>
                </div>
              </motion.div>

              {/* Background Glows */}
              <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-emerald-200/40 blur-[120px] rounded-full" />
              <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-blue-200/30 blur-[120px] rounded-full" />
            </motion.div>

          </div>
        </section>
      </main>
    </>
  );
}