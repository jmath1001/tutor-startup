import type { Metadata } from "next";

import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Thetix | Tutor Scheduling for Individuals",
    template: "%s | Thetix",
  },
  description:
    "Scheduling and operations software for individual tutors. Manage your students, automate reminders, reduce no-shows, and track session history.",
  keywords: [
    "tutor scheduling software",
    "individual tutor software",
    "student scheduling",
    "attendance tracking",
    "tutor operations",
    "education platform",
  ],
  openGraph: {
    title: "Thetix | Tutor Scheduling for Individuals",
    description:
      "Run your tutoring business in one place: scheduling, reminders, attendance, and student history.",
    type: "website",
    images: [
      {
        url: "/file.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thetix | Tutor Scheduling for Individuals",
    description:
      "Manage your tutor schedule, reminders, attendance, and student history in one system.",
    images: ["/file.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function TutorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </div>
    </ThemeProvider>
  );
}
