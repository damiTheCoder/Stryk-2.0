"use client"

import { UsersIcon, DollarSignIcon, LandmarkIcon, TrendingDownIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCustomizer } from "@/components/dashboard/dashboard-customizer"
import { vendorMetrics } from "@/data/seed"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

export default function Page() {
  const metrics = [
    {
      title: "Active Leases",
      value: "4",
      icon: UsersIcon,
      accent: "text-blue-600",
    },
    {
      title: "MRR",
      value: <span className="inline-flex items-center gap-1"><USDCIcon /> 401</span>,
      icon: DollarSignIcon,
      accent: "text-blue-600",
    },
    {
      title: "Total Payouts",
      value: <span className="inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(vendorMetrics.totalPayouts)}</span>,
      icon: LandmarkIcon,
      accent: "text-blue-600",
    },
    {
      title: "Default Rate",
      value: "16.7%",
      icon: TrendingDownIcon,
      accent: "text-blue-600",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Metrics Row */}
      <div className="p-4 pt-0">
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
      </div>

      {/* Dashboard Customizer */}
      <DashboardCustomizer />
    </div>
  )
}
