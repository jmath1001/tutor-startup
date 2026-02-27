import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function trackEvent(eventName: string, metadata = {}, duration?: number) {
  try {
    await supabase.from("analytics_events").insert([{
      event_name: eventName,
      page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      metadata,
      duration_ms: duration ? Math.round(duration) : null, // This handles the "time"
    }]);
  } catch (err) {
    console.error("Tracking failed:", err);
  }
}