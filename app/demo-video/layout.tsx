import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const pagePath = "/demo-video";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  title: "Demo Video",
  description:
    "Watch a short product walkthrough showing how Thetix helps tutoring centers run scheduling and daily operations from one platform.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Demo Video | Thetix",
    description:
      "Watch how Thetix simplifies tutoring center scheduling, reminders, and student operations.",
    url: pageUrl,
    type: "video.other",
    images: [{ url: "/file.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Video | Thetix",
    description:
      "Watch how Thetix simplifies tutoring center scheduling, reminders, and student operations.",
    images: ["/file.svg"],
  },
};

export default function DemoVideoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
