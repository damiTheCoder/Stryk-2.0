"use client"

import { UsersIcon, DollarSignIcon, TrendingDownIcon, WalletIcon, FileTextIcon, TrendingUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { leaseAgreements } from "@/data/seed"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

export default function CustomerDashboardPage() {
  const activeLeases = leaseAgreements.filter((l) => l.status !== "Defaulted")
  const totalLiability = activeLeases.reduce((sum, l) => sum + (l.totalPayable - l.amountPaid), 0)
  const totalMonthly = activeLeases.reduce((sum, l) => sum + l.monthlyInstallment, 0)

  const metrics = [
    {
      title: "Active Leases",
      value: String(activeLeases.length),
      icon: <UsersIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Total Liability",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalLiability)}</span>,
      icon: <DollarSignIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Monthly Payments",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalMonthly)}</span>,
      icon: <WalletIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Default Rate",
      value: "0%",
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

      {/* Quick Actions */}
      <div className="px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/customer/leases" className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileTextIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">View Active Leases</p>
                <p className="text-xs text-muted-foreground">See all your financed devices</p>
              </div>
            </a>
            <a href="/customer/liability" className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUpIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Cash to Liability Ratio</p>
                <p className="text-xs text-muted-foreground">Check your financial health</p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
