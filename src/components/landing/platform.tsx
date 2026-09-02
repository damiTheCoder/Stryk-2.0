"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

const features = [
  {
    number: "01",
    title: "For Sellers",
    subtitle: "Onboard customers. Set your terms.",
    description: "Create payment plans in minutes. No developers, no payment provider integrations. You own the customer relationship and data.",
    href: "#sellers",
  },
  {
    number: "02",
    title: "Get Paid Instantly",
    subtitle: "Stop waiting for payments.",
    description: "Stryk can buy your payment plans at a discount, giving you instant liquidity.",
    href: "#how-it-works",
  },
  {
    number: "03",
    title: "Built for the Physical Economy",
    subtitle: "Real devices. Real payments.",
    description: "Stryk is purpose-built for tangible assets — smartphones, laptops, tablets, and more — with terms and payments tailored to each purchase.",
    href: "#sellers",
  },
  {
    number: "04",
    title: "From Checkout to Closed",
    subtitle: "A complete BNPL lifecycle.",
    description: "Seller creates the plan → customer pays over time → Stryk handles servicing and collections → plan closes automatically.",
    href: "#how-it-works",
  },
]

export function LandingPlatform() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-muted-foreground">01 PLATFORM</span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            The Buy Now, Pay Later Platform for the Physical Economy
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Stryk lets sellers offer flexible payments at checkout, manage payment plans, and get paid faster — all in one place.
          </p>
        </motion.div>

        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col rounded-none border border-black bg-muted/40 px-6 pt-6 transition-all hover:shadow-none dark:border-neutral-600"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-base font-normal leading-snug">{feature.title}</h3>
                <Link href={feature.href} className="mt-1 shrink-0 rounded-md border p-1.5">
                  <ArrowUpRightIcon className="size-4" />
                </Link>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{feature.subtitle}</p>
              <p className="mb-6 text-sm text-muted-foreground">{feature.description}</p>
              <div>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto text-sm">
                    Get Started <ArrowRightIcon className="size-3.5" />
                  </Button>
                </Link>
              </div>
              <Image
                src={`/h${parseInt(feature.number, 10)}.png`}
                alt=""
                width={400}
                height={200}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
