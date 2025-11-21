"use client";

import React, { useState, useEffect } from "react";
import { Calendar, TrendingUp, Users, DollarSign, Bell, Clock, Cpu, UserPlus, Copy, Check } from "lucide-react";

// --- Enrollment Code Generator ---
const EnrollmentCodeGenerator = () => {
  const [code, setCode] = useState("GENERATE CODE");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsGenerating(true);
    setCode("...");
    
    const generateTimeout = setTimeout(() => {
      const newCode = (Math.random() * 1e6).toFixed(0).padStart(6, '0');
      setCode(newCode.slice(0, 3) + "-" + newCode.slice(3, 6));
      setIsGenerating(false);
    }, 1500);

    return () => clearTimeout(generateTimeout);
  }, []);
  
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="rounded-lg border bg-blue-50 dark:bg-blue-900/30 p-4 mt-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <UserPlus className="w-4 h-4" /> Student Enrollment Code
        </h4>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex-1 px-3 py-2 rounded-md font-mono border text-center ${isGenerating ? 'bg-muted animate-pulse' : 'bg-white dark:bg-black/50 font-bold text-lg'}`}>
          {code}
        </div>
        <button 
          onClick={handleCopy}
          disabled={isGenerating}
          className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${
            isCopied 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50`}
        >
          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
        Share this code with new students for instant enrollment.
      </p>
    </div>
  );
};

// --- MAIN HeroDemo COMPONENT ---
export function HeroDemo() {
  const [studentCount, setStudentCount] = useState(18);
  const [revenue, setRevenue] = useState(2450);
  const [activeTab, setActiveTab] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Animate numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setStudentCount(prev => (prev === 24 ? 18 : prev + 1));
      setRevenue(prev => (prev >= 2800 ? 2450 : prev + 50));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through tabs with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setActiveTab(prev => (prev + 1) % 3);
        setFadeOut(false);
      }, 300); // Half of transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const upcomingSessions = [
    { student: "Sarah J.", subject: "Math", time: "3:00 PM", color: "bg-blue-500" },
    { student: "Mike K.", subject: "Physics", time: "4:30 PM", color: "bg-purple-500" },
    { student: "Emma L.", subject: "Chemistry", time: "6:00 PM", color: "bg-green-500" }
  ];

  const performanceMetrics = [
    { label: 'Session Completion', value: 94, color: 'bg-green-500' },
    { label: 'Student Satisfaction', value: 98, color: 'bg-blue-500' },
    { label: 'Revenue Growth', value: 87, color: 'bg-purple-500' }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto mt-12 mb-12"> 
      {/* Floating Badges */}
      <div className="absolute -top-10 -left-1 z-20 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm shadow-xl">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>Live Demo</span>
      </div>

      <div className="absolute -top-10 right-0 z-20 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm shadow-xl">
        <Cpu className="w-4 h-4 text-purple-500" />
        <span>Auto Grade AI</span>
      </div>
      
      {/* Floating notification cards */}
      <div className="absolute -top-20 -left-20 w-48 rounded-lg border bg-background/95 backdrop-blur-xl p-3 shadow-lg hidden lg:block z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="text-xs font-medium">Payment Received</div>
            <div className="text-xs text-muted-foreground">$120 from Sarah</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-52 rounded-lg border bg-background/95 backdrop-blur-xl p-3 shadow-lg hidden lg:block z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-medium">New Booking</div>
            <div className="text-xs text-muted-foreground">Tomorrow at 3:00 PM</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Card */}
      <div className="relative rounded-2xl border bg-background/95 backdrop-blur-xl p-6 shadow-2xl overflow-hidden min-h-[500px] flex flex-col"> 
        
        {/* Header - no tabs, just title */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h3 className="text-lg font-semibold">Dashboard</h3>
          <div className="flex gap-1">
            {['Overview', 'Schedule', 'Analytics'].map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTab === idx ? 'bg-primary w-6' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 flex-shrink-0">
          <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 p-4">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-500">
              {studentCount}
            </div>
            <div className="text-sm text-muted-foreground">Active Students</div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
          </div>
          
          <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 p-4">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-500">
              ${revenue}
            </div>
            <div className="text-sm text-muted-foreground">This Month</div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Dynamic Content with Fade Transition */}
        <div className="space-y-3 flex-grow relative">
          <div 
            className={`transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            style={{ position: 'absolute', width: '100%' }}
          >
          
            {/* Tab 0: Overview */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium mb-3">
                  <span>Recent Activity</span>
                  <Bell className="w-4 h-4 text-muted-foreground" />
                </div>
                {['Payment received from Sarah J.', 'Progress report sent', 'Module completed by Leo T.'].map((activity, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm flex-1">{activity}</span>
                    <span className="text-xs text-muted-foreground">{idx + 1}m ago</span>
                  </div>
                ))}
                <EnrollmentCodeGenerator />
              </div>
            )}

            {/* Tab 1: Schedule */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium mb-3">
                  <span>Upcoming Sessions</span>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                {upcomingSessions.map((session, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border bg-muted/50 p-3"
                  >
                    <div className={`w-2 h-2 rounded-full ${session.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{session.subject} - {session.student}</div>
                      <div className="text-xs text-muted-foreground">{session.time}</div>
                    </div>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-lg border bg-primary/10">
                  <span className="text-sm font-medium text-primary">View Full Calendar</span>
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
              </div>
            )}

            {/* Tab 2: Analytics */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium mb-3">
                  <span>Performance</span>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {performanceMetrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full ${metric.color} transition-all duration-1000`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg border bg-yellow-50 dark:bg-yellow-900/30">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    <strong>Insight:</strong> Revenue is up 8% this quarter, driven by a 15% increase in students using the new Algebra Module.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Glowing effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse hidden lg:block" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse hidden lg:block" style={{ animationDelay: '1s' }} />
    </div>
  );
}