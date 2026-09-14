"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function LandingIntegrations() {
  return (
    <section className="border-b overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-0 md:px-8 text-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="inline-block bg-primary text-black border border-black rounded-xl px-3.5 py-1 font-semibold">
              Vendor Dashboard
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Monitor installment plan activity, analytics, and lease performance from one unified dashboard.
          </p>
        </div>
        <div className="flex justify-center w-full leading-none">
          <Image
            src="/h5.png?v=4"
            alt="Vendor Dashboard"
            width={1200}
            height={675}
            unoptimized
            className="mx-auto max-w-full max-w-lg md:max-w-xl h-auto rounded-t-xl rounded-b-none block align-bottom mb-0"
          />
        </div>
      </div>
    </section>
  );
}
