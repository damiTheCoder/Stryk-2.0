import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeaseAgreementProvider } from "@/contexts/lease-agreement-context";
import { PageTransition } from "@/components/page-transition";
import { Suspense } from "react";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stryk2-0.vercel.app"),
  title: {
    default: "Stryk 2.0 — Buy Now Pay Later Portfolio Management",
    template: "%s | Stryk 2.0",
  },
  description: "A premium Buy Now Pay Later platform built with Next.js, shadcn/ui, and Tailwind CSS.",
  icons: [
    { rel: "icon", url: "/LO.png", type: "image/png" },
    { rel: "apple", url: "/LO.png", type: "image/png" },
  ],
  openGraph: {
    title: "Stryk 2.0 — Buy Now Pay Later Portfolio Management",
    description: "A premium Buy Now Pay Later platform built with Next.js, shadcn/ui, and Tailwind CSS.",
    type: "website",
    url: "https://stryk2-0.vercel.app",
    images: [{ url: "/LO.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stryk 2.0 — Buy Now Pay Later Portfolio Management",
    description: "A premium Buy Now Pay Later platform built with Next.js, shadcn/ui, and Tailwind CSS.",
    images: ["/LO.png"],
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
        className={`${geistMono.variable} h-full antialiased font-sans overflow-x-hidden`}
        suppressHydrationWarning
      >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <LeaseAgreementProvider>
            <TooltipProvider>
              {children}
              <Suspense fallback={null}>
                <PageTransition />
              </Suspense>
            </TooltipProvider>
          </LeaseAgreementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
