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

export const metadata: Metadata = {
  title: "Thetix | Agency Scheduling Engine",
  description: "The high-performance scheduling and matching engine for tutoring agencies. Stop the spreadsheet hunt.",
  metadataBase: new URL('https://thetix.dev'),
  openGraph: {
    title: "Thetix | Agency Command Engine",
    description: "Scale your tutoring agency without the manual chaos. Precision matching and scheduling.",
    url: "https://thetix.dev",
    siteName: "Thetix",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in your /public folder for Discord/Twitter previews
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thetix | Agency Command Engine",
    description: "The high-performance scheduling and matching engine for tutoring agencies.",
  },
  icons: {
    icon: "/favicon.ico", // Or /icon.png
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
          defaultTheme="light" // Set to light if you want that high-contrast white look by default
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