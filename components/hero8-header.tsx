"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import React from "react";

export const HeroHeader = () => {
  return (
    <header>
      <nav className="bg-white fixed z-50 w-full border-b-4 border-slate-900 shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center justify-between py-4">
            
            {/* LOGO & STATUS */}
            <div className="flex items-center gap-6">
              <Link href="/" aria-label="home" className="flex items-center space-x-2 group">
                <Logo />
                <span className="hidden sm:block font-black text-2xl uppercase italic tracking-tighter text-slate-900 group-hover:text-emerald-500 transition-colors">
                  THETIX
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 border-2 border-slate-900 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Live</span>
              </div>
            </div>

            {/* NAV LINKS - BRUTAL STYLE */}
            <div className="hidden md:flex items-center gap-8">
              {["Demo", "Pricing"].map((item) => (
                <Link 
                  key={item}
                  href={item === "Pricing" ? "/free-trial" : "#demo"} 
                  className="text-xs font-black uppercase italic tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Button 
                asChild 
                className="h-12 border-4 border-slate-900 bg-emerald-500 text-slate-900 font-black uppercase italic text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-900 hover:text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Link href="/free-trial">Deploy Now</Link>
              </Button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};