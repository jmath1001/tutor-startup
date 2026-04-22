import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const pagePath = "/demo";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "Interactive Product Demo",
  description:
    "Preview Thetix in an interactive demo built for tutoring center scheduling, attendance tracking, reminders, and student records.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Interactive Product Demo | Thetix",
    description:
      "Explore an interactive walkthrough of tutoring center scheduling and operations in Thetix.",
    url: pageUrl,
    type: "website",
    images: [{ url: "/file.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Product Demo | Thetix",
    description:
      "Explore an interactive walkthrough of tutoring center scheduling and operations in Thetix.",
    images: ["/file.svg"],
  },
};

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
