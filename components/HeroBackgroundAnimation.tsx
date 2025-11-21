"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, TrendingUp, UserPlus, Copy, Check, Calendar, CreditCard } from "lucide-react";

export function HeroBackgroundAnimation() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [revenue, setRevenue] = useState(2450);
  const [students, setStudents] = useState(12);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate revenue counting up
  useEffect(() => {
    if (activeFeature === 0) {
      const timer = setTimeout(() => {
        if (revenue < 4850) {
          setRevenue((prev) => prev + 150);
          setStudents((prev) => Math.min(prev + 1, 18));
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setRevenue(2450);
      setStudents(12);
    }
  }, [revenue, activeFeature]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Smaller, responsive card container
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[500px] pointer-events-none">
      <div className="w-full">
        {/* Feature 1 */}
        {activeFeature === 0 && (
          <div className="animate-in fade-in duration-700">
            <div className="rounded-2xl border-2 border-primary/20 bg-background p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Revenue Dashboard</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-sm font-semibold text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  LIVE
                </div>
              </div>

              <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Monthly Revenue
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-green-600">${revenue.toLocaleString()}</span>
                  <span className="text-sm font-bold text-green-600">
                    +{Math.round((revenue - 2450) / 2450 * 100)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold">{students}</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
                  <div className="text-2xl font-bold">{students * 4}</div>
                  <div className="text-sm text-muted-foreground">Sessions Booked</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature 2 */}
        {activeFeature === 1 && (
          <div className="animate-in fade-in duration-700">
            <div className="rounded-2xl border-2 border-primary/20 bg-background p-6 shadow-lg text-sm">
              <h3 className="text-lg font-bold mb-2">This Week's Schedule</h3>
              <div className="space-y-2">
                {[
                  { day: "Mon", time: "4 PM", student: "Sarah J.", subject: "Calculus", earnings: 85 },
                  { day: "Wed", time: "3:30 PM", student: "Mike K.", subject: "Physics", earnings: 75 },
                  { day: "Thu", time: "5 PM", student: "Emma L.", subject: "Chemistry", earnings: 80 },
                  { day: "Sat", time: "10 AM", student: "Leo T.", subject: "ACT Prep", earnings: 120 },
                ].map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-muted/20">
                    <div>{s.day} • {s.time} • {s.student} - {s.subject}</div>
                    <div className="font-bold text-green-600">${s.earnings}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature 3 */}
        {activeFeature === 2 && (
          <div className="animate-in fade-in duration-700">
            <div className="rounded-2xl border-2 border-primary/20 bg-background p-6 shadow-lg text-sm">
              <h3 className="text-lg font-bold mb-2">Instant Student Enrollment</h3>
              <div className="flex gap-2">
                <div className="flex-1 p-2 rounded-lg border border-blue-500 font-mono text-xl text-center tracking-widest">
                  MTH-947
                </div>
                <button
                  onClick={handleCopy}
                  className={`p-2 rounded-lg text-white ${
                    copied ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature 4 */}
        {activeFeature === 3 && (
          <div className="animate-in fade-in duration-700">
            <div className="rounded-2xl border-2 border-primary/20 bg-background p-6 shadow-lg text-sm">
              <h3 className="text-lg font-bold mb-2">Automatic Payments</h3>
              <div className="space-y-1">
                {[
                  { student: "Sarah Johnson", amount: 320 },
                  { student: "Mike Chen", amount: 240 },
                  { student: "Emma Wilson", amount: 400 },
                  { student: "Alex Rodriguez", amount: 160 },
                ].map((p, idx) => (
                  <div key={idx} className="flex justify-between p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <span>{p.student}</span>
                    <span className="font-bold text-green-600">${p.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
