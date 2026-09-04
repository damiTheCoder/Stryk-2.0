"use client"

import { UsersIcon, DollarSignIcon, TrendingDownIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCustomizer } from "@/components/dashboard/dashboard-customizer"
import { vendorMetrics } from "@/data/seed"
import { USDCIcon } from "@/components/ui/usdc-icon"
import Image from "next/image"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

export default function Page() {
  const metrics = [
    {
      title: "Active Leases",
      value: "4",
      icon: <UsersIcon className="size-4 text-blue-600" />,
    },
    {
      title: "MRR",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> 401</span>,
      icon: <DollarSignIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Total Payouts",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(vendorMetrics.totalPayouts)}</span>,
      icon: <Image src="/LO.png" alt="Stryk" width={16} height={16} className="size-4 rounded text-blue-600" />,
    },
    {
      title: "Default Rate",
      value: "16.7%",
      icon: <TrendingDownIcon className="size-4 text-blue-600" />,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Metrics Row */}
      <div className="px-4 md:px-6">
        {/* Mobile bordered rows */}
        <div className="sm:hidden divide-y">
          {metrics.map((metric) => (
            <div key={metric.title} className="py-4">
              <span className="text-sm text-muted-foreground">{metric.title}</span>
              <div className="text-base font-semibold flex items-center gap-1.5 mt-1">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Desktop cards */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title} size="sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                {metric.icon}
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