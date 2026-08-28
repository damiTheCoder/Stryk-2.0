"use client"

import Link from "next/link"
import { DollarSignIcon, UsersIcon, LandmarkIcon, TrendingDownIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vendorMetrics, leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function statusVariant(status: LeaseAgreement["status"]) {
  if (status === "Active") return "default"
  if (status === "Defaulted") return "destructive"
  return "secondary"
}

const metrics = [
  {
    title: "Active Leases",
    value: vendorMetrics.totalActiveLeases.toString(),
    icon: UsersIcon,
    accent: "text-blue-600",
  },
  {
    title: "MRR",
    value: (
      <span className="flex items-center gap-1">
        <USDCIcon /> {formatUSDC(vendorMetrics.mrr)}
      </span>
    ),
    icon: DollarSignIcon,
    accent: "text-blue-600",
  },
  {
    title: "Total Payouts",
    value: (
      <span className="flex items-center gap-1">
        <USDCIcon /> {formatUSDC(vendorMetrics.totalPayouts)}
      </span>
    ),
    icon: LandmarkIcon,
    accent: "text-blue-600",
  },
  {
    title: "Default Rate",
    value: `${vendorMetrics.defaultRate}%`,
    icon: TrendingDownIcon,
    accent: "text-blue-600",
  },
]

export default function VendorDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Monitor your lease portfolio performance and consumer agreements.
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
          <CardTitle className="text-base">Active Leases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Consumer</TableHead>
                <TableHead>Device Model</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Next Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaseAgreements.map((agreement) => (
                <TableRow key={agreement.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={agreement.consumerAvatar}
                        alt={agreement.consumerName}
                        className="size-8 rounded-full object-cover shrink-0"
                      />
                      <Link href={`/vendor/customers/${agreement.consumerId}`} className="font-medium truncate text-primary hover:underline">
                        {agreement.consumerName}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{agreement.productBrand} {agreement.productName}</span>
                       <span className="text-xs text-muted-foreground">{agreement.tenureMonths} months · <span className="inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(agreement.monthlyInstallment)}</span>/mo</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={agreement.progress} className="h-1.5 w-24" />
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {agreement.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">{agreement.nextDueDate}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(agreement.status)}>
                      {agreement.status}
                    </Badge>
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
