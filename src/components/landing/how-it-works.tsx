"use client";

import { motion } from "motion/react";

const steps = [
  {
    step: "01",
    title: "Create a Plan",
    text: "Seller onboards a customer, configures device price, term length, and payment frequency.",
  },
  {
    step: "02",
    title: "Customer Signs",
    text: "The customer reviews and signs the agreement online. No paperwork, no manual underwriting.",
  },
  {
    step: "03",
    title: "Get Paid",
    text: "Stryk can buy the payment plan at a discount, giving the seller instant liquidity while the customer pays over time.",
  },
  {
    step: "04",
    title: "Servicing & Closure",
    text: "Stryk manages collections and customer service. Once the plan is complete, the account is closed automatically.",
  },
]

export function LandingHowItWorks() {
  return (
    <section className="border-b" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-medium text-muted-foreground">HOW IT WORKS</span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            From Checkout to Closed
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            One platform. One flow. A complete Buy Now Pay Later lifecycle for physical goods.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-muted/40 p-6"
            >
              <div className="text-sm font-medium text-primary mb-2">{item.step}</div>
              <h3 className="text-lg font-normal">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
