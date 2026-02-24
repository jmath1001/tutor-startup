"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/trackEvent";
import React from "react";

export const HeroHeader = () => {
  return (
    <header>
      <nav className="bg-white fixed z-50 w-full border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center justify-between py-4">

            {/* LOGO */}
            <Link href="/" aria-label="home" className="flex items-center gap-2 group">
              <Logo />
              <span className="hidden sm:block font-black text-xl tracking-tight text-slate-900 group-hover:text-emerald-500 transition-colors">
                Thetix
              </span>
            </Link>

            {/* CTA */}
            <Button
              asChild
              className="h-11 px-6 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-slate-900 transition-all shadow-md active:scale-95"
            >
              <Link href="/free-trial" onClick={() => trackEvent("nav_cta_click")}>Book a Free Call</Link>
            </Button>

          </div>
        </div>
      </nav>
    </header>
  );
};