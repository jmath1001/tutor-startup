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
      title: "Auto-Sync Matchmaking",
      description: "The 'Availability Text' tag is dead. Our engine automatically scans live tutor calendars against student requests. Match the perfect pair in one click.",
      video: "/videos/sync-demo.mp4",
    },
    {
      icon: <BellRing size={28} className="text-rose-500" />,
      title: "Zero-Confusion Sync",
      description: "No more tutor and student availability juggling. The system will compare both to suggest open slots. Tutors can view their sessions and add their availability.",
      video: "/videos/tracking-demo.mp4",
      reverse: true 
    },
    {
      icon: <RotateCcw size={28} className="text-blue-500" />,
      title: "Easy Rescheduling",
      description: "When a tutor gets sick, you shouldn't have to panic. Instantly see every verified backup for that specific subject and reassign the session in seconds.",
      video: "/videos/reschedule-demo.mp4",
    }
  ];

  return (
    <section className="relative bg-[#fafafa] py-24 md:py-40 overflow-hidden">
      {/* Subtle Grid Background */}
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
            Built for <span className="text-emerald-500">Scale</span>,<br /> 
            Not Stress.
          </h2>
          <p className="text-xl text-slate-600 font-medium border-l-4 border-slate-900 pl-6">
            Eliminate administrative blind spots and keep your tutors in the loop 
            with real-time schedule syncing.
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
              className={`flex flex-col gap-8 lg:gap-12 items-center ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Text Section - Smaller on desktop */}
              <div className="w-full lg:w-[35%] space-y-6">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Video Section - Much Larger on desktop */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="w-full lg:w-[65%]"
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