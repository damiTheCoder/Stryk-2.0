"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="relative mx-auto max-w-5xl px-4 md:px-8">
        {/* Top Right Floating Image */}
        <div className="absolute -top-10 right-4 sm:-top-8 sm:right-8 md:-top-6 md:right-16 lg:right-28 z-10">
          <Image
            src="/Memoji.png"
            alt="Memoji"
            width={56}
            height={56}
            className="size-10 sm:size-12 md:size-14 rounded-full border border-black object-cover"
          />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h1 className="text-4xl font-medium tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance max-w-4xl">
            The{" "}
            <span className="inline-block bg-primary text-black border border-black rounded-xl md:rounded-2xl px-3 sm:px-4 py-0.5 my-1">
              Installment
            </span>{" "}
            Plan Platform for the Physical Economy
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mt-2">
            Stryk is a complete installment plan platform where sellers onboard customers, set terms, and manage payments. Offer flexible payment plans at checkout and get paid instantly.
          </p>

          <div className="mt-4 flex justify-center">
            <Link href="/sign-in">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-lg font-semibold px-8 text-base">
                Get Started →
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
