"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import React from "react";

export const HeroHeader = () => {
  return (
    <header>
      <nav className="bg-white/80 fixed z-50 w-full border-b-4 border-slate-900 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center justify-between py-4">
            
            {/* Logo - Kept Simple */}
            <Link href="/" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {/* Actions - Only what matters */}
            <div className="flex items-center gap-4">
              
              
              <Button 
                asChild 
                className="border-2 border-slate-900 bg-emerald-500 text-slate-900 font-black uppercase italic text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-900 hover:text-white transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Link href="/free-trial">Get Started</Link>
              </Button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};