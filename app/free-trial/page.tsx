'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight, Loader2, Shield, Clock, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/trackEvent";

type PilotApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  centerName: string;
  role: string;
  studentsPerWeek: string;
  tutorsCount: string;
  timeline: string;
  biggestPain: string;
  notes: string;
};

const outcomes = [
  {
    title: "The autoscheduler builds your week for you",
    body: "Tell the system your tutors, their availability, and what subjects they cover. It places every student session automatically, with zero conflicts.",
  },
  {
    title: "Tutors and students see their schedules live",
    body: "No more 'wait what time is my session?' texts. Every tutor and student portal updates in real time the moment anything changes.",
  },
  {
    title: "Rescheduling takes seconds, not an hour",
    body: "Tutor cancels last minute? The system instantly shows who's available to cover based on subject and availability. Two clicks and it's done.",
  },
  {
    title: "You stop being the human spreadsheet",
    body: "All student history, session records, and attendance live in one place. You're not the only one who knows how the schedule works anymore.",
  },
];

const faqs = [
  {
    q: "Will this work with what I'm already using?",
    a: "Yes. Whether you're on Excel, Google Sheets, a CRM, or a mix of everything — we work with it. We've seen every setup and we'll get it moved over.",
  },
  {
    q: "How long does it take to get set up?",
    a: "Most tutoring centers are fully live by the end of the onboarding call. We do the heavy lifting — you just show up and confirm everything looks right.",
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
  const [formData, setFormData] = useState<PilotApplicationForm>({
    fullName: "",
    email: "",
    phone: "",
    centerName: "",
    role: "",
    studentsPerWeek: "",
    tutorsCount: "",
    timeline: "",
    biggestPain: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasTrackedFormFocus, setHasTrackedFormFocus] = useState(false);

  useEffect(() => {
    trackEvent("pilot_page_view");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    await trackEvent("pilot_submit_click", {
      placement: "free_trial_form",
      role: formData.role,
      students_per_week: formData.studentsPerWeek,
    });
    setLoading(true);

    try {
      const response = await fetch("/api/pilot-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string };
        if (payload.message === "invalid_email" || payload.message === "email_required") {
          setErrorMessage("Please enter a valid email address.");
        } else if (payload.message === "email_already_exists") {
          setErrorMessage("This email already has a pilot application on file.");
        } else {
          setErrorMessage("We could not submit right now. Please try again in a minute.");
        }
        await trackEvent("pilot_application_failed", {
          source: "free_trial",
          message: payload.message ?? "request_failed",
        });
        setLoading(false);
        return;
      }

      await trackEvent("pilot_application_submitted", {
        source: "free_trial",
        email_domain: formData.email.includes("@") ? formData.email.split("@")[1] : "unknown",
        role: formData.role,
        students_per_week: formData.studentsPerWeek,
      });
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        centerName: "",
        role: "",
        studentsPerWeek: "",
        tutorsCount: "",
        timeline: "",
        biggestPain: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Something went wrong submitting the form. Please try again.");
      await trackEvent("pilot_application_failed", { source: "free_trial", message: "unexpected_exception" });
    }

    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen">

      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
            Few pilot spots left
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            A live scheduling system<br />
            <span className="text-emerald-500">built for tutoring centers.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            Thetix is an active product — not a waitlist. It has a running autoscheduler that reads your tutors&apos; availability, subject constraints, and student needs, then builds the schedule for you. Pilot centers are using it right now.
          </p>
        </motion.div>
      </section>

      {/* Outcomes */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
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

      {/* What's in the product */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <h2 className="text-2xl font-black text-slate-900 mb-2">What's running in the system</h2>
        <p className="text-sm text-slate-500 mb-8">These aren&apos;t planned features — they&apos;re live in the pilot right now.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Constraint-aware autoscheduler", desc: "Reads tutor availability, subjects, and student needs — builds the full schedule automatically." },
            { label: "Live tutor + student portals", desc: "Each person sees only their own schedule. Updates the moment you make a change." },
            { label: "Automated session reminders", desc: "Students and parents get reminders before sessions. No-shows drop immediately." },
            { label: "Attendance and session history", desc: "Every session logged. Full records per student, searchable and exportable." },
            { label: "Instant reschedule engine", desc: "When a tutor cancels, the system shows you who can cover — filtered by subject and slot." },
            { label: "Multi-tutor, multi-subject support", desc: "Handles mixed subject loads, split availability, and overlapping student needs without spreadsheets." },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 text-white rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">{item.label}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-4">This pilot is right for you if</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "You manage 5+ active tutors across sessions",
              "You're still coordinating schedules by hand or on spreadsheets",
              "No-shows or last-minute cancellations cost you time every week",
              "You want a real system before hiring more staff",
              "You're the only one who knows how the schedule works",
              "You've tried calendar tools but nothing fits tutoring ops",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
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
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 sm:pb-32">

        {/* Founder note */}
        <div className="mb-6 bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-white font-black text-sm">T</div>
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">A note from the founder</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              I built this because I ran a tutoring center and the scheduling problem never went away no matter what I tried.
              Every app assumed a clean use case — we never had one. If your situation is messy, that&apos;s exactly what this is built for.
              Fill out the form and I will personally review your application and reach out within 24 hours.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 md:p-14 text-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Ready to join the<br />
            <span className="text-emerald-400">current pilot cohort?</span>
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            We prioritize teams with active scheduling complexity. Complete the intake below so we can confirm fit and kick off onboarding.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Clock size={13} className="text-emerald-400" />
              Reviewed within 24 hours
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MessageCircle size={13} className="text-emerald-400" />
              Direct line to founder
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Shield size={13} className="text-emerald-400" />
              No contract, no commitment
            </div>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => {
                    if (!hasTrackedFormFocus) {
                      setHasTrackedFormFocus(true);
                      trackEvent("pilot_intake_focus", { source: "free_trial" });
                    }
                  }}
                  placeholder="Full name"
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Work email"
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
                <input
                  type="text"
                  name="centerName"
                  required
                  value={formData.centerName}
                  onChange={handleChange}
                  placeholder="Center or business name"
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />

                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="" className="text-slate-900">Your role</option>
                  <option value="owner" className="text-slate-900">Owner / Founder</option>
                  <option value="director" className="text-slate-900">Center Director</option>
                  <option value="operations" className="text-slate-900">Operations Manager</option>
                  <option value="scheduler" className="text-slate-900">Scheduler / Admin</option>
                </select>

                <select
                  name="studentsPerWeek"
                  required
                  value={formData.studentsPerWeek}
                  onChange={handleChange}
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="" className="text-slate-900">Active students / week</option>
                  <option value="1-20" className="text-slate-900">1-20</option>
                  <option value="21-50" className="text-slate-900">21-50</option>
                  <option value="51-100" className="text-slate-900">51-100</option>
                  <option value="101-250" className="text-slate-900">101-250</option>
                  <option value="250+" className="text-slate-900">250+</option>
                </select>

                <select
                  name="tutorsCount"
                  required
                  value={formData.tutorsCount}
                  onChange={handleChange}
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="" className="text-slate-900">Tutors on team</option>
                  <option value="1-5" className="text-slate-900">1-5</option>
                  <option value="6-15" className="text-slate-900">6-15</option>
                  <option value="16-30" className="text-slate-900">16-30</option>
                  <option value="31+" className="text-slate-900">31+</option>
                </select>

                <select
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleChange}
                  className="h-12 px-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                >
                  <option value="" className="text-slate-900">When do you want this live?</option>
                  <option value="asap" className="text-slate-900">ASAP (this month)</option>
                  <option value="30-60-days" className="text-slate-900">In 30-60 days</option>
                  <option value="this-quarter" className="text-slate-900">This quarter</option>
                  <option value="exploring" className="text-slate-900">Just exploring</option>
                </select>
              </div>

              <div className="mt-3 space-y-3">
                <textarea
                  name="biggestPain"
                  required
                  value={formData.biggestPain}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What is your biggest scheduling or no-show bottleneck right now?"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Anything else we should know before reviewing your pilot application?"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 h-14 w-full px-8 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                {loading
                  ? <Loader2 size={18} className="animate-spin" />
                  : <><span>Apply For Pilot</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                }
              </button>

              <p className="text-xs text-slate-500 mt-4 text-center">
                I read every application personally. If it&apos;s not a fit right now, I&apos;ll tell you honestly.
              </p>
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
              <p className="text-slate-400 text-sm">We'll reach out within 24 hours with pilot onboarding details.</p>
            </motion.div>
          )}

          {!!errorMessage && <p className="text-red-300 text-sm mt-4">{errorMessage}</p>}

          <p className="text-xs text-slate-500 mt-6">
            Want a walkthrough first?{" "}
            <Link
              href="/book-demo"
              className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2"
              onClick={() => trackEvent("pilot_page_book_demo_click")}
            >
              Book demo
            </Link>
          </p>

          <p className="text-xs text-slate-600 mt-6">No spam. No commitment. Just a conversation.</p>
        </div>
      </section>

    </main>
  );
}