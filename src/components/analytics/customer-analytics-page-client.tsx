"use client"

import { CustomerSpendingHeatmap } from "@/components/analytics/customer-spending-heatmap"
import { CustomerCategoryDonut } from "@/components/analytics/customer-category-donut"
import { CustomerMonthComparison } from "@/components/analytics/customer-month-comparison"
import { CustomerRecurringDetector } from "@/components/analytics/customer-recurring-detector"
import { CustomerAiInsights } from "@/components/analytics/customer-ai-insights"

export function CustomerAnalyticsPageClient() {
  return (
    <div className="flex flex-col gap-4">
      <CustomerSpendingHeatmap />

      <div className="grid gap-4 lg:grid-cols-2">
        <CustomerCategoryDonut />
        <CustomerMonthComparison />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CustomerRecurringDetector />
        <CustomerAiInsights />
      </div>
    </div>
  )
}
