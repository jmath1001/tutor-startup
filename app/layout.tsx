import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"; // Adjusted import to standard Vercel package
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const siteName = "Thetix";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/file.svg`,
  description:
    "Scheduling and operations software for tutoring centers. Manage tutors and students, automate reminders, reduce no-shows, and track session history.",
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${siteName} Tutoring Center Scheduling Software`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "A centralized tutoring operations platform for scheduling, reminders, attendance tracking, and student history.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

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
    siteName,
    type: "website",
    images: [
      {
        url: "/file.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thetix | Tutoring Center Scheduling Software",
    description:
      "Manage tutor schedules, reminders, attendance, and student history in one system.",
    images: ["/file.svg"],
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}