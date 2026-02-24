'use client';

import React from "react";
import { motion } from "framer-motion";

const painPoints = [
  "Finding out about a new student the day of",
  "No idea what your week looked like until someone texted you",
  "Front office juggling 5 spreadsheets to figure out who's free",
];

export default function CredibilitySection() {
  return (
    <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-10 border border-emerald-500/20">
            Built From Experience
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8">
            This wasn't built by someone<br />
            <span className="text-emerald-400">guessing at the problem.</span>
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            I was a tutor. I showed up to sessions not knowing a new student had been added to my schedule. I watched the front office spend more time managing calendars than managing their business — bouncing between spreadsheets, group chats, and frantic texts just to answer "who's free Thursday at 4?"
          </p>

          <p className="text-lg text-slate-300 font-medium leading-relaxed mb-16">
            I built this because I lived on both sides of the chaos. I know exactly what's broken and exactly what needs to fix it.
          </p>
        </motion.div>

        {/* Pain points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5 text-left"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <p className="text-slate-300 font-medium">{point}</p>
            </div>
          ))}

          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-5 text-left">
            <p className="text-emerald-300 font-semibold">
              Sound familiar? That's the whole point. This tool was built to kill every one of these.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}