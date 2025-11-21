"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { ModeToggle } from "./mode-toggle";

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <header>
      <nav className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            {/* Logo */}
            <Link href="/" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden gap-8 text-sm lg:flex">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Buttons (Desktop) */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button asChild variant="outline" size="sm">
                <Link href="#">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="#">Sign Up</Link>
              </Button>
              <ModeToggle />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="lg:hidden p-2.5 -mr-2.5"
            >
              {menuState ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuState && (
            <div className="lg:hidden flex flex-col gap-6 bg-background/95 rounded-3xl p-6 shadow-2xl border border-zinc-200/20">
              <ul className="flex flex-col gap-4 text-base">
                {menuItems.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuState(false)}
                      className="text-muted-foreground hover:text-accent-foreground duration-150 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="#" onClick={() => setMenuState(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="#" onClick={() => setMenuState(false)}>
                    Sign Up
                  </Link>
                </Button>
                <ModeToggle />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
