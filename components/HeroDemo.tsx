'use client';

import React, { useEffect, useRef } from "react";

export function HeroDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-200">
      
      {/* AUTO-PLAYING VIDEO - No controls */}
      <div className="relative aspect-video bg-slate-100">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/schedule-demo.mp4" type="video/mp4" />
          <source src="/videos/schedule-demo.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* OPTIONAL: Live indicator badge - remove if you don't want it */}
        <div className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1.5 font-black italic uppercase text-[9px] tracking-widest shadow-lg">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
          Live Demo
        </div>
      </div>
    </div>
  );
}