"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { LineChart, Line } from "recharts"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
} from "lucide-react"
import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { holdings as seedHoldings, type Holding } from "@/data/seed"

type SortDir = "asc" | "desc" | null
type SortKey = "name" | "quantity" | "avgBuyPrice" | "currentPrice" | "plPct" | "plDollar"

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  if (sortKey !== col) return <ArrowUpDown className="ml-1 inline size-3 text-muted-foreground/50" />
  if (sortDir === "asc") return <ArrowUp className="ml-1 inline size-3" />
  return <ArrowDown className="ml-1 inline size-3" />
}

function getLeaseInfo(h: Holding) {
  const collected = h.currentPrice
  const total = h.avgBuyPrice
  const remaining = Math.max(0, total - collected)
  const progress = total > 0 ? Math.round((collected / total) * 100) : 0
  return { collected, remaining, progress }
}

function DeviceIcon({ sector }: { sector: string }) {
  const iconClass = "size-7 shrink-0 rounded-full bg-muted flex items-center justify-center"
  switch (sector) {
    case "Smartphone":
      return (
        <div className={iconClass}>
          <Smartphone className="size-4 text-foreground" />
        </div>
      )
    case "Laptop":
      return (
        <div className={iconClass}>
          <Laptop className="size-4 text-foreground" />
        </div>
      )
    case "Tablet":
      return (
        <div className={iconClass}>
          <Tablet className="size-4 text-foreground" />
        </div>
      )
    case "Wearable":
      return (
        <div className={iconClass}>
          <Watch className="size-4 text-foreground" />
        </div>
      )
    default:
      return (
        <div className={iconClass}>
          <Laptop className="size-4 text-foreground" />
        </div>
      )
  }
}

export function HoldingsTable() {
  const [prices, setPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    for (const h of seedHoldings) map[h.id] = h.currentPrice
    return map
  })
  const [flashMap, setFlashMap] = useState<Record<string, "up" | "down" | null>>({})
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const prevPrices = useRef<Record<string, number>>({ ...prices })

  // Live price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev }
        const flashes: Record<string, "up" | "down" | null> = {}
        for (const h of seedHoldings) {
          const change = 1 + (Math.random() - 0.5) * 0.006 // +/- 0.3%
          const newPrice = Math.round(prev[h.id] * change * 100) / 100
          if (newPrice !== prev[h.id]) {
            flashes[h.id] = newPrice > prev[h.id] ? "up" : "down"
          }
          next[h.id] = newPrice
        }
        prevPrices.current = prev
        setFlashMap(flashes)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Clear flash after animation
  useEffect(() => {
    if (Object.keys(flashMap).length === 0) return
    const t = setTimeout(() => setFlashMap({}), 600)
    return () => clearTimeout(t)
  }, [flashMap])

  const holdings = useMemo(
    () =>
      seedHoldings.map((h) => ({
        ...h,
        currentPrice: prices[h.id] ?? h.currentPrice,
      })),
    [prices]
  )

  const cycleSortDir = useCallback(
    (key: SortKey) => {
      if (sortKey !== key) {
        setSortKey(key)
        setSortDir("asc")
      } else if (sortDir === "asc") {
        setSortDir("desc")
      } else {
        setSortKey(null)
        setSortDir(null)
      }
    },
    [sortKey, sortDir]
  )

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return holdings
    const arr = [...holdings]
    arr.sort((a, b) => {
      let va: number, vb: number
      const aInfo = getLeaseInfo(a)
      const bInfo = getLeaseInfo(b)
      switch (sortKey) {
        case "name":
          return sortDir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        case "quantity":
          va = a.quantity; vb = b.quantity; break
        case "avgBuyPrice":
          va = a.avgBuyPrice; vb = b.avgBuyPrice; break
        case "currentPrice":
          va = aInfo.collected; vb = bInfo.collected; break
        case "plPct":
          va = aInfo.progress; vb = bInfo.progress; break
        case "plDollar":
          va = aInfo.remaining; vb = bInfo.remaining; break
        default:
          return 0
      }
      return sortDir === "asc" ? va - vb : vb - va
    })
    return arr
  }, [holdings, sortKey, sortDir])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy Now Pay Later Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none pl-4"
                onClick={() => cycleSortDir("name")}
              >
                Customer <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right sm:table-cell"
                onClick={() => cycleSortDir("quantity")}
              >
                Tenure <SortIcon col="quantity" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right lg:table-cell"
                onClick={() => cycleSortDir("avgBuyPrice")}
              >
                Device Price <SortIcon col="avgBuyPrice" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => cycleSortDir("currentPrice")}
              >
                Collected <SortIcon col="currentPrice" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => cycleSortDir("plPct")}
              >
                Progress <SortIcon col="plPct" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer select-none text-right md:table-cell"
                onClick={() => cycleSortDir("plDollar")}
              >
                Remaining <SortIcon col="plDollar" sortKey={sortKey} sortDir={sortDir} />
              </TableHead>
              <TableHead className="hidden text-right pr-4 xl:table-cell">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((h) => {
              const info = getLeaseInfo(h)
              const flash = flashMap[h.id]
              return (
                <TableRow key={h.id}>
                  <TableCell className="pl-4">
                     <div className="flex items-center gap-2.5">
                       <DeviceIcon sector={h.sector} />
                       <div>
                         <div className="font-medium">{h.name}</div>
                         <div className="text-xs text-muted-foreground">
                           {h.symbol}
                         </div>
                       </div>
                     </div>
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums sm:table-cell">
                    {h.quantity}
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums lg:table-cell">
                    ${h.avgBuyPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <motion.span
                      key={`${h.id}-${prices[h.id]}`}
                      initial={{
                        backgroundColor:
                          flash === "up"
                            ? "var(--color-emerald-500/0.2)"
                            : flash === "down"
                              ? "var(--color-rose-500/0.2)"
                              : "transparent",
                      }}
                      animate={{ backgroundColor: "transparent" }}
                      transition={{ duration: 0.6 }}
                      className="rounded px-1 py-0.5"
                    >
                      ${info.collected.toFixed(2)}
                    </motion.span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right tabular-nums font-medium",
                      info.progress >= 50 ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"
                    )}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {info.progress}%
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "hidden text-right tabular-nums font-medium md:table-cell",
                      "text-muted-foreground"
                    )}
                  >
                    ${info.remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="hidden pr-4 xl:table-cell">
                    <div className="ml-auto w-[80px] h-[30px]">
                      <LineChart
                        width={80}
                        height={30}
                        data={h.sparklineData.map((v, i) => ({ i, v }))}
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
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}
