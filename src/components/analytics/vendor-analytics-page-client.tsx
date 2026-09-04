"use client"

import { SpendingHeatmap } from "@/components/analytics/spending-heatmap"
import { CategoryDonut } from "@/components/analytics/category-donut"
import { MonthComparison } from "@/components/analytics/month-comparison"
import { RecurringDetector } from "@/components/analytics/recurring-detector"
import { AiInsights } from "@/components/analytics/ai-insights"

export function VendorAnalyticsPageClient() {
  return (
    <div className="flex flex-col gap-4">
      <SpendingHeatmap />

      <div className="grid gap-4 lg:grid-cols-2">
        <CategoryDonut />
        <MonthComparison />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecurringDetector />
        <AiInsights />
      </div>
    </div>
  )
}
