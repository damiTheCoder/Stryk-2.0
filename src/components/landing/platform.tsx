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
    image: "/h1.jpeg",
  },
  {
    number: "02",
    title: "Get Paid Instantly",
    subtitle: "Stop waiting for payments.",
    description: "Stryk can buy your payment plans at a discount, giving you instant liquidity.",
    href: "#how-it-works",
    image: "/h2.jpeg",
  },
  {
    number: "03",
    title: "Built for the Physical Economy",
    subtitle: "Real devices. Real payments.",
    description: "Stryk is purpose-built for tangible assets — smartphones, laptops, tablets, and more — with terms and payments tailored to each purchase.",
    href: "#sellers",
    image: "/h3.jpeg",
  },
  {
    number: "04",
    title: "From Checkout to Closed",
    subtitle: "A complete installment plan lifecycle.",
    description: "Seller creates the plan → customer pays over time → Stryk handles servicing and collections → plan closes automatically.",
    href: "#how-it-works",
    image: "/h4.jpeg",
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
            The{" "}
            <span className="inline-block bg-primary text-black border border-black rounded-lg md:rounded-xl px-2.5 py-0.5 font-normal my-0.5">
              Installment
            </span>{" "}
            Plan Platform for the Physical Economy
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Stryk lets sellers offer flexible payments at checkout, manage payment plans, and get paid faster — all in one place.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-black bg-card/60 p-6 md:p-8 overflow-hidden transition-all hover:shadow-md dark:border-neutral-700 dark:bg-card/40"
            >
              <div className="flex flex-col gap-5">
                <div className="-mt-6 -mx-6 md:-mt-8 md:-mx-8 overflow-hidden border-b border-black/10 dark:border-white/10 bg-background/50">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={220}
                    unoptimized
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex items-start justify-between gap-3 pt-1">
                  <h3 className="text-lg font-semibold tracking-tight leading-snug">{feature.title}</h3>
                  <Link href={feature.href} className="shrink-0 rounded-lg border border-black/10 p-2 hover:bg-muted transition-colors dark:border-white/10">
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/80">{feature.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>

              <div className="pt-6 mt-auto">
                <Link href="/sign-in">
                  <Button className="gap-1.5 bg-primary text-black hover:bg-primary/90 rounded-xl font-semibold px-4 py-2 text-sm shadow-xs transition-colors">
                    Get Started <ArrowRightIcon className="size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
