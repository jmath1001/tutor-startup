'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CallToAction() {

  const trackClick = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName);
    } else {
      console.log(`Tracking event: ${eventName}`);
    }
  };

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Ready to Grow Your Business?
          </h2>
          <p className="mt-4">Let's scale your business to success.</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              size="lg"
              onClick={() => trackClick("CTA Get Started Click")}
            >
              <Link href="/free-trial">
                <span>Get Started</span>
              </Link>
            </Button>

            <Button 
              asChild 
              size="lg" 
              variant="outline"
              onClick={() => trackClick("CTA Book Demo Click")}
            >
              <Link href="/book-demo">
                <span>Book Demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
