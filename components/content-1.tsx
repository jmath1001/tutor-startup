'use client';

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, AlertCircle, Search, Check, MousePointer2 } from "lucide-react";

export default function CalendarZoomSection() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* THE ZOOMED-IN CALENDAR SLOT */}
          <div className="relative">
            {/* Background "Ghost" Slots for context */}
            <div className="absolute -top-12 -left-4 w-full h-full opacity-10 pointer-events-none">
              <div className="space-y-4">
                <div className="h-20 w-64 border-2 border-slate-900 rounded-sm bg-white" />
                <div className="h-20 w-64 border-2 border-slate-900 rounded-sm bg-white" />
              </div>
            </div>

            {/* THE ACTIVE CALENDAR SLOT */}
            <div className="relative z-10 space-y-4">
              <div className="inline-block bg-slate-900 text-white px-4 py-1 font-black italic uppercase text-[10px] tracking-widest mb-2 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]">
                Monday, Nov 24 — 4:00 PM
              </div>

              {/* The "Headache" Slot */}
              <div className="relative w-full max-w-md border-4 border-slate-900 bg-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-tighter">Student Booked</h4>
                    <p className="text-2xl font-black text-slate-900 italic uppercase leading-none">James Miller</p>
                    <p className="text-sm font-bold text-slate-500 mt-1">Algebra II Honors</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400">Scheduled Tutor</p>
                    <p className="text-sm font-black text-rose-500 italic uppercase underline decoration-2 underline-offset-2">Alex M. (Unavailable)</p>
                  </div>
                </div>

                {/* THE ACTION TRIGGER */}
                <div className="mt-6 flex items-center justify-between p-3 bg-slate-50 border-2 border-dashed border-slate-300 group cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-slate-400 group-hover:text-emerald-600" />
                    <span className="text-[11px] font-black uppercase text-slate-500 group-hover:text-emerald-700 tracking-tight">
                      Check Team Availability...
                    </span>
                  </div>
                  <MousePointer2 size={18} className="text-slate-900 fill-slate-900 animate-pulse" />
                </div>
              </div>

              {/* THE POP-OUT ALTERNATIVES (The "Solution") */}
              <div className="relative left-12 -mt-4 w-full max-w-[320px] bg-white border-4 border-slate-900 p-4 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)]">
                <div className="flex items-center gap-2 mb-4 border-b-2 border-slate-100 pb-2">
                  <Users size={14} className="text-emerald-600" />
                  <span className="text-[10px] font-black uppercase text-slate-900">Open At This Time</span>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: "Sarah Jenkins", note: "Marked Available", status: "Assign" },
                    { name: "Kevin V.", note: "No Conflict Found", status: "Assign" }
                  ].map((tutor, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 border-2 border-transparent hover:border-slate-900 transition-all cursor-pointer group">
                      <div>
                        <p className="text-[11px] font-black uppercase text-slate-900">{tutor.name}</p>
                        <p className="text-[9px] font-bold text-slate-500 italic">{tutor.note}</p>
                      </div>
                      <div className="bg-emerald-100 text-emerald-600 px-2 py-1 text-[8px] font-black uppercase rounded group-hover:bg-emerald-500 group-hover:text-white">
                        {tutor.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-8">
            <h2 className="text-5xl font-black text-slate-900 leading-[0.9] uppercase italic tracking-tighter">
              Stop the <br />
              <span className="text-emerald-500 underline decoration-4 underline-offset-4">Calendar Hunt.</span>
            </h2>
            
            <p className="text-xl text-slate-600 font-bold leading-tight">
              When a tutor flakes or a student reschedules, you shouldn't have to dig through 20 different availability forms. 
            </p>

            <div className="space-y-4">
              <div className="p-5 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase italic text-lg text-slate-900">Instant Roster Search</h4>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  Quickly scan your team's live availability for any specific slot. We show you exactly who on your roster is free to cover, so you can fill the gap in seconds.
                </p>
              </div>

              <div className="p-5 border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase italic text-lg text-slate-900">Manage the Reality</h4>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  Running an agency is unpredictable. Whether it's a last-minute enrollment or a sick call, we give you a clear view of your backup options without the text-thread headache.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}