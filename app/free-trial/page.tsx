'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ShieldCheck, X, Loader2, ArrowLeft, Mail, Star, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Director, Eastside Tutoring",
    content: "We went from 15 Excel tabs and constant confusion to one clean dashboard. Game changer.",
    rating: 5
  },
  {
    name: "Marcus Williams",
    role: "Owner, Elite Learning Center",
    content: "The migration took 2 hours and saved us 10+ hours weekly. Worth every penny.",
    rating: 5
  },
  {
    name: "Jessica Rodriguez",
    role: "Operations Manager, StudyHub",
    content: "No more 'who's available?' texts at 10pm. Everything syncs automatically.",
    rating: 5
  },
  {
    name: "David Park",
    role: "Founder, Peak Academics",
    content: "Scheduling conflicts dropped 90%. Our tutors actually know where they need to be.",
    rating: 5
  },
  {
    name: "Amanda Foster",
    role: "Director, SmartStart Tutoring",
    content: "Best decision we made this year. The ROI was immediate.",
    rating: 5
  },
  {
    name: "James Mitchell",
    role: "Owner, Catalyst Learning",
    content: "Simple, powerful, and actually works. No fluff, just results.",
    rating: 5
  }
];

function TestimonialCarousel() {
  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="flex animate-infinite-scroll">
        {/* Duplicate testimonials for seamless loop */}
        {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[380px] mx-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}

function EmailModal({ open, onClose, onSubmit, plan }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(email);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>
        {!submitted ? (
          <>
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Started with {plan}</h2>
              <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                <p className="text-emerald-800 font-medium text-sm flex items-center gap-2">
                  <Mail size={16} /> Personal onboarding included
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  We'll handle your spreadsheet migration manually
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@youragency.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Start Free Trial"}
              </Button>
              <p className="text-xs text-center text-slate-500">
                No payment required • Full migration support
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're all set!</h3>
            <p className="text-slate-600">
              Check your inbox—we'll reach out within the hour to start your migration.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function FreeTrialPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const logEvent = async (name: string, plan: string) => {
    try {
      await supabase.from('analytics_events').insert([{ event_name: name, metadata: { plan: plan } }]);
    } catch (e) { console.error(e); }
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      await supabase.from('trial_signups').insert([{ email, plan: selectedPlan, status: 'pending' }]);
      await logEvent('conversion_success', selectedPlan);
    } catch (err) { console.error("Critical Failure:", err); }
  };

  const openPlanModal = (planName: string) => {
    logEvent('pricing_tier_click', planName);
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group">
          <div className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium">Back to Thetix</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Priority Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Migrate Without the <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Chaos</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop fighting spreadsheets. We'll personally handle your data migration to ensure a smooth transition before you pay a dime.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Core Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Core</h3>
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Zap className="text-slate-600" size={20} />
              </div>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">$99</span>
              <span className="text-slate-500 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Master Calendar View", "Up to 10 Tutor Seats", "Smart Matching Engine", "Full Data Migration"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => openPlanModal("Core")}
              className="w-full h-12 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium"
            >
              Start Free Trial
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              Recommended
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Pro</h3>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white" size={20} />
              </div>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$199</span>
              <span className="text-white/80 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Unlimited Tutor Seats", "Advanced Analytics", "Priority Support", "Personal Onboarding"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => openPlanModal("Pro")}
              className="w-full h-12 bg-white text-emerald-600 rounded-lg hover:bg-slate-50 transition-all font-medium"
            >
              Claim Pro Slot
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="text-emerald-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">White-Glove Onboarding</h2>
              <p className="text-slate-700 leading-relaxed">
                We don't expect you to build your dashboard from scratch. We'll personally coordinate your data migration. 
                No payment required until everything is running with your actual data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about getting started
          </p>
        </div>

        <div className="space-y-4">
          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">How long does migration take?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Most tutoring centers are fully migrated and live within 5-7 days. We handle the data transfer (usually 2-3 hours), 
              then schedule a training session for your team. You're in control from day one.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">What if I'm using Excel/Google Sheets?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Perfect! We've migrated from every setup imaginable—Excel, Google Sheets, paper calendars, you name it. 
              Just send us your files and we'll import everything: tutors, students, existing schedules, and hour packages.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">Can I cancel anytime?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Yes, absolutely. No long-term contracts or commitments. Cancel anytime with 30 days notice. 
              We're confident you'll save so much time that you won't want to go back to spreadsheets.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">Do tutors need to learn a new system?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Tutors get their own simple dashboard that shows only their schedule. They log in, see their sessions, 
              mark attendance—that's it. Most tutors are comfortable within 10 minutes. We provide training for everyone.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">What's included in the free trial?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Everything. Full data migration, personal onboarding, team training, and unlimited support during setup. 
              You don't pay anything until your system is live and running with your actual data. No credit card required to start.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-semibold text-slate-900">How many tutors can I manage?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Core plan includes up to 10 tutor seats. Pro plan has unlimited tutors. 
              If you're growing fast or have seasonal fluctuations, Pro gives you flexibility without worrying about seat limits.
            </p>
          </details>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel />

      <AnimatePresence>
        {modalOpen && (
          <EmailModal 
            open={modalOpen} 
            plan={selectedPlan} 
            onClose={() => setModalOpen(false)} 
            onSubmit={handleEmailSubmit} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}