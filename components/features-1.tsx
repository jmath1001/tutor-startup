'use client';

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap, AlertTriangle, Users2, RotateCcw } from "lucide-react";

export default function Features() {
  return (
    <motion.section 
      className="bg-[#fafafa] py-24 md:py-32" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Aggressive Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.9]">
            Ditch the <span className="text-emerald-500 underline decoration-8 underline-offset-4">Spreadsheets.</span> <br />
            <span className="text-slate-400 text-3xl">Stop Chasing. Start Scaling.</span>
          </h2>
          <p className="mt-8 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            You’re an agency owner, not a data entry clerk. We replace 15 Excel tabs and 100 text threads with a single, automated source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 1. THE AUTOMATED MATCHMAKER */}
          <Card className="relative p-8 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] group">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-lg text-white">
              <Zap size={24} fill="currentColor" />
            </div>
            
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 mb-4">
              Auto-Sync Matchmaking
            </h3>
            
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
              Forget the "Availability Text" tag. Our engine <span className="text-slate-900 font-bold">automatically scans</span> live tutor calendars against student requests. It shows multiple verified matches so you can choose the best fit—no manual checking required.
            </p>

            {/* Visual: Multiple Tutor Options */}
            <div className="relative p-4 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden space-y-2">
              {[
                { tutor: "Sarah L.", time: "Tue @ 4:00 PM", best: true },
                { tutor: "Marcus V.", time: "Wed @ 5:30 PM" },
                { tutor: "Elena W.", time: "Thu @ 3:00 PM" },
              ].map((opt, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg flex justify-between items-center border transition-all
                    ${opt.best
                      ? "bg-emerald-500/20 border-emerald-500"
                      : "bg-white/5 border-white/10"
                    }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-slate-900">
                      {opt.tutor}
                    </span>
                    <span className="text-[8px] font-bold text-slate-500">
                      {opt.time}
                    </span>
                  </div>
                  {opt.best && (
                    <span className="text-[8px] font-black text-emerald-500 uppercase">
                      Recommended
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* 2. THE HOUR BANK PROTECTOR */}
          <Card className="relative p-8 border-2 border-slate-900 bg-slate-900 shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-rose-500 rounded-lg text-white">
              <AlertTriangle size={24} />
            </div>
            
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-4">
              Rules-Based Tracking
            </h3>
            
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">
              Set your own rules for unexcused absences, late cancellations, and other policies. The system <span className="text-rose-400 font-bold">auto-tracks hours</span> and flags discrepancies instantly.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-[10px] font-black uppercase text-rose-400 mb-2">
                <span>Student Balance</span>
                <span>0.0 HRS</span>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="h-2 flex-1 bg-rose-500/20 rounded-full" />)}
              </div>
              <p className="mt-3 text-[9px] font-bold text-white/40 uppercase">Action Required: Refill Link Sent</p>
            </div>
          </Card>

          {/* 3. EASY RESCHEDULING */}
          <Card className="relative p-8 border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="mb-6 flex items-center justify-center w-12 h-12 bg-slate-900 rounded-lg text-white">
              <RotateCcw size={24} />
            </div>
            
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 mb-4">
              Easy Rescheduling
            </h3>
            
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
              Any conflict or unexpected unavailability? Our system instantly shows all <span className="text-slate-900 font-bold">verified backup tutors</span> for that subject and time. One click to reassign and notify everyone.
            </p>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400">3 Eligible Backups</span>
            </div>
          </Card>

        </div>
      </div>
    </motion.section>
  );
}
