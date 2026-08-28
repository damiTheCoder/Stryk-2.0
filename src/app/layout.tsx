import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeaseAgreementProvider } from "@/contexts/lease-agreement-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stryk2-0.vercel.app"),
  title: "Stryk 2.0 — Lease Portfolio Management",
  description: "A premium lease-to-own platform built with Next.js, shadcn/ui, and Tailwind CSS.",
  openGraph: {
    title: "Stryk 2.0 — Lease Portfolio Management",
    description: "A premium lease-to-own platform built with Next.js, shadcn/ui, and Tailwind CSS.",
    type: "website",
    url: "https://stryk2-0.vercel.app",
    images: [{ url: "/screenshots/shadcn-fintech.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stryk 2.0 — Lease Portfolio Management",
    description: "A premium lease-to-own platform built with Next.js, shadcn/ui, and Tailwind CSS.",
    images: ["/screenshots/shadcn-fintech.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange scriptProps={false}>
          <LeaseAgreementProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </LeaseAgreementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
