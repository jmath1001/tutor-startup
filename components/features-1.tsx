'use client';

import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, BellRing, RotateCcw, TrendingDown } from "lucide-react";

const FeatureVideo = ({ src }: { src: string }) => (
  <div className="relative w-full aspect-video bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
    <video
      key={src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-slate-900/10" />
  </div>
);

export default function Features() {
  const features = [
    {
      icon: <CalendarCheck size={28} className="text-emerald-500" />,
      label: "Scheduling",
      title: "Book Sessions in Two Clicks.",
      description: "See every tutor's availability at a glance. Book a student into any open slot — or set up recurring sessions that auto-fill the schedule week after week.",
      outcome: "Less time scheduling = more time growing your center.",
      video: "/videos/sync-demo.mp4",
    },
    {
      icon: <BellRing size={28} className="text-rose-500" />,
      label: "Reminders",
      title: "Parents Always Know. No-shows Drop.",
      description: "Thetix sends automatic email reminders to parents before every session. Students show up because they actually knew they had class.",
      outcome: "Fewer no-shows = hours that actually get paid for.",
      video: "/videos/tracking-demo.mp4",
      reverse: true,
    },
    {
      icon: <TrendingDown size={28} className="text-blue-500" />,
      label: "Attendance",
      title: "Know Exactly Who Showed Up.",
      description: "Mark attendance directly from the schedule. See each student's attendance rate, no-show history, and flag students at risk of dropping out — before they do.",
      outcome: "Catch at-risk students early = better retention.",
      video: "/videos/attendance-demo.mp4",
    },
    {
      icon: <RotateCcw size={28} className="text-violet-500" />,
      label: "Recurring",
      title: "Recurring Sessions, Zero Overhead.",
      description: "Set a student's weekly schedule once. Thetix books every future session automatically, handles rescheduling when needed, and keeps the series linked so nothing falls through the cracks.",
      outcome: "Saved admin hours every single week.",
      video: "/videos/reschedule-demo.mp4",
      reverse: true,
    },
  ];

  return (
    <section className="relative bg-[#fafafa] py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20 md:mb-32"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.85] mb-8">
            Everything Excel<br />
            <span className="text-emerald-500">Can't Do.</span>
          </h2>
          <p className="text-xl text-slate-600 font-medium border-l-4 border-slate-900 pl-6">
            Thetix replaces the spreadsheet chaos with one tool built from the ground up for tutoring centers — not adapted from something else.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-40">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-8 lg:gap-16 items-center ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Text */}
              <div className="w-full lg:w-[30%] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{feature.label}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <span className="text-emerald-600 text-lg leading-none mt-0.5">→</span>
                  <p className="text-sm font-semibold text-emerald-700 leading-snug">
                    {feature.outcome}
                  </p>
                </div>
              </div>

              {/* Video */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="w-full lg:w-[70%]"
              >
                <FeatureVideo src={feature.video} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}