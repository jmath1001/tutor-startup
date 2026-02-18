'use client';

import React from "react";
import { motion } from "framer-motion";
import { Zap, BellRing, RotateCcw } from "lucide-react";

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
      icon: <Zap size={28} className="text-emerald-500" />,
      title: "Auto-Sync Scheduling",
      description: "The system reads every tutor's availability and subjects automatically — no more chasing people down or maintaining a separate availability sheet.",
      outcome: "Less admin time = more sessions booked = more revenue per week.",
      video: "/videos/sync-demo.mp4",
    },
    {
      icon: <BellRing size={28} className="text-rose-500" />,
      title: "Students Always Know",
      description: "Students and parents can see their upcoming sessions directly. No more 'I didn't know I had class today' — which means fewer no-shows eating into your billable hours.",
      outcome: "Fewer no-shows = hours that actually get paid for.",
      video: "/videos/tracking-demo.mp4",
      reverse: true 
    },
    {
      icon: <RotateCcw size={28} className="text-blue-500" />,
      title: "Rescheduling in Seconds",
      description: "When a tutor cancels, the system instantly shows every available backup for that subject at the same time. Reassign in two clicks and the student never misses a session.",
      outcome: "Saved sessions = happier students = longer retention.",
      video: "/videos/reschedule-demo.mp4",
    }
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
            Better Scheduling.<br />
            <span className="text-emerald-500">More Hours.</span>
          </h2>
          <p className="text-xl text-slate-600 font-medium border-l-4 border-slate-900 pl-6">
            Every hour your admin spends fixing the schedule is an hour not spent growing the center. Here's how we fix that.
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
              {/* Text Section */}
              <div className="w-full lg:w-[30%] space-y-6">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
                {/* Outcome pill */}
                <div className="inline-flex items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                  <span className="text-emerald-600 text-lg leading-none mt-0.5">→</span>
                  <p className="text-sm font-semibold text-emerald-700 leading-snug">
                    {feature.outcome}
                  </p>
                </div>
              </div>

              {/* Video Section - Larger */}
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