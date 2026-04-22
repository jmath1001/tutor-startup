import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const pagePath = "/book-demo";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "Book A Demo",
  description:
    "Schedule a tailored demo of Thetix for your tutoring center. See centralized scheduling, reminders, attendance, and student history workflows.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Book A Demo | Thetix",
    description:
      "Book a personalized walkthrough for your tutoring center and see how Thetix improves scheduling operations.",
    url: pageUrl,
    type: "website",
    images: [{ url: "/file.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book A Demo | Thetix",
    description:
      "Book a personalized walkthrough for your tutoring center and see how Thetix improves scheduling operations.",
    images: ["/file.svg"],
  },
};

export default function BookDemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
