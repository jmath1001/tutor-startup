// This file customizes the home page components for individual tutors.
// You can override text, features, and steps here for the /home route.

export const tutorHeroContent = {
  title: "Run your tutoring business with less admin.",
  subtitle: "Scheduling, reminders, and student history for individual tutors—all in one place.",
  cta: "Access Portal",
  ctaHref: "/individual-portal",
  secondary: "See How It Works",
  secondaryHref: "/home#features",
  headerLinks: {
    logoHref:  "/home",
    primary:   { label: "Access Portal",    href: "/individual-portal", event: "nav_portal_click" },
    secondary: { label: "See How It Works", href: "/home#features",     event: "nav_features_click" },
  },
  highlights: [
    "Email students a form — they respond in one click",
    "Batch engine books your entire week automatically",
    "Zero scheduling conflicts, zero manual work",
    "Attendance, hours, and history all tracked for you",
  ],
  note: "Early access is free. No setup required.",
};

export const tutorFeatures = [
  {
    id: "send-form",
    label: "Send Forms Instantly",
    title: "Easily send forms to students",
    description: "Send out forms for students to fill out directly to their email. Includes auto notifications for upcoming sessions.",
    points: ["Send forms via email", "Auto session notifications", "No manual follow-up"],
    video: "/videos/individual-tutor/send-form.mp4",
  },
  {
    id: "student-form",
    label: "Student Form Completion",
    title: "Students fill out forms online",
    description: "Students receive a form by email and complete it online. All responses are organized for you.",
    points: ["Student receives email", "Easy online completion", "Responses organized"],
    video: "/videos/individual-tutor/student-form.mp4",
  },
  {
    id: "auto-schedule",
    label: "Auto-Scheduling",
    title: "Optimal schedule generation",
    description: "Automatically generate the most optimal schedule based on subjects and availability. Maximizes hours for group sessions.",
    points: ["Subject & availability input", "Optimal schedule", "Maximize group hours"],
    video: "/videos/individual-tutor/auto-schedule.mp4",
  },
  {
    id: "attendance",
    label: "Attendance Tracking",
    title: "Mark and organize attendance",
    description: "Weekly calendar view to mark attendance. Everything is saved and organized for you.",
    points: ["Weekly calendar view", "Attendance marking", "All records saved"],
    video: "/videos/individual-tutor/attendance.mp4",
  },
];

export const tutorMigrationSteps = [
  {
    number: "01",
    title: "Import your students",
    description: "Upload your student list or add them one by one. No technical skills required.",
    callout: "Start with your current roster.",
  },
  {
    number: "02",
    title: "Set your availability",
    description: "Block out your available times and let students book sessions that fit your schedule.",
    callout: "You control your calendar.",
  },
  {
    number: "03",
    title: "Go live instantly",
    description: "Share your booking link and start accepting sessions right away.",
    callout: "No setup delays.",
  },
  {
    number: "04",
    title: "Track and grow",
    description: "Monitor attendance, keep notes, and grow your tutoring business with less admin.",
    callout: "Focus on teaching, not paperwork.",
  },
];

export const tutorCredibility = {
  headline: "Built for individual tutors",
  description: "Most tutors lose time to admin, reminders, and tracking. Thetix gives you a professional system to run your business solo—no spreadsheets required.",
  painPoints: [
    "Manual scheduling and reminders",
    "Lost session notes and history",
    "No-shows and late cancellations",
    "Unprofessional booking experience",
  ],
};

export const tutorCTA = {
  headline: "Access your portal",
  description: "Enter your email to access your personalized Thetix portal for individual tutors.",
  cta: "Access Portal",
  ctaHref: "/individual-portal",
  secondary: "",
};