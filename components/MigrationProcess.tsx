'use client';

import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Users, Rocket, Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function MigrationProcess() {
  const steps = [
    {
      icon: <FileSpreadsheet size={32} className="text-emerald-500" />,
      title: "System Analysis",
      description: "We hop on a quick call to understand your current setup—Excel sheets, Google Sheets, CRM, or whatever you're using right now.",
      detail: "No judgment. We've seen it all.",
      color: "emerald"
    },
    {
      icon: <Users size={32} className="text-blue-500" />,
      title: "Data Migration",
      description: "We handle the heavy lifting. Send us your spreadsheets and we'll import all your tutors, students, and existing schedules into the system.",
      detail: "Usually takes 2-3 hours, not weeks.",
      color: "blue"
    },
    {
      icon: <Rocket size={32} className="text-purple-500" />,
      title: "Team Onboarding",
      description: "We'll walk your admin team through the dashboard and show your tutors how to use their personal portals. Everyone gets up to speed fast.",
      detail: "1-hour training session included.",
      color: "purple"
    },
    {
      icon: <Calendar size={32} className="text-rose-500" />,
      title: "Go Live",
      description: "Start scheduling. We monitor the first week to make sure everything runs smoothly and handle any tweaks needed.",
      detail: "You're in control from day one.",
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
            <span>White-Glove Migration</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            From Spreadsheet Chaos to <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Structured System
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We've migrated dozens of tutoring centers. Here's exactly how we'll get you up and running—no stress, no downtime.
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
                <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[step.color]} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
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

        {/* Timeline estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-100 text-center"
        >
          <p className="text-slate-700 font-medium mb-2">
            <span className="text-2xl font-bold text-slate-900">5-7 days</span> from kickoff to go-live
          </p>
          <p className="text-sm text-slate-600">
            Most centers are fully operational within a week. No payment until you're running live.
          </p>
        </motion.div>

      </div>
    </section>
  );
}