'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, CheckCircle, Clock, FileText, Plus, Settings, 
  TrendingUp, XCircle, Calendar, UploadCloud, User 
} from "lucide-react";

export default function ContentSection() {
  // State to control the four-stage animation loop
  const [stage, setStage] = React.useState(0); // 0: Landing, 1: Progress, 2: Scheduling, 3: PDF/Module

  // Effect to manage the animation loop
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Time each stage is displayed (Slower transitions as requested)
    const stageDurations = [5000, 5500, 6000, 6500]; // 5s, 5.5s, 6s, 6.5s
    
    timeoutId = setTimeout(() => {
      // Cycle to the next stage (0 to 3)
      setStage((prev) => (prev + 1) % 4); 
    }, stageDurations[stage]);

    return () => clearTimeout(timeoutId);
  }, [stage]);

  // Variants for the content fade/slide transition
  // Transition duration increased from default (0.3s) to 0.7s for a smoother feel
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.7 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.7 } },
  };

  /* --- STAGE 0: TUTOR LANDING PAGE (MODIFIED) --- */
  const TutorLandingPageContent = (
    <motion.div 
      key="landing" 
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4 pt-1"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center text-blue-800 dark:text-blue-200 text-md font-semibold mt-1">AC</div>
        <div>
          <p className="font-medium text-lg">Alex Carter Tutoring</p>
          <p className="text-sm text-muted-foreground">Mathematics & ACT Prep Specialist</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-5 border-l-4 border-blue-400 pl-3">
        Unlock your full potential in Math and conquer the ACT with personalized,
        results-driven tutoring. Join my program and start achieving your academic goals.
      </p>

      <div className="mt-4 space-y-2">
        <h3 className="font-medium text-sm">Next Availability:</h3>
        <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-zinc-800">
          <div>
            <p className="text-sm font-medium">Session: Algebra II Review</p>
            <p className="text-xs text-muted-foreground">Wednesday, Nov 22 • 4:00 PM</p>
          </div>
          <motion.span 
            className="text-red-600 dark:text-red-400 font-medium text-xs px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
          >
            Book Now
          </motion.span>
        </div>
      </div>
      
      {/* Changed CTA to be more informational/business focused */}
      <button className="w-full text-sm px-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium mt-3 flex items-center justify-center gap-2 transition-colors duration-200 shadow-md">
        <Book className="w-4 h-4" /> 
        View Tutoring Services
      </button>
      {/* Changed bottom text to be contact focused */}
      <p className="text-xs text-center text-muted-foreground">Ready to book a session? <span className="text-blue-600 dark:text-blue-400 font-medium">Contact Alex Carter</span></p>
    </motion.div>
  );


  /* --- STAGE 1: STUDENT PROGRESS VIEW --- */
  const StudentProgressContent = (
    <motion.div 
      key="progress"
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
        <TrendingUp className="w-5 h-5" />
        <p className="font-medium text-sm">Module Progress Tracking</p>
      </div>
      
      <p className="font-medium text-sm">Geometry: Proofs & Axioms Status:</p>

      <div className="space-y-3">
        
        {/* Student 1: COMPLETED (Highlighted and Animated) */}
        <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-xl border dark:border-zinc-700 bg-green-50 dark:bg-green-900/10"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-sm font-semibold text-zinc-800">SA</div>
                    <span className="font-medium text-sm">Sarah Adams</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Completed</span>
                </div>
            </div>
            {/* Timestamp for completion */}
            <div className="ml-11 mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3"/>
                <span>Completed: 10:15 AM (Nov 20)</span>
            </div>
        </motion.div>
        
        {/* Student 2: ASSIGNED/PENDING (Static) */}
        <div className="p-3 rounded-xl border dark:border-zinc-700 opacity-60">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-sm font-semibold text-zinc-800">JC</div>
                    <span className="text-sm">James Clark</span>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs">Pending</span>
                </div>
            </div>
            {/* Timestamp for assignment */}
            <div className="ml-11 mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3"/>
                <span>Assigned: 4 days ago</span>
            </div>
        </div>
      </div>

      <motion.button 
        className="w-full text-xs px-3 py-2 rounded-xl bg-blue-600 text-white font-medium mt-4 flex items-center justify-center gap-2"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <User className="w-4 h-4" />
        View All Student Profiles
      </motion.button>
    </motion.div>
  );

  /* --- STAGE 2: SCHEDULING & CALENDAR ORGANIZATION --- */
  const SchedulingContent = (
    <motion.div 
      key="scheduling" 
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-red-500 dark:text-red-400">
        <Calendar className="w-5 h-5" />
        <p className="font-medium text-sm">Integrated Scheduling & Booking</p>
      </div>

      {/* Calendar View Header */}
      <div className="flex items-center justify-between font-medium text-sm">
        <button className="text-blue-600 dark:text-blue-400">{"<"}</button>
        <span>November 2025</span>
        <button className="text-blue-600 dark:text-blue-400">{">"}</button>
      </div>

      {/* Calendar Grid (Simplified) */}
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <span key={day} className="font-medium text-muted-foreground">{day}</span>
        ))}
        {Array(20).fill(0).map((_, i) => (
          <span key={`day-${i}`} className={`py-1 rounded-md ${i === 19 ? 'font-bold text-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-500 dark:text-zinc-400'}`}>
            {i + 1}
          </span>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-2 mt-4">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-500"/>
          Today (Nov 20)
        </h4>
        
        <motion.div 
            className="p-3 rounded-xl border dark:border-zinc-700 shadow-sm bg-red-50 dark:bg-red-900/10"
            animate={{ backgroundColor: ["#fef2f2", "#ffffff", "#fef2f2"] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <p className="text-sm font-medium">Session: James Clark</p>
            <p className="text-xs text-muted-foreground">5:00 PM - 6:00 PM (Calculus)</p>
        </motion.div>
      </div>

      <motion.button 
        className="w-full text-xs px-3 py-2 rounded-xl bg-red-600 text-white font-medium mt-3 flex items-center justify-center gap-2"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      >
        <Settings className="w-4 h-4" />
        Manage Availability
      </motion.button>
    </motion.div>
  );

  /* --- STAGE 3: PDF TO ONLINE MODULE / ASSIGN PDF --- */
  const PdfToModuleContent = (
    <motion.div 
      key="pdf-module" 
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
        <UploadCloud className="w-5 h-5" />
        <p className="font-medium text-sm">Content Transformation & Upload</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Upload Document (PDF, DOCX)</label>
        <div className="p-3 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl text-center bg-purple-50 dark:bg-purple-900/20">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <FileText className="w-4 h-4"/>
              Drag & drop your file here
            </p>
        </div>
      </div>

      {/* Animated File Upload State */}
      <motion.div 
        className="p-3 border rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-between relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {/* Progress Bar Layer */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "100%"] }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1.5 }}
          className="absolute inset-y-0 left-0 bg-blue-500/10"
        />
        
        <div className="flex items-center gap-3 z-10">
          <FileText className="w-5 h-5 text-purple-500" />
          <div>
            <p className="font-medium text-sm">Geometry_Practice_Final.pdf</p>
            <p className="text-xs text-muted-foreground">3.2 MB</p>
          </div>
        </div>
        
        {/* Status Checkmark */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 0.5, delay: 4 }}
            className="relative z-10 flex items-center gap-2 text-green-600 dark:text-green-400"
        >
            <CheckCircle className="w-4 h-4"/>
            <span className="text-xs font-medium">Uploaded</span>
        </motion.div>
      </motion.div>

      <motion.button 
        className="w-full text-sm px-3 py-3 rounded-xl bg-blue-600 text-white font-medium mt-3 flex items-center justify-center gap-2 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 4.3 }}
      >
        <Settings className="w-4 h-4"/>
        Convert to Interactive Module
      </motion.button>
      <button className="w-full text-xs px-3 py-2 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-medium mt-1 flex items-center justify-center gap-2 opacity-70">
        <FileText className="w-4 h-4"/>
        Assign as Original PDF
      </button>
    </motion.div>
  );


  // Determine which content to render based on the current stage
  const CurrentContent = React.useMemo(() => {
    switch (stage) {
      case 0: return TutorLandingPageContent;
      case 1: return StudentProgressContent;
      case 2: return SchedulingContent;
      case 3: return PdfToModuleContent;
      default: return null;
    }
  }, [stage]);

  // Determine the URL shown in the browser bar
  const currentUrl = React.useMemo(() => {
    switch (stage) {
        case 0: return "www.tutorly.com/alex-carter";
        case 1: return "www.tutorly.com/dashboard/progress";
        case 2: return "www.tutorly.com/dashboard/calendar";
        case 3: return "www.tutorly.com/dashboard/content-studio";
        default: return "www.tutorly.com/loading";
    }
  }, [stage]);

  // Determine the Title shown in the browser bar
  const currentTitle = React.useMemo(() => {
    switch (stage) {
        case 0: return "Alex Carter Tutoring";
        case 1: return "Student Progress";
        case 2: return "My Schedule";
        case 3: return "Content Studio";
        default: return "Dashboard";
    }
  }, [stage]);


  return (
    // Outer section for overall fade-in
    <motion.section 
      className="py-16 md:py-28"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION TITLE */}
        <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl lg:text-5xl text-center mx-auto">
          Your tutoring business, presented beautifully.
        </h2>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 items-center">

          {/* LEFT SIDE — Browser Window Preview (Fully Responsive) */}
          <div className="w-full flex justify-center md:justify-start">

            <div className="w-full max-w-sm sm:max-w-md rounded-xl overflow-hidden shadow-2xl border bg-white dark:bg-zinc-900">

              {/* Browser top bar */}
              <div className="flex items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b">
                <div className="flex items-center gap-2 mr-4 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* URL Bar */}
                <div className="flex items-center bg-white dark:bg-zinc-700 border rounded-full px-3 py-1 text-xs w-full min-w-0">
                  <span className="truncate text-zinc-500 dark:text-zinc-300">
                    {currentUrl}
                  </span>
                </div>
              </div>

              {/* Title Bar (Replaces Navbar/Tabs) */}
              <div className="flex items-center px-4 py-3 border-b bg-zinc-50 dark:bg-zinc-800">
                <span className="font-semibold text-sm truncate">
                  {currentTitle}
                </span>
              </div>

              {/* Animated Content Area */}
              <div className="p-4 border-b min-h-[350px] relative"> 
                <AnimatePresence mode="wait">
                  {CurrentContent}
                </AnimatePresence>
              </div>

              {/* SUBJECTS (Remains consistent across stages) */}
              <div className="p-4 space-y-2 border-b">
                <p className="text-sm font-medium">Subjects I Teach</p>

                <div className="flex flex-wrap gap-2">
                  {["Algebra 1", "Geometry", "Chemistry", "ACT Math"].map((subj) => (
                    <span
                      key={subj}
                      className="px-2 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              {/* CONTACT (Remains consistent across stages) */}
              <div className="p-4">
                <p className="text-sm font-medium">Contact</p>
                <p className="text-xs text-muted-foreground mt-1 leading-5">
                  Booking available with enrollment code. Parents may reach out to 
                  discuss goals and scheduling preferences.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — Text Info */}
          <div className="flex flex-col justify-center space-y-6">

            <p className="text-base text-muted-foreground">
              Every tutor receives a{" "}
              <span className="font-semibold text-accent-foreground">
                beautiful public website
              </span>{" "}
              instantly—complete with a bio, subjects, contact section, and booking options.
            </p>

            <p className="text-base text-muted-foreground">
              It becomes your official presence online.  
              Share the link anywhere. Parents can explore your services and students can join through your access code.
            </p>

            <div className="border-l-4 border-primary pl-4 space-y-2">
              <h4 className="font-medium text-sm">Organize time, track progress, and create content.</h4>
              <p className="text-sm text-muted-foreground">
                From scheduling client sessions to monitoring student module completion with timestamps, 
                our platform handles the logistics so you can focus on teaching.
              </p>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}