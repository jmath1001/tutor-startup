"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/trackEvent";
import React from "react";

export const HeroHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-[200]">
      <nav className="ai-surface w-full border-b border-slate-200/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center justify-between py-4">

            {/* LOGO */}
            <Link href="/" aria-label="home" className="flex items-center gap-2 group">
              <Logo />
              <span className="hidden sm:block font-bold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Thetix
              </span>
            </Link>

            {/* CTA */}
            <Button
              asChild
              className="h-11 px-6 bg-slate-900 text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-none hover:bg-slate-800 transition-all shadow-sm"
            >
              <Link href="/book-demo" onClick={() => trackEvent("nav_cta_click")}>Book Demo</Link>
            </Button>

          </div>
        </div>
      </nav>
    </header>
  );
};