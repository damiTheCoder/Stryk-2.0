"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl font-medium tracking-tighter md:text-5xl lg:text-6xl text-pretty">
              The Buy Now, Pay Later Platform for the Physical Economy
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center gap-6"
          >
            <p className="text-xl text-muted-foreground text-balance">
              Stryk is a complete BNPL platform where sellers onboard customers, set terms, and manage payments. Offer flexible payments at checkout and get paid instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-in">
                <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-lg">
                  Get Started →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
