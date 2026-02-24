'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { trackEvent } from "@/lib/trackEvent";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="relative overflow-hidden bg-white min-h-screen flex flex-col">

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
        />

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/60 blur-[140px] rounded-full pointer-events-none -z-0" />

        <section className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-24 pb-16 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Built for Tutoring Agencies
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.0] mb-6 max-w-4xl"
          >
            Schedule Tutors & Students{" "}
            <span className="text-emerald-500">in Two Clicks.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed mb-4 max-w-xl"
          >
            No more spreadsheets. No more group chats. No more figuring out who's free.
            One tool your whole agency actually uses.
          </motion.p>

          {/* Credibility line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-slate-400 font-medium mb-10"
          >
            Built by someone who worked in tutoring agencies and lived this problem firsthand.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              asChild
              className="h-16 px-12 bg-slate-900 text-white text-lg font-black tracking-wide rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all shadow-2xl active:scale-95 group"
            >
              <Link href="/free-trial" className="flex items-center gap-3" onClick={() => trackEvent("hero_cta_click")}>
                Book Your Free Migration Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-xs text-slate-400 font-medium">30 minutes. We handle the setup. No commitment.</p>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {[
              "Works with your existing data",
              "Tutors get their own portal",
              "Students see their sessions",
              "Up and running same day",
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-600">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className="text-emerald-500 fill-emerald-500" />
              ))}
            </div>
            <p className="text-sm text-slate-400 max-w-sm italic">
              "I used to spend 3 hours every Sunday figuring out the week's schedule. Now it takes minutes."
            </p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">— Tutoring Agency Owner</p>
          </motion.div>

        </section>
      </main>
    </>
  );
}