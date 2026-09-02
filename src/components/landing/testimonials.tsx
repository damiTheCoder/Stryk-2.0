"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Founder, TechRetail",
    content: "Stryk lets us offer Buy Now Pay Later at checkout without any integration. Our customers get flexible payments, and we get paid instantly.",
    avatar: "AC",
  },
  {
    name: "Sarah Johnson",
    role: "CFO, MobileHub",
    content: "We increased conversion by 40% after switching to Stryk. The onboarding was fast and the platform is reliable.",
    avatar: "SJ",
  },
  {
    name: "Marcus Williams",
    role: "Head of E-commerce, GadgetWorld",
    content: "Our customers love the flexibility and we love getting paid faster. Stryk made Buy Now Pay Later simple for our team.",
    avatar: "MW",
  },
]

export function LandingTestimonials() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-muted-foreground">05 TRUST</span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
            Trusted by sellers
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-sm font-medium">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-normal text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
