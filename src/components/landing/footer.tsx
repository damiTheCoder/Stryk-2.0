"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "motion/react";

import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "Sellers", href: "#sellers" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Blog", href: "#blog" },
    { name: "Docs", href: "#docs" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Cookie Policy", href: "#cookies" },
  ]

  return (
    <footer className="w-full bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
            >
              <Image src="/brand-logo.png" alt="Stryk" width={28} height={28} className="size-7 rounded-full border border-black dark:border-black object-contain" />
              <span>STRYK</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              hello@stryk.finance
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <div className="flex flex-col gap-2">
              {links.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <div className="flex flex-col gap-2">
              {links.slice(4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="#terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link>
              <Link href="#privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link>
              <Link href="#cookies" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
        </motion.div>

        <Separator className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <span>© {year} STRYK. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
