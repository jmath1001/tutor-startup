import { supabase } from "@/lib/supabase";

export async function trackEvent(eventName: string, metadata = {}, duration?: number) {
  try {
    await supabase.from("analytics_events").insert([{
      event_name: eventName,
      page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      metadata,
      duration_ms: duration ? Math.round(duration) : null,
    }]);
  } catch (err) {
    console.error("Tracking failed:", err);
  }
}