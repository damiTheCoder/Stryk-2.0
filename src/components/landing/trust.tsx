"use client";

import { motion } from "motion/react";

const logos = [
  { name: "Function", color: "#000000" },
  { name: "Mercor", color: "#000000" },
  { name: "Temporal", color: "#000000" },
  { name: "Juicebox", color: "#000000" },
  { name: "Monarch", color: "#000000" },
  { name: "Scribe", color: "#000000" },
  { name: "Sotheby's", color: "#000000" },
  { name: "Kickstarter", color: "#000000" },
  { name: "Foursquare", color: "#000000" },
  { name: "Omni", color: "#000000" },
  { name: "Gamma", color: "#000000" },
  { name: "LangChain", color: "#000000" },
]

export function LandingTrust() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-sm font-medium text-muted-foreground"
        >
          Trusted by industry leaders:
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <div
                className="h-8 w-24 rounded-md bg-muted/50 flex items-center justify-center text-xs font-medium"
                style={{ color: logo.color }}
              >
                {logo.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
