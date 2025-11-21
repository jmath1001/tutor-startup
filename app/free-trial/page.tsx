'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Email Modal
function EmailModal({ open, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit(email);
    setEmail("");
    setLoading(false);
    setSubmitted(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center justify-center">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white text-center">
              Enter Your Email
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 w-full text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <p className="text-center text-zinc-900 dark:text-white text-lg">
              Thank you! We will send an email to complete your signup.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Page
export default function FreeTrialPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // Supabase-only handler
  const handleEmailSubmit = async (email) => {
    try {
      const { data, error } = await supabase
        .from('trial_signups')
        .insert([{ email, plan: selectedPlan }]);

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      console.log("Saved to Supabase:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
    console.log("Plan clicked:", plan);
  };

  return (
    <main className="overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 min-h-screen py-16">

      {/* Hero Section */}
      <section className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Get instant access to the tutor dashboard, manage students, assign worksheets, and build modules — all in one platform.
          </p>
        </motion.div>
      </section>

      {/* Plans Section */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Trial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border rounded-2xl p-6 shadow-xl dark:shadow-2xl bg-white dark:bg-zinc-900 min-h-[30rem] flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-semibold text-3xl text-blue-600 dark:text-blue-400">Free Trial</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">7 days, no credit card required.</p>
            </div>
            <div className="space-y-6 text-zinc-900 dark:text-white flex-1 pt-0 pb-6">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                <span className="text-4xl">$0</span> / month
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Access to core dashboard</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Manage & enroll students (up to 3)</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Assign worksheets & documents</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Build simple digital modules</li>
                <li className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600">❌ Advanced analytics</li>
                <li className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600">❌ Custom branding</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                className="mx-auto w-auto min-w-[200px] px-10 py-4"
                onClick={() => handlePlanClick("Free Trial")}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border rounded-2xl p-6 shadow-xl dark:shadow-2xl border-2 border-blue-500 bg-white dark:bg-zinc-900 min-h-[30rem] flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-semibold text-3xl text-zinc-900 dark:text-white">Premium</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Best for established tutors and agencies.</p>
            </div>
            <div className="space-y-6 text-zinc-900 dark:text-white flex-1 pt-0 pb-6">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                <span className="text-4xl">$14.99</span> / month
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Everything in Free Trial</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Full module builder</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Advanced analytics & reports</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Unlimited students</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Custom domain & branding</li>
                <li className="flex items-center gap-2"><span className="text-blue-600 dark:text-blue-400 font-bold">✔</span> Priority support</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                className="mx-auto w-auto min-w-[200px] px-10 py-4"
                onClick={() => handlePlanClick("Premium")}
              >
                Start Premium
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Email Modal */}
      <EmailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />
    </main>
  );
}
