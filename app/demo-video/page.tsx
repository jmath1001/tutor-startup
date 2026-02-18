'use client';

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// 👇 Replace this with your actual YouTube video ID
// e.g. if your URL is https://www.youtube.com/watch?v=dQw4w9WgXcQ
// then YOUTUBE_ID = "dQw4w9WgXcQ"
const YOUTUBE_ID = "rQGBCpam27M";

export default function DemoVideoPage() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">

      {/* Top nav */}
      <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <span className="text-white font-black uppercase italic tracking-tighter text-lg">
          thetix
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-4xl space-y-8">

          {/* Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live Demo
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
              See It in Action
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
              A walkthrough of how tutoring centers can ditch the spreadsheet and run their schedule in one place.
            </p>
          </div>

          {/* Video embed */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=0&rel=0&modestbranding=1`}
              title="Thetix Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* CTA below video */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/free-trial"
              className="inline-flex items-center gap-2 h-13 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-sm uppercase italic tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              Request Early Access <ArrowRight size={18} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-13 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-sm uppercase italic tracking-widest rounded-2xl border border-white/10 transition-all"
            >
              Learn More
            </Link>
          </div>

        </div>
      </div>

    </main>
  );
}