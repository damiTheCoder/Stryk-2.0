"use client"

import { useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import { CheckCircle2Icon, FlagIcon, CircleDashedIcon } from "lucide-react"

type CustomerUpcomingPayment = {
  id: string
  merchant: string
  amount: number
  nextDate: string
  status: "wanted" | "review" | "unset"
  category: string
}

type Status = CustomerUpcomingPayment["status"]
const CYCLE: Status[] = ["unset", "wanted", "review"]

function nextStatus(current: Status): Status {
  const idx = CYCLE.indexOf(current)
  return CYCLE[(idx + 1) % CYCLE.length]
}

function StatusIcon({ status }: { status: Status }) {
  switch (status) {
    case "wanted":
      return <CheckCircle2Icon className="size-4 text-blue-500" />
    case "review":
      return <FlagIcon className="size-4 text-blue-400" />
    default:
      return <CircleDashedIcon className="size-4 text-muted-foreground/50" />
  }
}

function DeviceIcon({ category }: { category: string }) {
  switch (category) {
    case "Smartphone":
      return <span className="text-xs">📱</span>
    case "Laptop":
      return <span className="text-xs">💻</span>
    case "Tablet":
      return <span className="text-xs">📲</span>
    default:
      return <span className="text-xs">📱</span>
  }
}

export function CustomerRecurringDetector() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => {
    const map: Record<string, Status> = {}
    upcomingPayments.forEach((c) => {
      map[c.id] = c.status
    })
    return map
  })

  const monthlyTotal = useMemo(
    () =>
      upcomingPayments.reduce((s, c) => s + c.amount, 0),
    []
  )

  const summary = useMemo(() => {
    let wanted = 0
    let review = 0
    Object.values(statuses).forEach((s) => {
      if (s === "wanted") wanted++
      if (s === "review") review++
    })
    return { wanted, review }
  }, [statuses])

  function toggleStatus(id: string) {
    setStatuses((prev) => ({
      ...prev,
      [id]: nextStatus(prev[id]),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>
              <span className="tabular-nums font-medium text-foreground">
                ${monthlyTotal.toLocaleString()}
              </span>{" "}
              /month total
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {upcomingPayments.map((charge) => {
          const status = statuses[charge.id]
          return (
            <div
              key={charge.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
              )}
            >
              <DeviceIcon category={charge.category} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {charge.merchant}
                </p>
                <p className="text-xs text-muted-foreground">
                  Next: {charge.nextDate}
                </p>
              </div>
              <div className="text-right mr-2">
                <p className="text-sm font-medium tabular-nums">
                  ${charge.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  monthly
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleStatus(charge.id)}
                className="rounded-full p-1 transition-colors hover:bg-muted"
                aria-label={`Toggle status for ${charge.merchant}`}
              >
                <StatusIcon status={status} />
              </button>
            </div>
          )
        })}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2Icon className="size-3.5 text-emerald-500" />
            <span className="tabular-nums">{summary.wanted}</span> wanted
          </span>
          <span className="flex items-center gap-1.5">
            <FlagIcon className="size-3.5 text-amber-500" />
            <span className="tabular-nums">{summary.review}</span> flagged for
            review
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

const upcomingPayments: CustomerUpcomingPayment[] = leaseAgreements
  .filter((l: LeaseAgreement) => l.status !== "Defaulted")
  .map((lease) => {
    const nextDue = new Date()
    nextDue.setDate(nextDue.getDate() + 30)
    const nextDateStr = nextDue.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

    return {
      id: lease.id,
      merchant: `${lease.productBrand} ${lease.productName}`,
      amount: lease.monthlyInstallment,
      nextDate: nextDateStr,
      status: "wanted" as Status,
      category: lease.productName.includes("MacBook") || lease.productName.includes("Laptop")
        ? "Laptop"
        : lease.productName.includes("iPad") || lease.productName.includes("Tablet")
          ? "Tablet"
          : "Smartphone",
    }
  })
