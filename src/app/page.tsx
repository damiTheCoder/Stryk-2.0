import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LandmarkIcon, StoreIcon, FileTextIcon, DollarSignIcon, ArrowRightIcon, ShieldCheckIcon } from "lucide-react"
import { USDCIcon } from "@/components/ui/usdc-icon"

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <LandmarkIcon className="size-7" />
          </div>
          <div className="mx-auto max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Stablecoin Lease-to-Own Infrastructure
            </h1>
            <p className="text-lg text-muted-foreground">
              Enable lease-to-own for your customers in minutes. Get paid instantly in <span className="inline-flex items-center gap-1"><USDCIcon /></span> with automated installment processing and risk management.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth/register">
              <Button size="lg">
                Start Onboarding <ArrowRightIcon className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            <Card className="text-left">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileTextIcon className="size-5" />
                </div>
                <CardTitle className="text-base">Lease Structuring</CardTitle>
                <CardDescription>
                  Configure down payments, tenures, and payment schedules for any consumer electronics.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DollarSignIcon className="size-5" />
                </div>
                <CardTitle className="text-base">USDC Settlements</CardTitle>
                <CardDescription>
                  Automated stablecoin debit processing and instant payouts to your corporate wallet.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheckIcon className="size-5" />
                </div>
                <CardTitle className="text-base">Risk & Ledger</CardTitle>
                <CardDescription>
                  Credit scoring, default monitoring, and complete ledger management for every agreement.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
