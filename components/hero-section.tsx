'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { motion } from "framer-motion";
import { Search, Zap, MessageSquare } from 'lucide-react'; 
import { HeroDemo } from "./HeroDemo";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden bg-[#fafafa]">
        <section className="pb-24 pt-12 md:pb-32 lg:pt-24 border-b-8 border-slate-900">
          <div className="relative mx-auto flex max-w-7xl flex-col lg:flex-row items-center px-6 gap-12">
            
            {/* TEXT SECTION */}
            <motion.div
              className="mx-auto max-w-2xl text-center lg:mx-0 lg:w-1/2 lg:text-left z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-slate-900 text-white px-4 py-1 border-2 border-slate-900 font-black uppercase italic text-xs tracking-widest mb-6">
                Stop Spreadsheet Chaos
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase italic tracking-tight leading-snug mb-6">
                Schedule Minus the Hair Pulling
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
                Our software replaces spreadsheets, texts, and endless hair pulling. Quickly match student requests with tutor availability, reduce one-on-one session costs, and manage scheduling conflicts with a few clicks.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  asChild
                  className="h-16 px-8 border-4 border-slate-900 bg-emerald-500 text-slate-900 text-lg font-black uppercase italic tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <Link href="/free-trial" className="flex items-center gap-2">
                    Get Started <Search size={20} />
                  </Link>
                </Button>
                <p className="text-slate-400 font-black uppercase italic text-xs tracking-tight text-center sm:text-left">
                  All tutor schedules synced in real-time
                </p>
              </div>

              {/* PAIN RELIEVERS */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border-4 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <Zap className="text-emerald-500 shrink-0" size={24} />
                   <span className="font-black uppercase italic text-sm text-slate-900">
                     Subject & Availability Filtering
                   </span>
                </div>
                <div className="flex items-center gap-3 p-4 border-4 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <MessageSquare className="text-blue-500 shrink-0" size={24} />
                   <span className="font-black uppercase italic text-sm text-slate-900">
                     Auto-Sync Individual Schedules to Tutors
                   </span>
                </div>
              </div>
            </motion.div>

            {/* VISUAL SECTION */}
            <motion.div
              className="lg:w-1/2 relative w-full mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="border-8 border-slate-900 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
                <HeroDemo />
              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </>
  );
}
