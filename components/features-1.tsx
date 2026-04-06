'use client';

import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, BellRing, RotateCcw, TrendingDown } from "lucide-react";

const FeatureVideo = ({ src }: { src: string }) => (
  <div className="relative w-full h-full min-h-[220px] sm:min-h-[320px] bg-slate-100 rounded-none overflow-hidden border border-slate-300 shadow-2xl">
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
    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/15" />
  </div>
);

export default function Features() {
  const features = React.useMemo(() => [
    {
      id: "record",
      icon: <CalendarCheck size={28} className="text-emerald-500" />,
      label: "Enterprise Core",
      title: "One operating system across every location",
      description: "Centralize schedules, attendance, student history, and family communication so all centers run on the same operational standard.",
      points: ["Network-wide source of truth", "Consistent records across sites", "No duplicate logging"],
      video: "/videos/ai-demo.mp4",
    },
    {
      id: "workflow",
      icon: <BellRing size={28} className="text-rose-500" />,
      label: "Standardization",
      title: "Enforce repeatable workflows for every center",
      description: "Match tutors by subject and availability, mark attendance once, and apply the same operating rules across all locations.",
      points: ["Tutor + subject matching", "Attendance tied to schedule", "Standard SOP execution"],
      video: "/videos/tracking-demo.mp4",
    },
    {
      id: "automation",
      icon: <TrendingDown size={28} className="text-blue-500" />,
      label: "Efficiency",
      title: "AI that scales coordinator output",
      description: "Automate reminders, answer schedule questions instantly, and improve allocations so each operations team can support more students without adding overhead.",
      points: ["Fewer manual calls", "Faster schedule decisions", "Higher seat utilization"],
      video: "/videos/attendance-demo.mp4",
    },
    {
      id: "search",
      icon: <RotateCcw size={28} className="text-violet-500" />,
      label: "Executive Visibility",
      title: "Give regional and HQ teams instant answers",
      description: "Query student history, no-show patterns, available slots, and upcoming sessions across locations without waiting on reports.",
      points: ["Cross-center attendance trends", "Available subject slots", "Upcoming sessions at a glance"],
      video: "/videos/queries-demo.mp4",
    },
  ], []);

  const [activeTab, setActiveTab] = React.useState(features[0].id);
  const activeFeature = features.find((feature) => feature.id === activeTab) ?? features[0];

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = features.findIndex((feature) => feature.id === prev);
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex].id;
      });
    }, 15000);

    return () => window.clearInterval(id);
  }, [features]);

  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.14),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.1),transparent_46%)]" />
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none ai-grid" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-900 tracking-tight leading-tight mb-4">
            Built for enterprise tutoring operations, not just reporting.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Switch between workflows to see how Thetix standardizes scheduling, attendance, and AI-assisted operations across regional and national teams.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left rounded-none border px-3 sm:px-4 py-3 sm:py-4 transition-all ${
                  activeTab === feature.id
                    ? "border-sky-300 bg-gradient-to-r from-sky-100 to-emerald-100 text-slate-900 shadow-[0_8px_25px_rgba(14,165,233,0.12)]"
                    : "border-slate-300 bg-slate-100/90 text-slate-700 hover:border-sky-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`inline-flex p-2 sm:p-2.5 rounded-none ${activeTab === feature.id ? "bg-white/70" : "bg-slate-200/70"}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-wider ${activeTab === feature.id ? "text-slate-500" : "text-slate-400"}`}>
                      {feature.label}
                    </p>
                    <p className="text-xs sm:text-sm font-medium leading-snug">{feature.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="ai-surface rounded-none p-4 sm:p-5 md:p-7 bg-slate-100/85"
          >
            <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-6 xl:gap-10 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{activeFeature.label}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-4">
                  {activeFeature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                  {activeFeature.description}
                </p>
                <div className="space-y-2">
                  {activeFeature.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 rounded-none border border-slate-300 bg-slate-100 px-3 py-2 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      <span className="text-xs sm:text-sm text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.005 }} className="w-full">
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[500px] xl:h-[560px]">
                  <FeatureVideo src={activeFeature.video} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}