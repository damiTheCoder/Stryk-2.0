import Image from "next/image"
import { LandingHeader } from "@/components/landing-header"
import { LandingHero } from "@/components/landing/hero"
import { LandingPlatform } from "@/components/landing/platform"
import { LandingIntegrations } from "@/components/landing/integrations"
import { LandingTestimonials } from "@/components/landing/testimonials"
import { LandingAwards } from "@/components/landing/awards"
import { LandingCta } from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader />
      <main className="flex flex-1 flex-col">
        <LandingHero />
        <section className="mx-auto w-full max-w-7xl px-4 py-12 md:max-w-screen-2xl md:px-8">
          <Image src="/simage.png" alt="Stryk Analytics" width={1200} height={675} className="mx-auto max-w-4xl h-auto rounded-xl shadow-sm" />
        </section>
        <LandingPlatform />
        <LandingIntegrations />
        <LandingTestimonials />
        <LandingAwards />
        <LandingCta />
      </main>
      <Footer />
    </div>
  )
}
