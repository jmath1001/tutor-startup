import { supabase } from "@/lib/supabase";

export async function trackEvent(eventName: string, metadata = {}) {
  try {
    await supabase.from("analytics_events").insert([{
      event_name: eventName,
      page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      metadata,
    }]);
  } catch (err) {
    console.error("Tracking failed:", err);
  }
}