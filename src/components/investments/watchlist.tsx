"use client"

import { useState } from "react"
import Image from "next/image"
import { LineChart, Line } from "recharts"
import { X, Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { watchlistItems, type WatchlistItem } from "@/data/seed"

export function Watchlist() {
  const [items, setItems] = useState<WatchlistItem[]>(watchlistItems)

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Leases</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y">
          {items.map((w) => {
            const positive = w.dayChange >= 0
            return (
              <div
                key={w.id}
                className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/50"
              >
                {/* Logo + Symbol */}
                <Image
                  src={w.logo}
                  alt={w.name}
                  width={28}
                  height={28}
                  className="size-7 shrink-0 rounded-full"
                />
                <Badge variant="secondary" className="w-14 justify-center font-mono text-[11px]">
                  {w.symbol}
                </Badge>

                 {/* Device */}
                <span className="min-w-0 flex-1 truncate text-sm">
                  {w.name}
                </span>

                {/* Mini sparkline */}
                <div className="hidden sm:block w-[80px] h-[30px]">
                  <LineChart
                    width={80}
                    height={30}
                    data={w.sparklineData.map((v, i) => ({ i, v }))}
                  >
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="var(--color-chart-1)"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </div>

                {/* Collected */}
                <span className="w-20 text-right text-sm font-medium tabular-nums">
                  ${w.currentPrice.toFixed(2)}
                </span>

                {/* Progress badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "w-16 justify-center tabular-nums text-[11px]",
                    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400"
                  )}
                >
                  {w.dayChange.toFixed(0)}%
                </Badge>

                {/* Remove on hover */}
                <button
                  onClick={() => removeItem(w.id)}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${w.symbol}`}
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )
          })}

          {items.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              Your watchlist is empty.
            </p>
          )}
        </div>

        <div className="px-4 pt-3">
          <Button variant="outline" size="sm" className="w-full gap-1.5">
            <Plus className="size-3.5" />
            Add to Watchlist
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
