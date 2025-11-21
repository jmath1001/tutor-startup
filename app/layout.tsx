import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor Terminal",
  description: "Scale your tutoring business — manage students, assign worksheets, and grow efficiently.",
  openGraph: {
    title: "Tutor Terminal",
    description: "Scale your tutoring business — manage students, assign worksheets, and grow efficiently.",
    url: "https://www.yoursite.com",
    siteName: "Tutor Terminal",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tutor Terminal",
    description: "Scale your tutoring business — manage students, assign worksheets, and grow efficiently.",
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Global Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
