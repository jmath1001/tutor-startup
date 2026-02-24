'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/trackEvent";

const outcomes = [
  {
    title: "Your tutors always know their schedule",
    body: "No more 'wait what time is my session?' texts. Every tutor sees their week in real time.",
  },
  {
    title: "Students stop missing sessions",
    body: "They can see exactly when and where their next session is. Fewer no-shows, more billable hours.",
  },
  {
    title: "Rescheduling takes seconds, not an hour",
    body: "Tutor cancels last minute? The system instantly shows who's available to cover. Two clicks and it's done.",
  },
  {
    title: "You stop being the human spreadsheet",
    body: "Stop being the person who holds all the scheduling knowledge in your head. It's all in one place everyone can see.",
  },
];

const faqs = [
  {
    q: "Will this work with what I'm already using?",
    a: "Yes. Whether you're on Excel, Google Sheets, a CRM, or a mix of everything — we work with it. We've seen every setup and we'll get it moved over.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Most agencies are fully live by the end of the onboarding call. We do the heavy lifting — you just show up and confirm everything looks right.",
  },
  {
    q: "Will my tutors actually use this?",
    a: "Tutors get a simple portal that shows their schedule and nothing else. No learning curve, no training needed. If they can read a calendar, they can use this.",
  },
  {
    q: "What happens to my existing student data?",
    a: "It all comes with you. Every student, every tutor, every recurring session. We don't go live until you've confirmed nothing is missing.",
  },
  {
    q: "What does the call actually involve?",
    a: "You show us your current setup, we import everything, configure your schedule, and get your tutors and students added. It's a working session, not a sales pitch.",
  },
];

export default function LearnMorePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("waitlist_signups").insert([{
        email,
        status: "pending",
      }]);
      await trackEvent("learn_more_email_submit", { email });
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen">

      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-8 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Here's exactly<br />
            <span className="text-emerald-500">what changes.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            You clicked learn more because something on that page sounded familiar. Here's what your agency looks like once the scheduling chaos is gone.
          </p>
        </motion.div>
      </section>

      {/* Outcomes */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="space-y-4">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-6"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle size={14} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-black text-slate-900 mb-8">Common questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                <span className={`text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Email CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 text-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to book your<br />
            <span className="text-emerald-400">free migration call?</span>
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Drop your email and we'll reach out to schedule. 30 minutes, we handle everything, no commitment.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@tutoringcenter.com"
                className="flex-1 h-14 px-5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group shrink-0"
              >
                {loading
                  ? <Loader2 size={18} className="animate-spin" />
                  : <><span>Book My Call</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                }
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={28} className="text-emerald-400" />
              </div>
              <p className="text-white font-bold text-lg">You're in.</p>
              <p className="text-slate-400 text-sm">We'll reach out within 24 hours to schedule your call.</p>
            </motion.div>
          )}

          <p className="text-xs text-slate-600 mt-6">No spam. No commitment. Just a conversation.</p>
        </div>
      </section>

    </main>
  );
}