import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { recentTransactions } from "@/data/seed"
import {
  MoreHorizontalIcon,
  ChevronRightIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const categoryColors: Record<string, string> = {
  Smartphone: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Laptop: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Tablet: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Payment: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Default: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
}

export function RecentTransactions() {
  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          Buy Now Pay Later Payments
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          See All
          <ChevronRightIcon className="size-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px] space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[1fr_140px_100px_120px_32px] gap-4 border-b pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span>Customer</span>
              <span className="hidden sm:inline">Agreement ID</span>
              <span className="text-right">Amount</span>
              <span className="hidden md:inline">Date</span>
              <span />
            </div>

            {/* Rows */}
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="group grid grid-cols-[1fr_140px_100px_120px_32px] items-center gap-4 rounded-lg py-2.5 transition-colors hover:bg-muted/50"
              >
                {/* Merchant */}
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Image src="/LO.png" alt="Stryk" width={16} height={16} className="size-4 rounded text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/vendor/customers/${tx.consumerId}`} className="truncate text-sm font-medium text-primary hover:underline">
                      {tx.merchant}
                    </Link>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "mt-0.5 h-5 rounded-md px-1.5 text-[10px] font-medium",
                        categoryColors[tx.category]
                      )}
                    >
                      {tx.category}
                    </Badge>
                  </div>
                </div>

                {/* Transaction ID */}
                <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                  {tx.transactionId}
                </span>

                {/* Amount */}
                <span
                  className={cn(
                    "text-right text-sm font-semibold tabular-nums",
                    tx.amount > 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-foreground"
                  )}
                >
                  {tx.amount > 0 ? "+" : ""}$
                  {Math.abs(tx.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>

                {/* Date */}
                <span className="hidden text-xs text-muted-foreground md:inline">{tx.date}</span>

                {/* Actions */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
