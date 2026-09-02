"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const awards = [
  { name: "Best BNPL Support - Spring 2025", color: "bg-emerald-500" },
  { name: "Top BNPL Performer - Spring 2025", color: "bg-blue-500" },
  { name: "Momentum Leader - Spring 2025", color: "bg-purple-500" },
  { name: "Easiest BNPL Setup - Spring 2025", color: "bg-orange-500" },
  { name: "Fastest Lease Approval - Spring 2025", color: "bg-cyan-500" },
  { name: "Most Trusted BNPL Platform - Spring 2025", color: "bg-pink-500" },
]

export function LandingAwards() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-normal tracking-tight md:text-4xl">
            The BNPL platform built for the physical economy
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Lease approval, payment collection, and portfolio management — all in one place.
          </p>
          <div className="mt-6">
            <Link href="/sign-in">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4">
          {awards.map((award, index) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
            >
              <div className={`h-2 w-2 rounded-full ${award.color}`} />
              <span className="text-xs font-medium text-muted-foreground">{award.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
