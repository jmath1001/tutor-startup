'use client';

import React from "react";
import { motion } from "framer-motion";

const painPoints = [
  "Schedules managed in spreadsheets that break as centers grow",
  "Repetitive record keeping across sheets, chats, and manual notes",
  "Human errors in attendance, reminders, and student history logs",
];

export default function CredibilitySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(56,189,248,0.16),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,0.1),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none ai-grid" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-none text-xs font-semibold uppercase tracking-widest mb-10 border border-sky-200">
            Built For Growth At Any Stage
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-8">
            Works for one center today,<br />
            scales to many centers tomorrow.
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Most centers are not failing because of tutoring quality. They are struggling with spreadsheet workflows, repetitive admin tasks, and inconsistent records that waste team time.
          </p>

          <p className="text-lg text-slate-700 font-medium leading-relaxed mb-16">
            Thetix gives centers one centralized operating system with automation and tracking so teams can run cleanly at one location or across many.
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
              className="flex items-center gap-4 ai-surface border border-slate-300 rounded-none px-6 py-5 text-left"
            >
              <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
              <p className="text-slate-700 font-medium">{point}</p>
            </div>
          ))}

          <div className="mt-4 bg-sky-50 border border-sky-200 rounded-none px-6 py-5 text-left">
            <p className="text-sky-700 font-semibold">
              If this sounds familiar, Thetix is designed to solve it from your first center to full franchise and enterprise scale.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}