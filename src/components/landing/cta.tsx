"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function LandingCta() {
  return (
    <section className="relative border-b overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/h6.jpeg"
          alt=""
          fill
          className="object-cover blur-sm"
          priority={false}
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-normal tracking-tight md:text-4xl">
            Ready to offer Buy Now Pay Later at checkout?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/sign-in">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
