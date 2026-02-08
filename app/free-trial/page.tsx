'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ShieldCheck, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * EMAIL MODAL COMPONENT (Unchanged design, logic intact)
 */
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
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white border-4 border-slate-900 p-8 max-w-md w-full shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
          <X size={24} />
        </button>
        {!submitted ? (
          <>
            <div className="mb-6">
              <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">Secure Your Slot</h2>
              <p className="text-slate-500 font-bold text-sm uppercase">Plan: <span className="text-emerald-600">{plan}</span></p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@youragency.com"
                className="w-full border-4 border-slate-900 p-4 font-bold text-slate-900 focus:outline-none focus:bg-emerald-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
              <Button type="submit" disabled={loading} className="w-full h-16 bg-slate-900 text-white font-black uppercase italic tracking-widest text-lg hover:bg-emerald-500 transition-all">
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Finalize Signup"}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <CheckCircle size={60} className="text-emerald-500 mb-4" />
            <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Entry Logged.</h3>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function FreeTrialPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleEmailSubmit = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('trial_signups')
        .insert([{ email, plan: selectedPlan, status: 'pending' }])
        .select();
      if (error) console.error("❌ Database Error:", error.message);
    } catch (err) {
      console.error("💀 Critical Failure:", err);
    }
  };

  const openPlanModal = (planName: string) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <main className="bg-[#fafafa] min-h-screen py-12 selection:bg-emerald-500 selection:text-white">
      
      {/* TIGHTENED HERO */}
      <section className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block bg-slate-900 text-white px-3 py-0.5 font-black uppercase italic text-[10px] tracking-[0.2em] mb-4">
            7-Day Trial
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-[0.9] mb-4">
            Pick Your <span className="text-emerald-500 italic">Engine.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg font-bold text-slate-500 leading-tight">
            Stop the spreadsheet hunt. Choose your scale and get your master dashboard live today.
          </p>
        </motion.div>
      </section>

      {/* PRICING GRID - SITS HIGHER NOW */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* CORE */}
        <div className="border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Core</h3>
              <Zap className="text-emerald-500 fill-emerald-500" size={24} />
            </div>
            <p className="text-4xl font-black text-slate-900 mb-6">$199<span className="text-sm text-slate-400">/mo</span></p>
            <ul className="space-y-3 mb-10 text-base font-bold text-slate-600">
              {["Master Scheduling View", "Up to 10 Tutor Seats", "Conflict Detection", "Hour-Bank Alerts"].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={() => openPlanModal("Core")} className="w-full h-16 border-4 border-slate-900 bg-white text-slate-900 font-black uppercase italic tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1">
            Start Trial
          </Button>
        </div>

        {/* PRO */}
        <div className="relative border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 font-black uppercase italic text-[10px] border-l-4 border-b-4 border-slate-900">
            Recommended
          </div>
          <div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Pro</h3>
              <ShieldCheck className="text-emerald-500" size={24} />
            </div>
            <p className="text-4xl font-black text-slate-900 mb-6">$399<span className="text-sm text-slate-400">/mo</span></p>
            <ul className="space-y-3 mb-10 text-base font-bold text-slate-600">
              {["Unlimited Tutors", "Priority Search Engine", "Custom Domain", "Admin Analytics", "Priority Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={() => openPlanModal("Pro")} className="w-full h-16 bg-slate-900 text-white font-black uppercase italic tracking-widest hover:bg-emerald-500 transition-all shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] active:shadow-none active:translate-x-1">
            Claim Pro
          </Button>
        </div>
      </section>

      <footer className="mt-16 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          AgencyCommand &copy; 2026
        </p>
      </footer>

      <AnimatePresence>
        {modalOpen && (
          <EmailModal open={modalOpen} plan={selectedPlan} onClose={() => setModalOpen(false)} onSubmit={handleEmailSubmit} />
        )}
      </AnimatePresence>
    </main>
  );
}