'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ArrowLeft, Mail, Star, Sparkles, Users, Clock, X, Loader2 } from "lucide-react";
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

function WaitlistModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    centerName: "",
    numTutors: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", centerName: "", numTutors: "" });
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Join Early Access</h2>
              <p className="text-sm text-slate-600">
                Limited to 10 centers. Free while in beta. We'll personally handle your migration.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jane@tutoringcenter.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tutoring Center Name</label>
                <input
                  type="text" 
                  required 
                  value={formData.centerName}
                  onChange={(e) => setFormData({...formData, centerName: e.target.value})}
                  placeholder="ABC Learning Center"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Tutors</label>
                <select
                  required 
                  value={formData.numTutors}
                  onChange={(e) => setFormData({...formData, numTutors: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900"
                >
                  <option value="">Select...</option>
                  <option value="1-5">1-5 tutors</option>
                  <option value="6-10">6-10 tutors</option>
                  <option value="11-20">11-20 tutors</option>
                  <option value="20+">20+ tutors</option>
                </select>
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Claim Your Spot"}
              </Button>
              <p className="text-xs text-center text-slate-500">
                Free during beta • Full migration support included
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're on the list!</h3>
            <p className="text-slate-600">
              We'll reach out within 24 hours to schedule your migration and get you set up.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function WaitlistPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleWaitlistSubmit = async (formData) => {
    try {
      await supabase.from('waitlist_signups').insert([{
        name: formData.name,
        email: formData.email,
        center_name: formData.centerName,
        num_tutors: formData.numTutors,
        status: 'pending'
      }]);
      console.log("Waitlist signup successful");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const features = [
    "Auto-sync tutor availability",
    "Smart student-tutor matching",
    "One-click rescheduling",
    "Attendance tracking",
    "Hour package management",
    "Real-time notifications"
  ];

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group">
          <div className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users size={16} />
            <span>Limited to 10 Centers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Join the <br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Early Access Waitlist
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            We're accepting 10 tutoring centers for free beta access. Get white-glove migration and be part of building the future of tutoring center management.
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl text-base"
          >
            Claim Your Spot
          </Button>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">What You Get (Free During Beta)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-emerald-500" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">White-Glove Migration Included</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We handle 100% of your data migration from Excel, Google Sheets, or whatever you're using now. 
                  Plus full team training and ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-semibold text-slate-900">Why is it free?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              We're in early access and want feedback from real tutoring centers. You help us build the best product, 
              we help you fix your scheduling chaos. Win-win.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-semibold text-slate-900">How long is it free?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              At least 3-6 months. When we do eventually charge, you'll get grandfathered pricing 
              (way cheaper than regular rates). No surprises.
            </p>
          </details>

          <details className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-semibold text-slate-900">What if I want to cancel?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              You can stop using it anytime, no questions asked. We export all your data back to you.
            </p>
          </details>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      <AnimatePresence>
        {modalOpen && (
          <WaitlistModal 
            open={modalOpen} 
            onClose={() => setModalOpen(false)} 
            onSubmit={handleWaitlistSubmit} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}