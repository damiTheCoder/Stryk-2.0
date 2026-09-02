"use client";

import { motion } from "motion/react";

const stats = [
  {
    value: "70%+",
    label: "of sellers lose customers at checkout due to lack of financing options",
  },
  {
    value: "3x",
    label: "higher conversion when flexible payment options are available",
  },
]

export function LandingProblem() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium text-muted-foreground">THE PROBLEM</span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            The Infrastructure for a Broken Market
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Offering Buy Now, Pay Later shouldn&apos;t require months of integration, heavy compliance work, or waiting 30+ days to get paid. Stryk fixes that end to end.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-muted/40 p-8 text-center"
            >
              <div className="text-5xl font-bold tracking-tight text-primary">{stat.value}</div>
              <p className="mt-4 text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
