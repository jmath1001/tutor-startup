'use client';

import React from "react";
import { motion } from "framer-motion";

const painPoints = [
  "Inconsistent workflows across locations",
  "Multiple sheets and chat threads for one schedule",
  "No reliable cross-center attendance visibility",
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
            Built For Multi-Location Teams
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-8">
            Built for enterprise tutoring operators,<br />
            not one-center workflows.
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            National tutoring organizations need consistent execution across scheduling, attendance, communication, and reporting. Thetix gives every center the same operating model while preserving local flexibility.
          </p>

          <p className="text-lg text-slate-700 font-medium leading-relaxed mb-16">
            Give directors, regional managers, and HQ one live view of operations so decisions are faster and standards are easier to enforce.
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
              If this sounds familiar, Thetix is designed to solve it at enterprise scale.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}