import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"; // Adjusted import to standard Vercel package

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetix.dev";

export const metadata: Metadata = {
  title: {
    default: "Thetix | Tutoring Center Scheduling Software",
    template: "%s | Thetix",
  },
  description:
    "Scheduling and operations software for tutoring centers. Manage tutors and students, automate reminders, reduce no-shows, and track session history.",
  keywords: [
    "tutoring scheduling software",
    "tutoring center software",
    "tutor management",
    "student scheduling",
    "attendance tracking",
    "tutoring operations",
    "education scheduling platform",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Thetix | Tutoring Center Scheduling Software",
    description:
      "Run tutoring operations in one place: scheduling, reminders, attendance, and student history.",
    url: siteUrl,
    siteName: "Thetix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thetix | Tutoring Center Scheduling Software",
    description:
      "Manage tutor schedules, reminders, attendance, and student history in one system.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}