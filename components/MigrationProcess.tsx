'use client';

import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Users, Rocket, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function MigrationProcess() {
  const steps = [
    {
      icon: <FileSpreadsheet size={32} className="text-emerald-500" />,
      title: "Join the Waitlist",
      description: "Drop your email and we'll reach out personally. No automated emails, just a real conversation about whether this fits your center.",
      detail: "Takes 30 seconds.",
      color: "emerald"
    },
    {
      icon: <Users size={32} className="text-blue-500" />,
      title: "Quick Demo Call",
      description: "We'll show you exactly how it works and walk through your current scheduling setup. If it's not a fit we'll tell you straight up.",
      detail: "30 minutes, no sales pitch.",
      color: "blue"
    },
    {
      icon: <Rocket size={32} className="text-purple-500" />,
      title: "Free Early Access",
      description: "Beta centers get the full product free while we build it out together. Your feedback directly shapes what gets built next.",
      detail: "Free during beta. No catch.",
      color: "purple"
    },
    {
      icon: <Calendar size={32} className="text-rose-500" />,
      title: "You're Running",
      description: "Your schedule is live, tutors have their portals, and students can see their sessions. We stay close during the first few weeks.",
      detail: "We don't disappear after setup.",
      color: "rose"
    }
  ];

  const colorMap = {
    emerald: "from-emerald-500 to-cyan-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    rose: "from-rose-500 to-orange-500"
  };

  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle size={16} />
            <span>Early Access Beta</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Be One of the First Centers to <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Ditch the Spreadsheet
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We're onboarding a small group of tutoring centers for free early access. You get the full product, we get real feedback. Here's how it works.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line - Desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent -translate-x-4" />
              )}
              
              <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all h-full">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[step.color as keyof typeof colorMap]} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                  {step.description}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 italic">
                    {step.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-100 text-center"
        >
          <p className="text-slate-700 font-medium mb-2">
            <span className="text-2xl font-bold text-slate-900">Spots are limited</span> during beta
          </p>
          <p className="text-sm text-slate-600">
            Free for early access centers. No payment, no commitment — just tell us it works.
          </p>
        </motion.div>

      </div>
    </section>
  );
}