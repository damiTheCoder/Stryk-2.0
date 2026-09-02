"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cards = [
  {
    icon: "🚀",
    title: "No Integration.",
    text: "Sign up and start. No developers. No payment provider integration.",
  },
  {
    icon: "🧑‍💼",
    title: "Own Your Customer.",
    text: "You set the terms and keep the customer data. We just provide the platform.",
  },
  {
    icon: "💸",
    title: "Get Paid Instantly.",
    text: "Stop waiting months. Stryk can buy your payment plans at a discount, providing instant liquidity.",
  },
]

export function LandingSellers() {
  return (
    <section className="border-b" id="sellers">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium text-muted-foreground">FOR SELLERS</span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            Sell More. Get Paid Faster.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The complete BNPL platform built for any seller.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-muted/40 p-6"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-normal">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/get-started">
            <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-lg">
              Start Your Free Trial →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
