'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from "@/lib/trackEvent";

const AIDemo = () => {
  const scenarios = [
    {
      command: "auto-schedule maya: 2x/week, subjects physics + algebra",
      title: "Auto Scheduling Plan",
      status: "4 schedule suggestions ready (not booked)",
      metrics: { upcoming: "9", present: "24", noShow: "1" },
      rows: [
        { left: "Physics", right: "Mon 4:30 PM", sub: "Suggested • Kevin • Capacity: 7/8" },
        { left: "Algebra", right: "Wed 5:00 PM", sub: "Suggested • Sarah • Capacity: 6/8" },
        { left: "Physics", right: "Fri 3:30 PM", sub: "Suggested • Daniel • Capacity: 8/10" },
      ],
    },
    {
      command: "show me session history for alex",
      title: "Session History",
      status: "8 sessions found",
      metrics: { upcoming: "4", present: "22", noShow: "2" },
      rows: [
        { left: "Algebra II", right: "Booked with Sarah", sub: "Attendance: Present • Thu 4:00 PM" },
        { left: "Geometry", right: "Booked with John", sub: "Attendance: No-show • Tue 3:30 PM" },
        { left: "SAT Math", right: "Booked with Maria", sub: "Attendance: Present • Sat 10:00 AM" },
      ],
    },
    {
      command: "find available physics slots wednesday",
      title: "Available Physics Slots",
      status: "4 slots available",
      metrics: { upcoming: "7", present: "19", noShow: "3" },
      rows: [
        { left: "Physics", right: "Wed 2:30 PM", sub: "Tutor: Kevin", seatsLeft: 2 },
        { left: "Physics", right: "Wed 4:00 PM", sub: "Tutor: Sarah", seatsLeft: 1 },
        { left: "Physics", right: "Wed 5:30 PM", sub: "Tutor: Daniel", seatsLeft: 3 },
      ],
    },
  ];

  const [active, setActive] = React.useState(0);
  const [typedLength, setTypedLength] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "executing" | "results">("typing");
  const [scheduleConfirmed, setScheduleConfirmed] = React.useState(false);
  const [reminderState, setReminderState] = React.useState<"idle" | "queued" | "sent" | "confirmed">("idle");
  const [selectedPhysicsSlot, setSelectedPhysicsSlot] = React.useState<number | null>(null);

  const current = scenarios[active];

  React.useEffect(() => {
    const command = scenarios[active].command;
    const isAutoScheduleScenario = command.startsWith("auto-schedule");

    setPhase("typing");
    setTypedLength(0);
    setScheduleConfirmed(false);
    setReminderState("idle");
    setSelectedPhysicsSlot(null);
    let nextLength = 0;

    const typingId = window.setInterval(() => {
      nextLength += 1;
      setTypedLength(Math.min(nextLength, command.length));
      if (nextLength >= command.length) {
        window.clearInterval(typingId);
        setPhase("executing");
      }
    }, 75);

    const executingId = window.setTimeout(() => {
      setPhase("results");
    }, 3000);

    const nextId = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % scenarios.length);
    }, 15000);

    let reminderQueuedId: number | undefined;
    let reminderSentId: number | undefined;
    let reminderConfirmedId: number | undefined;

    if (isAutoScheduleScenario) {
      reminderQueuedId = window.setTimeout(() => setReminderState("queued"), 6900);
      reminderSentId = window.setTimeout(() => setReminderState("sent"), 9600);
      reminderConfirmedId = window.setTimeout(() => setReminderState("confirmed"), 12300);
    }

    return () => {
      window.clearInterval(typingId);
      window.clearTimeout(executingId);
      window.clearTimeout(nextId);
      if (reminderQueuedId) {
        window.clearTimeout(reminderQueuedId);
      }
      if (reminderSentId) {
        window.clearTimeout(reminderSentId);
      }
      if (reminderConfirmedId) {
        window.clearTimeout(reminderConfirmedId);
      }
    };
  }, [active]);

  const isAutoScheduleScenario = current.command.startsWith("auto-schedule");
  const isPhysicsScenario = current.command.includes("available physics slots");

  return (
    <div className="relative w-full h-full max-w-sm sm:max-w-lg lg:max-w-none flex items-center justify-center ai-float">
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 2.6, repeat: Infinity }}
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-200/70 via-emerald-100/50 to-indigo-200/60 blur-xl ai-glow"
      />

      <div className="relative w-full aspect-[0.95] sm:aspect-square rounded-3xl p-3 sm:p-5 shadow-2xl overflow-hidden border border-[#e7e3dd] bg-[#faf9f7]">
        <div className="flex h-full flex-col rounded-2xl border border-[#e7e3dd] bg-white p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-emerald-500"
              />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#334155]">Thetix AI</span>
            </div>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700">
              {phase === "typing" ? "Listening" : phase === "executing" ? "Executing" : "Ready"}
            </span>
          </div>

          <div className="mb-3 rounded-xl border border-[#f0ece8] bg-[#faf9f7] p-2.5 sm:p-3">
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#a8a29e]">Command</p>
            <div className="flex items-center gap-1 font-mono text-xs text-slate-700">
              <span>&gt;</span>
              <span className="text-sky-700">
                {phase === "typing" ? current.command.slice(0, typedLength) : current.command}
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block h-3 w-[2px] bg-slate-600"
              />
            </div>
          </div>

          <div className="mb-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#e7e3dd] bg-[#faf9f7] p-1.5 sm:p-2">
              <p className="text-[10px] uppercase tracking-wider text-[#a8a29e]">Upcoming</p>
              <p className="text-sm font-bold text-[#1c1917]">{current.metrics.upcoming}</p>
            </div>
            <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-1.5 sm:p-2">
              <p className="text-[10px] uppercase tracking-wider text-[#15803d]">Present</p>
              <p className="text-sm font-bold text-[#166534]">{current.metrics.present}</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-1.5 sm:p-2">
              <p className="text-[10px] uppercase tracking-wider text-amber-700">No-Show</p>
              <p className="text-sm font-bold text-amber-800">{current.metrics.noShow}</p>
            </div>
          </div>

          <div className="mb-2 flex items-end justify-between">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.24 }}
                className="text-xs font-black uppercase tracking-widest text-[#78716c]"
              >
                {current.title}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.status}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="text-[10px] font-bold text-sky-700"
              >
                {current.status}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-1">
            {phase === "executing" && (
              <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3">
                <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-sky-700">Executing command</p>
                <div className="h-1.5 overflow-hidden rounded-full bg-sky-100">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-gradient-to-r from-sky-400 to-emerald-400"
                  />
                </div>
              </div>
            )}

            {phase === "results" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.command}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2"
                >
                  {isPhysicsScenario ? (
                    <div className="space-y-2">
                      {current.rows.map((row, index) => {
                        const isSelected = selectedPhysicsSlot === index;
                        const seatsLeft = (row as { seatsLeft?: number }).seatsLeft ?? 0;
                        return (
                          <motion.button
                            type="button"
                            key={`${current.command}-${row.left}-${index}`}
                            onClick={() => setSelectedPhysicsSlot(index)}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.24, delay: index * 0.08 }}
                            className={`w-full text-left rounded-xl border-2 p-3 transition-all ${
                              isSelected
                                ? "border-sky-500 bg-sky-50 shadow-lg shadow-sky-100"
                                : "border-[#e7e3dd] bg-white hover:border-sky-300"
                            }`}
                          >
                            <div className="mb-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${isSelected ? "text-sky-700" : "text-[#1c1917]"}`}>
                                  {row.right}
                                </span>
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#f0ece8] text-[#78716c]">
                                  {3 - seatsLeft}/3
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold text-emerald-700">
                                {seatsLeft} spot{seatsLeft !== 1 ? "s" : ""} left
                              </span>
                            </div>
                            <p className="text-[11px] text-[#78716c]">{row.left} • {row.sub}</p>
                          </motion.button>
                        );
                      })}

                      <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3">
                        <p className="text-[11px] font-semibold text-sky-700">
                          {selectedPhysicsSlot === null
                            ? "Click a slot to prefill booking and continue."
                            : `Selected slot: ${current.rows[selectedPhysicsSlot].right} (${current.rows[selectedPhysicsSlot].sub}).`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    current.rows.map((row, index) => (
                      <motion.div
                        key={`${current.command}-${row.left}-${index}`}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.24, delay: index * 0.08 }}
                        className="rounded-xl border border-[#f0ece8] bg-white p-3"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-bold text-[#1c1917]">{row.left}</span>
                          <span className="text-[11px] font-semibold text-[#78716c]">{row.right}</span>
                        </div>
                        <p className="text-[11px] text-[#a8a29e]">{row.sub}</p>
                      </motion.div>
                    ))
                  )}

                  {isAutoScheduleScenario && (
                      <div className="mt-2 rounded-xl border border-sky-200 bg-sky-50/80 p-2.5 sm:p-3">
                      <p className="text-[11px] font-black uppercase tracking-widest text-sky-700 mb-2">Schedule Confirmation</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-[11px] text-slate-600">Suggestions only. Nothing is booked until you confirm this plan.</p>
                        <button
                          onClick={() => setScheduleConfirmed(true)}
                          className="h-8 px-3 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-sky-700 transition-colors"
                        >
                          {scheduleConfirmed ? "Plan Confirmed" : "Confirm Suggestions"}
                        </button>
                      </div>
                    </div>
                  )}

                  {isAutoScheduleScenario && (
                    <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-3">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#15803d] mb-1">Automated Reminders</p>
                      <p className="text-[11px] text-[#166534]">
                        {reminderState === "idle" && "No reminders sent yet. Reminders start only after confirmation."}
                        {reminderState === "queued" && "After confirmation: reminders queued for families and tutors."}
                        {reminderState === "sent" && "Reminder links sent. Awaiting family confirmations..."}
                        {reminderState === "confirmed" && "2/2 families confirmed upcoming suggested sessions."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <motion.div
            animate={{ scaleX: [0.15, 1, 0.15] }}
            transition={{ duration: 6.2, repeat: Infinity }}
            className="mt-3 h-1 origin-left rounded-full bg-gradient-to-r from-sky-400 via-cyan-500 to-emerald-400"
          />
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="relative bg-white min-h-screen pt-18">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.14),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.12),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-5 sm:py-6 md:py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center lg:min-h-[calc(100vh-132px)]">

            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-6 lg:space-y-8"
            >

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wider"
              >
                Built for multi-location tutoring operations
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight"
              >
                The operations platform for growing and national tutoring brands.
              </motion.h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
              >
                Standardize scheduling, attendance, communication, and session history across every center. Thetix AI helps regional and HQ teams cut admin hours, increase billable hours, and enforce one operating standard at scale.
              </motion.p>

              {/* Credibility line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-gray-500 font-medium"
              >
                Designed for center directors, regional managers, and HQ operators who need real-time control.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-4"
              >
                <Button
                  asChild
                  className="bg-black text-white font-medium px-8 py-3 hover:bg-gray-800 transition-colors w-fit"
                >
                  <Link href="/book-demo" onClick={() => trackEvent("hero_cta_click")}>
                    Book Demo
                  </Link>
                </Button>
                <p className="text-xs text-gray-400">See a live walkthrough tailored to your centers.</p>
              </motion.div>

              {/* Trust pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-3"
              >
                {[
                  "Multi-center visibility",
                  "Standardized workflows",
                  "AI-assisted operations",
                  "Optimized capacity",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200">
                    <CheckCircle2 size={12} className="text-black" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{text}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>

            {/* Right side - AI Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative -mt-4 sm:-mt-3 md:-mt-3 lg:-mt-6 flex items-center justify-center lg:justify-end"
            >
              <AIDemo />
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}