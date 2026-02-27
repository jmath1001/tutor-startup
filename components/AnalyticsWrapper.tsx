"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/supabase";

export default function AnalyticsWrapper({ name, children }: { name: string, children: React.ReactNode }) {
  const startTime = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User started looking at this section
            startTime.current = performance.now();
          } else if (startTime.current !== null) {
            // User scrolled away - calculate time
            const duration = performance.now() - startTime.current;
            
            // Only send to Supabase if they stayed > 1 second (ignores fast scrolling)
            if (duration > 1000) {
              trackEvent("section_view", { section: name }, duration);
            }
            startTime.current = null;
          }
        });
      },
      { threshold: 0.5 } // 50% of the component must be visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [name]);

  return <div ref={sectionRef}>{children}</div>;
}