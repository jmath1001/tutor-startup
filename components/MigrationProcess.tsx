'use client';

import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, PhoneCall, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <FileSpreadsheet size={24} />,
    title: "Bring Whatever You Have",
    description:
      "Excel spreadsheet? CRM? A Google Sheet you've been patching for years? A folder of sticky notes? It doesn't matter. We've seen it all and we'll work with it.",
    callout: "No \"compatible format\" required.",
  },
  {
    number: "02",
    icon: <PhoneCall size={24} />,
    title: "We Set It Up Together",
    description:
      "You get on a 30-minute call with us. We do the heavy lifting — importing your students, setting up your tutors, configuring your schedule. You just watch and ask questions.",
    callout: "You won't touch a settings page alone.",
  },
  {
    number: "03",
    icon: <ShieldCheck size={24} />,
    title: "Nothing Gets Lost",
    description:
      "Every student, every tutor, every recurring session — it all comes over. We double-check it with you before you go live. Your history stays yours.",
    callout: "We don't go live until you're confident.",
  },
  {
    number: "04",
    icon: <Rocket size={24} />,
    title: "You're Live. We Stay Close.",
    description:
      "Your schedule is live, your tutors have their portals, and your students can see their sessions. We check in during your first week to make sure everything runs smoothly.",
    callout: "Most centers are fully running same day.",
  },
];

export default function MigrationProcess() {
  return (
    <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
            Switching Is Easier Than You Think
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-5">
            Don't throw away<br />
            <span className="text-emerald-400">what you've already built.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            We know you've spent months setting up your student database, your onboarding, your processes. You're not starting over — you're bringing it all with you.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-300"
            >
              {/* Step number - background */}
              <div className="absolute top-6 right-8 text-7xl font-black text-slate-800 leading-none select-none group-hover:text-slate-700 transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 relative z-10">
                {step.description}
              </p>

              {/* Callout */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-400">
                  {step.callout}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom reassurance bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 border border-slate-800 rounded-2xl px-8 py-6"
        >
          <p className="text-slate-300 font-medium text-center sm:text-left">
            Still nervous about switching? <span className="text-white font-bold">That's exactly why we get on a call first.</span>
          </p>
          <div className="shrink-0 flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Free during beta
          </div>
        </motion.div>

      </div>
    </section>
  );
}