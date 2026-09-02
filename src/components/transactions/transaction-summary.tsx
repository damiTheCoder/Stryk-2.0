import { ArrowDownLeftIcon, ArrowUpRightIcon, HashIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FullTransaction } from "@/data/seed"

interface TransactionSummaryProps {
  transactions: FullTransaction[]
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n)

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalIn = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)

  const totalOut = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0)

  const largest = transactions.length
    ? transactions.reduce((max, t) =>
        Math.abs(t.amount) > Math.abs(max.amount) ? t : max
      )
    : null

  const cards = [
    {
      label: "Total In",
      value: fmt(totalIn),
      icon: <ArrowDownLeftIcon className="size-4 text-emerald-500" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Out",
      value: fmt(totalOut),
      icon: <ArrowUpRightIcon className="size-4 text-rose-500" />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Largest",
      value: largest ? fmt(Math.abs(largest.amount)) : "$0.00",
      icon: <TrendingUpIcon className="size-4 text-primary" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Count",
      value: transactions.length.toString(),
      icon: <HashIcon className="size-4 text-muted-foreground" />,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ]

  return (
    <>
      {/* Mobile bordered rows */}
      <div className="sm:hidden divide-y">
        {cards.map((card) => (
          <div key={card.label} className="py-4">
            <div className="flex items-center gap-2 mb-1">
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", card.bg)}>
                {card.icon}
              </div>
              <span className="text-sm text-muted-foreground">{card.label}</span>
            </div>
            <span className="tabular-nums text-base font-semibold tracking-tight">
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop cards */}
      <div className="hidden sm:grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-3 rounded-xl bg-card p-3"
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full",
                card.bg
              )}
            >
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="tabular-nums text-base font-semibold tracking-tight">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}