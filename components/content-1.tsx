'use client';

import React from "react";
import { motion } from "framer-motion";
import { Users, Search, MousePointer2, CheckCircle2, Calendar } from "lucide-react";

export default function CalendarZoomSection() {
  return (
    <section className="relative py-24 md:py-40 bg-white overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-20 lg:grid-cols-2 items-center">
          
          {/* THE VISUAL DEMO SIDE */}
          <div className="relative flex justify-center lg:justify-start">
            
            {/* Contextual Calendar Grid (Ghost) */}
            <div className="absolute -top-20 -left-10 w-full h-full opacity-[0.05] pointer-events-none hidden md:block">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-32 border border-slate-900 rounded-2xl bg-slate-900" />
                ))}
              </div>
            </div>

            {/* THE ACTIVE UI MOCKUP */}
            <div className="relative z-10 w-full max-w-md">
              
              {/* Timestamp Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-t-2xl font-black italic uppercase text-[10px] tracking-widest ml-4 shadow-xl"
              >
                <Calendar size={12} className="text-emerald-500" />
                Monday, Nov 24 — 4:00 PM
              </motion.div>

              {/* The "Conflict" Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative w-full border border-slate-200 bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-tighter">Student Booked</h4>
                    <p className="text-3xl font-black text-slate-900 italic uppercase leading-none tracking-tighter">James Miller</p>
                    <p className="text-sm font-bold text-slate-500 mt-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Algebra II Honors
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Status</p>
                    <p className="text-xs font-black text-rose-500 italic uppercase bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                      Tutor Flaked
                    </p>
                  </div>
                </div>

                {/* THE ACTION TRIGGER */}
                <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 group cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:text-emerald-600">
                       <Search size={18} />
                    </div>
                    <span className="text-xs font-black uppercase text-slate-500 group-hover:text-emerald-700 tracking-tight">
                      Find Alternative Cover...
                    </span>
                  </div>
                  <MousePointer2 size={20} className="text-slate-900 fill-slate-900 animate-bounce" />
                </div>
              </motion.div>

              {/* THE SOLUTION POP-OVER (Floating Glass Card) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -right-6 md:-right-12 top-1/2 w-full max-w-[280px] bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-2xl shadow-emerald-500/10 ring-1 ring-slate-900/5"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-900">3 Eligible Tutors Found</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Sarah Jenkins", note: "Marked Available", accent: "bg-emerald-500" },
                    { name: "Kevin V.", note: "No Conflict Found", accent: "bg-blue-500" }
                  ].map((tutor, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${tutor.accent}`} />
                        <div>
                          <p className="text-[11px] font-black uppercase text-slate-900 leading-none">{tutor.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{tutor.note}</p>
                        </div>
                      </div>
                      <div className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded-md group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        Assign
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* TEXT CONTENT SIDE */}
          <div className="lg:pl-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.85] uppercase italic tracking-tighter">
                Stop the <br />
                <span className="text-emerald-500 underline decoration-[12px] underline-offset-4">Calendar Hunt.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                When a tutor flakes or a student reschedules, you shouldn't have to dig through a mountain of text threads.
              </p>
            </div>

            <div className="grid gap-6">
              <OnboardingPoint 
                title="Instant Roster Search"
                text="Quickly scan your team's live availability for any specific slot. We show you exactly who is free to cover, filtered by subject expertise."
              />
              <OnboardingPoint 
                title="Reality-First Management"
                text="Running an agency is messy. We give you a clear view of your backup options so a sick call doesn't ruin your entire week."
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function OnboardingPoint({ title, text }: { title: string, text: string }) {
  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all group"
    >
      <h4 className="font-black uppercase italic text-xl text-slate-900 flex items-center gap-3">
        <div className="w-2 h-6 bg-emerald-500 rounded-full group-hover:h-8 transition-all" />
        {title}
      </h4>
      <p className="text-sm font-medium text-slate-500 mt-3 leading-relaxed pl-5">
        {text}
      </p>
    </motion.div>
  );
}