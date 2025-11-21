'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { HeroDemo } from "@/components/HeroDemo";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react'; 

export default function HeroSection() {

  // Vercel Analytics click tracker
  const trackClick = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(eventName);
    } else {
      console.log(`Tracking event: ${eventName}`);
    }
  };

  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col lg:flex-row items-center px-6">
              {/* Text Section */}
              <motion.div
                className="mx-auto max-w-lg text-center lg:mx-0 lg:w-1/2 lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="mt-8 text-5xl font-medium md:text-6xl xl:text-7xl">
                  Scaling Your Tutoring Into a Real Business
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Stop juggling spreadsheets and notebooks. Manage all your students, 
                  schedule sessions, track progress, and grow your tutoring business 
                  from one powerful platform.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button 
                    asChild 
                    size="lg" 
                    className="px-5 text-base"
                    onClick={() => trackClick("Start Free Trial Click")}
                  >
                    <Link href="/free-trial">Start Free Trial</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="ghost" 
                    className="px-5 text-base"
                    onClick={() => trackClick("Watch Demo Click")}
                  >
                    <Link href="/book-demo">Book Demo</Link>
                  </Button>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  ✓ No credit card required • ✓ 7-day free trial • ✓ Cancel anytime
                </p>
              </motion.div>

              {/* Demo / Animation Section */}
              <motion.div
                className="mb-12 lg:mb-0 lg:ml-12 lg:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                <HeroDemo />
              </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
              className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 cursor-pointer md:block"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link href="#trusted-slider" aria-label="Scroll down to features">
                <ChevronDown className="h-8 w-8 text-muted-foreground" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Trusted Slider Section */}
        <motion.section
          id="trusted-slider"
          className="bg-background pb-16 md:pb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Trusted by 5,000+ tutors</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={10} speed={20} gap={112}>
                  {[
                    "Sarah M.• Math Tutor",
                    "Michael C.• Physics",
                    "Emma W.• Languages",
                    "David L.• Chemistry",
                    "Lisa K.• Music",
                    "James P.• Computer Science",
                    "Rachel T.• Biology",
                    "Alex R.• History"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center mr-8">
                      <span className="text-lg font-semibold dark:text-white">{item.split("•")[0]}</span>
                      <span className="ml-2 text-sm text-muted-foreground">• {item.split("•")[1]}</span>
                    </div>
                  ))}
                </InfiniteSlider>

                {/* Edge fades */}
                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20 pointer-events-none"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20 pointer-events-none"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
