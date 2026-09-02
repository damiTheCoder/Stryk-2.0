"use client"

import { SmartphoneIcon, LaptopIcon, WalletIcon, CheckCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function DeviceIcon({ category }: { category: string }) {
  if (category === "Laptop" || category === "Tablet") {
    return <LaptopIcon className="size-6 text-muted-foreground" />
  }
  return <SmartphoneIcon className="size-6 text-muted-foreground" />
}

export default function ConsumerPortalPage() {
  const activeLeases = leaseAgreements.filter((l) => l.status !== "Defaulted")

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Consumer Portal</h1>
        <p className="text-muted-foreground text-sm">
          View your active Buy Now Pay Later agreements and manage <span className="inline-flex items-center gap-1"><USDCIcon /></span> installment payments.
        </p>
      </div>

      {activeLeases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No active Buy Now Pay Later agreements found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {activeLeases.map((lease: LeaseAgreement) => {
            const remaining = lease.totalPayable - lease.amountPaid
            const isPaid = lease.status === "Completed"
            return (
              <Card key={lease.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                    <DeviceIcon category={lease.productBrand === "Apple" && lease.productName.includes("MacBook") ? "Laptop" : lease.productName.includes("iPad") ? "Tablet" : "Smartphone"} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium">
                      {lease.productBrand} {lease.productName}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Started {lease.startDate} · {lease.tenureMonths} mo plan
                    </p>
                  </div>
                  <Badge variant={isPaid ? "secondary" : "default"}>
                    {lease.status}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ownership Progress</span>
                      <span className="font-semibold tabular-nums">{lease.progress}%</span>
                    </div>
                    <Progress value={lease.progress} className="h-2" />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Remaining Balance</p>
                       <p className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {formatUSDC(remaining)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Next Billing</p>
                      <p className="font-semibold tabular-nums">{lease.nextDueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Monthly Installment</p>
                       <p className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {formatUSDC(lease.monthlyInstallment)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Total Financed</p>
                       <p className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {formatUSDC(lease.totalPayable)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {isPaid ? (
                    <Button className="w-full" size="sm" variant="secondary" disabled>
                      <CheckCircleIcon className="mr-2 size-4" />
                      Ownership Transferred
                    </Button>
                  ) : (
                    <Button className="w-full" size="sm">
                      <WalletIcon className="mr-2 size-4" />
                      Pay Next Installment
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
