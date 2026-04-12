'use client';

import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, PhoneCall, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <FileSpreadsheet size={24} />,
    title: "Keep your current data",
    description:
      "Spreadsheet, CRM export, or legacy system data - we map it into Thetix so your center starts with clean, consistent records.",
    callout: "No data reset required.",
  },
  {
    number: "02",
    icon: <PhoneCall size={24} />,
    title: "Launch plan that fits your stage",
    description:
      "Start quickly as one center, or align regional controls and milestones for franchise and enterprise adoption.",
    callout: "Start simple, scale with structure.",
  },
  {
    number: "03",
    icon: <ShieldCheck size={24} />,
    title: "Validate workflows before go-live",
    description:
      "Review schedules, confirm tutor and student mappings, and test reminders, attendance, and history workflows before launch.",
    callout: "Go live with operational confidence.",
  },
  {
    number: "04",
    icon: <Rocket size={24} />,
    title: "Post-launch support as you grow",
    description:
      "Monitor adoption, resolve edge cases, and keep processes consistent as you add tutors, students, and additional centers.",
    callout: "Support for every growth stage.",
  },
];

export default function MigrationProcess() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.14),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.09),transparent_44%)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none ai-grid" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-none text-xs font-semibold uppercase tracking-widest mb-6 border border-sky-200">
            Flexible onboarding framework
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-5">
            Start fast. Scale without switching systems.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Bring your current data, launch without disrupting classes, and keep one operating model as you grow from one center to franchise or enterprise operations.
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
              className="group ai-surface relative border border-slate-300 bg-slate-100/85 rounded-none p-8 transition-all duration-300"
            >
              {/* Step number - background */}
              <div className="absolute top-6 right-8 text-7xl font-bold text-slate-300 leading-none select-none transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-sky-100 border border-sky-200 rounded-none flex items-center justify-center text-sky-700 mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 relative z-10">
                {step.description}
              </p>

              {/* Callout */}
              <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-none px-3 py-2 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
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
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 ai-surface border border-slate-300 rounded-none px-8 py-6"
        >
          <p className="text-slate-700 font-medium text-center sm:text-left">
            Choose the onboarding style you need. <span className="text-slate-900 font-semibold">Start self-serve as a single center or run a guided rollout for franchise and enterprise teams.</span>
          </p>
          <div className="shrink-0 flex items-center gap-2 text-sky-700 text-sm font-semibold uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Guided and self-serve options
          </div>
        </motion.div>

      </div>
    </section>
  );
}