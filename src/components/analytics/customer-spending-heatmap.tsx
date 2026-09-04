"use client"

import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { USDCIcon } from "@/components/ui/usdc-icon"
import Image from "next/image"
import { UsersIcon, DollarSignIcon, TrendingDownIcon } from "lucide-react"

const CELL_SIZE = 13
const CELL_GAP = 3
const TOTAL = CELL_SIZE + CELL_GAP

function intensityClass(amount: number, max: number): string {
  if (amount === 0) return "fill-muted/40"
  const ratio = amount / max
  if (ratio < 0.2) return "fill-primary/10"
  if (ratio < 0.4) return "fill-primary/25"
  if (ratio < 0.65) return "fill-primary/45"
  return "fill-primary/70"
}

function formatUSDC(value: number) {
  return value.toLocaleString()
}

export function CustomerSpendingHeatmap() {
  const { grid, monthLabels, yearTotal, max, activeLeases, totalPaid, totalMonthly, totalLeaseValue } = useMemo(() => {
    const data: { date: string; amount: number }[] = []
    const start = new Date(2025, 3, 14)
    const activeLeases = leaseAgreements.filter((l) => l.status !== "Defaulted")

    for (let i = 0; i < 365; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const dateStr = d.toISOString().split("T")[0]

      const dayOfWeek = d.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const base = isWeekend ? 0 : 120
      const noise = Math.sin(i * 0.3) * 60 + Math.cos(i * 0.7) * 40
      const rawAmount = Math.max(0, Math.round(base + noise + (i % 7) * 15))

      const monthlyTotal = activeLeases.reduce((s, l) => s + l.monthlyInstallment, 0)
      const scaledAmount = monthlyTotal > 0 ? Math.round((rawAmount / 1000) * monthlyTotal) : 0

      data.push({
        date: dateStr,
        amount: Math.random() > 0.2 ? scaledAmount : 0,
      })
    }

    const max = Math.max(...data.map((d) => d.amount))
    const yearTotal = data.reduce((s, d) => s + d.amount, 0)
    const totalPaid = activeLeases.reduce((sum, l) => sum + l.amountPaid, 0)
    const totalMonthly = activeLeases.reduce((sum, l) => sum + l.monthlyInstallment, 0)
    const totalLeaseValue = activeLeases.reduce((sum, l) => sum + l.totalPayable, 0)

    const firstDate = new Date(data[0].date)
    const startDay = firstDate.getDay()
    const gridStart = new Date(firstDate)
    gridStart.setDate(gridStart.getDate() - startDay)

    const lookup = new Map(data.map((d) => [d.date, d.amount]))

    const weeks: { date: string; amount: number; col: number; row: number }[] =
      []
    const months: { label: string; col: number }[] = []
    const seenMonths = new Set<string>()

    for (let col = 0; col < 53; col++) {
      for (let row = 0; row < 7; row++) {
        const d = new Date(gridStart)
        d.setDate(d.getDate() + col * 7 + row)
        const key = d.toISOString().split("T")[0]
        const amount = lookup.get(key) ?? 0

        weeks.push({ date: key, amount, col, row })

        const monthKey = `${d.getFullYear()}-${d.getMonth()}`
        if (!seenMonths.has(monthKey) && row === 0) {
          seenMonths.add(monthKey)
          const label = d.toLocaleDateString("en-US", { month: "short" })
          months.push({ label, col })
        }
      }
    }

    return { grid: weeks, monthLabels: months, yearTotal, max, activeLeases, totalPaid, totalMonthly, totalLeaseValue }
  }, [])

  const customerMetricItems = [
    {
      title: "Active Leases",
      value: String(activeLeases.length),
      icon: <UsersIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Total Paid",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalPaid)}</span>,
      icon: <DollarSignIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Monthly Payments",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalMonthly)}</span>,
      icon: <Image src="/LO.png" alt="Stryk" width={16} height={16} className="size-4 rounded text-blue-600" />,
    },
    {
      title: "Total Lease Value",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalLeaseValue)}</span>,
      icon: <TrendingDownIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Default Rate",
      value: "0%",
      icon: <TrendingDownIcon className="size-4 text-blue-600" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <CardTitle>Payment Activity</CardTitle>
              <CardDescription>
                <span className="tabular-nums font-medium text-foreground">
                  ${yearTotal.toLocaleString()}
                </span>{" "}
                total paid this year
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-4 border-l-2 border-muted pl-4 text-sm text-muted-foreground">
              {customerMetricItems.map((metric) => (
                <div key={metric.title} className="flex items-center gap-1.5">
                  {metric.icon}
                  <span>{metric.title}</span>
                  <span className="font-semibold text-foreground tabular-nums">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            <span className="inline-block size-3 rounded-sm bg-muted/40" />
            <span className="inline-block size-3 rounded-sm bg-primary/10" />
            <span className="inline-block size-3 rounded-sm bg-primary/25" />
            <span className="inline-block size-3 rounded-sm bg-primary/45" />
            <span className="inline-block size-3 rounded-sm bg-primary/70" />
            <span>More</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider delay={0}>
            <svg
              width={53 * TOTAL + 32}
              height={7 * TOTAL + 24}
              className="text-muted-foreground"
            >
              {monthLabels.map((m) => (
                <text
                  key={`${m.label}-${m.col}`}
                  x={m.col * TOTAL + 32}
                  y={10}
                  className="fill-muted-foreground text-[10px]"
                >
                  {m.label}
                </text>
              ))}

              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) =>
                label ? (
                  <text
                    key={i}
                    x={0}
                    y={i * TOTAL + 28}
                    className="fill-muted-foreground text-[10px]"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {grid.map((cell) => (
                <Tooltip key={cell.date}>
                  <TooltipTrigger
                    render={
                      <rect
                        x={cell.col * TOTAL + 32}
                        y={cell.row * TOTAL + 18}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2}
                        className={`${intensityClass(cell.amount, max)} transition-colors hover:stroke-foreground/30 hover:stroke-1`}
                      />
                    }
                  />
                  <TooltipContent>
                    <span className="tabular-nums">
                      ${cell.amount.toLocaleString()}
                    </span>{" "}
                    on{" "}
                    {new Date(cell.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </svg>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
