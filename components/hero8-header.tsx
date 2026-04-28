"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/trackEvent";
import React from "react";

type HeaderLinks = {
  primary?: { label: string; href: string; event: string };
  secondary?: { label: string; href: string; event: string };
  logoHref?: string;
};

export const HeroHeader = ({ links }: { links?: HeaderLinks }) => {
    const logoHref = links?.logoHref ?? "/";

  const primary = links?.primary ?? {
    label: "Join Pilot",
    href: "/free-trial",
    event: "nav_join_pilot_click",
  };
  const secondary = links?.secondary ?? {
    label: "Book Demo",
    href: "/book-demo",
    event: "nav_book_demo_click",
  };

  return (
    <header className="fixed inset-x-0 top-0 z-200">
      <nav className="ai-surface w-full border-b border-slate-200/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex items-center justify-between py-4">

            {/* LOGO */}
  <Link href={logoHref} aria-label="home" className="flex items-center gap-2 group">
              <Logo />
              <span className="hidden sm:block font-bold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Thetix
              </span>
            </Link>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="h-11 px-4 sm:px-6 bg-slate-900 text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-none hover:bg-slate-800 transition-all shadow-sm"
              >
                <Link href={primary.href} onClick={() => trackEvent(primary.event)}>
                  {primary.label}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 px-3 sm:px-5 text-xs uppercase tracking-[0.14em] rounded-none"
              >
                <Link href={secondary.href} onClick={() => trackEvent(secondary.event)}>
                  {secondary.label}
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
};