'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/trackEvent';

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
    orgType: 'individual', // 'individual' or 'center'
    studentCount: '',
    tutorCount: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    await trackEvent('book_demo_submit_click');
    setLoading(true);

    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([formData]);

      if (error) {
        console.error('Supabase error:', error);
        setErrorMessage('We could not submit right now. Please try again in a minute.');
        await trackEvent('book_demo_submit_failed', { message: error.message });
        setLoading(false);
        return;
      }

      await trackEvent('book_demo_submitted', {
        email_domain: formData.email.includes('@') ? formData.email.split('@')[1] : 'unknown',
      });
      setSubmitted(true);
      setLoading(false);

      // Reset form after 2 seconds
      setTimeout(() => {
              setFormData({ name: '', email: '', company: '', notes: '', orgType: 'individual', studentCount: '', tutorCount: '' });
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong submitting the form. Please try again.');
      await trackEvent('book_demo_submit_failed', { message: 'unexpected_exception' });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 flex flex-col items-center">
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
            className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-xl shadow-xl flex flex-col gap-4"
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
            <select
              name="orgType"
              value={formData.orgType}
              onChange={handleChange}
              required
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="individual">Solo Tutor</option>
              <option value="center">Tutoring Center</option>
            </select>
            <input
              type="number"
              name="studentCount"
              placeholder="Number of Students"
              value={formData.studentCount}
              onChange={handleChange}
              min="1"
              required
              className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.orgType === 'center' && (
              <input
                type="number"
                name="tutorCount"
                placeholder="Number of Tutors"
                value={formData.tutorCount}
                onChange={handleChange}
                min="1"
                required
                className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
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

            {!!errorMessage && <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>}
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
          Need faster validation?{' '}
          <Link
            href="/free-trial"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => trackEvent('book_demo_join_pilot_click')}
          >
            Join pilot
          </Link>
        </p>
      </section>
    </main>
  );
}
