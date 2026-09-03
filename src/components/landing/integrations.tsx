"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function LandingIntegrations() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 pt-12 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Vendor Dashboard</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Monitor BNPL activity, analytics, and lease performance from one unified dashboard.
          </p>
        </div>
         <Image src="/h5.png" alt="Stryk" width={1200} height={675} className="mx-auto max-w-full max-w-lg md:max-w-xl h-auto rounded-xl" />
      </div>
    </section>
  );
}
