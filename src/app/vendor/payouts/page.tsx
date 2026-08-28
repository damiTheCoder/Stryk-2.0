"use client"

import { DollarSignIcon, LandmarkIcon, TrendingDownIcon, UsersIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendorMetrics } from "@/data/seed"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

const payouts = [
  { id: "p1", date: "2026-08-01", amount: 4250, txHash: "0xabc...123", status: "Completed" },
  { id: "p2", date: "2026-07-15", amount: 3890, txHash: "0xdef...456", status: "Completed" },
  { id: "p3", date: "2026-07-01", amount: 4100, txHash: "0xghi...789", status: "Completed" },
  { id: "p4", date: "2026-06-15", amount: 3650, txHash: "0xjkl...012", status: "Completed" },
]

const metrics = [
  { title: "Total Payouts", value: <span className="inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(vendorMetrics.totalPayouts)}</span>, icon: LandmarkIcon, accent: "text-blue-600" },
  { title: "MRR", value: <span className="inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(vendorMetrics.mrr)}</span>, icon: DollarSignIcon, accent: "text-blue-600" },
  { title: "Active Leases", value: vendorMetrics.totalActiveLeases.toString(), icon: UsersIcon, accent: "text-blue-600" },
  { title: "Default Rate", value: `${vendorMetrics.defaultRate}%`, icon: TrendingDownIcon, accent: "text-blue-600" },
]

export default function VendorPayoutsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settlements & Payouts</h1>
        <p className="text-muted-foreground text-sm">
          History of stablecoin revenue disbursements to your corporate wallet.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} size="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={cn("size-4", metric.accent)} />
            </CardHeader>
              <CardContent>
                <div className="text-xl font-bold flex items-center gap-1">{metric.value}</div>
              </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tx Hash</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell className="tabular-nums">{payout.date}</TableCell>
                  <TableCell className="font-semibold tabular-nums"><span className="inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(payout.amount)}</span></TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{payout.txHash}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{payout.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
