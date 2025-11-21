'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('demo_requests')
        .insert([formData]);

      if (error) {
        console.error('Supabase error:', error);
        setLoading(false);
        return;
      }

      console.log('Saved demo request:', data);
      setSubmitted(true);
      setLoading(false);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', notes: '' });
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-16 bg-zinc-50 dark:bg-zinc-950 px-6 flex flex-col items-center">
      {/* Back Arrow */}
      <div className="w-full max-w-3xl mb-6">
        <Link href="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
      </div>

      {/* Header Section */}
      <section className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Book a Demo
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Have more questions or special requirements? Contact us so we can schedule a demo!
        </p>
      </section>

      {/* Form Section */}
      <section className="w-full max-w-lg">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="company"
              placeholder="Company / Organization"
              value={formData.company}
              onChange={handleChange}
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="notes"
              placeholder="Additional Notes / Questions"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Submitting...' : 'Book Demo'}
            </Button>
          </form>
        ) : (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <p className="text-zinc-900 dark:text-white text-lg text-center">
              Thank you! We will contact you shortly to schedule your demo.
            </p>
          </div>
        )}
      </section>

      {/* Bottom Call to Action */}
      <section className="max-w-3xl text-center mt-12">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Ready to dive into a trial?{' '}
          <Link href="/free-trial" className="text-blue-600 dark:text-blue-400 hover:underline">
            Start your free trial
          </Link>
        </p>
      </section>
    </main>
  );
}
