"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { leaseAgreements } from "@/data/seed"

type TickerEntry = {
  symbol: string
  price: number
  change: number
}

export function LiveTicker() {
  const entries = useMemo<TickerEntry[]>(() => {
    const total = leaseAgreements.reduce((s, l) => s + l.totalPayable, 0)
    const collected = leaseAgreements.reduce((s, l) => s + l.amountPaid, 0)
    const unpaid = total - collected
    const active = leaseAgreements.filter((l) => l.status === "Active").length
    return [
      { symbol: "TOTAL", price: total, change: 0 },
      { symbol: "COLLECTED", price: collected, change: total > 0 ? (collected / total) * 100 : 0 },
      { symbol: "UNPAID", price: unpaid, change: total > 0 ? (unpaid / total) * 100 : 0 },
      { symbol: "ACTIVE", price: active, change: 0 },
    ]
  }, [])

  const tickerItems = entries.map((e, i) => {
    const positive = e.change >= 0
    return (
      <span
        key={`${e.symbol}-${i}`}
        className="inline-flex items-center gap-1.5 px-4 text-xs"
      >
        <span className="font-medium">{e.symbol}</span>
        <span className="tabular-nums text-muted-foreground">
          ${e.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </span>
        {e.symbol !== "ACTIVE" && (
          <span
            className={cn(
              "tabular-nums font-medium",
              positive
                ? "text-blue-600 dark:text-blue-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {positive ? "+" : ""}
            {e.change.toFixed(1)}%
          </span>
        )}
      </span>
    )
  })

  return (
    <div className="group sticky top-0 z-20 h-10 w-full overflow-hidden border-b bg-background">
      <div className="animate-marquee group-hover:[animation-play-state:paused] absolute flex h-full items-center whitespace-nowrap">
        <div className="flex items-center">
          {tickerItems}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center" aria-hidden>
          {tickerItems}
        </div>
      </div>
    </div>
  )
}
