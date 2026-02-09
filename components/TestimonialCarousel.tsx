'use client';

import React from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Director, Eastside Tutoring",
    content: "We went from 15 Excel tabs and constant confusion to one clean dashboard. Game changer.",
    rating: 5,
    company: "Eastside Tutoring"
  },
  {
    name: "Marcus Williams",
    role: "Owner, Elite Learning Center",
    content: "The migration took 2 hours and saved us 10+ hours weekly. Worth every penny.",
    rating: 5,
    company: "Elite Learning"
  },
  {
    name: "Jessica Rodriguez",
    role: "Operations Manager, StudyHub",
    content: "No more 'who's available?' texts at 10pm. Everything syncs automatically.",
    rating: 5,
    company: "StudyHub"
  },
  {
    name: "David Park",
    role: "Founder, Peak Academics",
    content: "Scheduling conflicts dropped 90%. Our tutors actually know where they need to be.",
    rating: 5,
    company: "Peak Academics"
  },
  {
    name: "Amanda Foster",
    role: "Director, SmartStart Tutoring",
    content: "Best decision we made this year. The ROI was immediate.",
    rating: 5,
    company: "SmartStart"
  },
  {
    name: "James Mitchell",
    role: "Owner, Catalyst Learning",
    content: "Simple, powerful, and actually works. No fluff, just results.",
    rating: 5,
    company: "Catalyst Learning"
  },
  {
    name: "Rachel Kim",
    role: "Director, Apex Tutoring",
    content: "Our admin team saves 15+ hours per week. The system pays for itself.",
    rating: 5,
    company: "Apex Tutoring"
  },
  {
    name: "Michael Torres",
    role: "Owner, Bright Minds Academy",
    content: "Finally, a system built for tutoring centers. Not adapted from something else.",
    rating: 5,
    company: "Bright Minds"
  }
];

export default function TestimonialCarousel() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Trusted by Tutoring Centers Nationwide
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See what other directors and owners are saying about making the switch
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="flex animate-infinite-scroll">
          {/* Duplicate testimonials for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[380px] mx-3 p-6 bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{testimonial.name}</p>
                  <p className="text-xs text-slate-500 truncate">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />

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
          animation: infinite-scroll 50s linear infinite;
        }
      `}</style>
    </section>
  );
}