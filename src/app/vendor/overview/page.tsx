"use client"

import { VendorMetricsCharts } from "@/components/dashboard/vendor-metrics-charts"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 pt-2 pb-6">
      {/* Header Section */}
      <div className="px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Your dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your complete dashboard overview that covers all your financials
        </p>
      </div>

      {/* Metrics Row represented as rich AreaCharts matching reference design */}
      <VendorMetricsCharts />
    </div>
  )
}