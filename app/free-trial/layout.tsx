import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const pagePath = "/free-trial";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "Join Pilot",
  description:
    "Join the Thetix pilot to reduce no-shows, speed up rescheduling, and centralize tutoring operations for your center.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Join Pilot | Thetix",
    description:
      "Apply for pilot access and validate centralized scheduling and operations for your tutoring center.",
    url: pageUrl,
    type: "website",
    images: [{ url: "/file.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Pilot | Thetix",
    description:
      "Apply for pilot access and validate centralized scheduling and operations for your tutoring center.",
    images: ["/file.svg"],
  },
};

export default function FreeTrialLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
