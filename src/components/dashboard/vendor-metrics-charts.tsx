"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ArrowUpRightIcon, ArrowDownRightIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { USDCIcon } from "@/components/ui/usdc-icon"

type Period = "month" | "quarter" | "year"

// Historical data sets per period
const metricsData = {
  activeLeases: {
    title: "Active Leases",
    subtitle: "Active tenant contracts & portfolio unit volume",
    value: "4",
    unit: "leases",
    isCurrency: false,
    description: "Verified against active lease registry",
    trends: {
      month: { text: "Trending up by 12.5% this month", isPositive: true },
      quarter: { text: "Trending up by 25.0% this quarter", isPositive: true },
      year: { text: "Trending up by 100% this year", isPositive: true },
    },
    data: {
      month: [
        { label: "Week 1", val: 3 },
        { label: "Week 2", val: 3 },
        { label: "Week 3", val: 4 },
        { label: "Week 4", val: 4 },
      ],
      quarter: [
        { label: "Sep 26", val: 2 },
        { label: "Oct 26", val: 2 },
        { label: "Nov 26", val: 3 },
        { label: "Dec 26", val: 3 },
        { label: "Jan 27", val: 4 },
        { label: "Feb 27", val: 4 },
      ],
      year: [
        { label: "Q1 25", val: 1 },
        { label: "Q2 25", val: 2 },
        { label: "Q3 25", val: 2 },
        { label: "Q4 25", val: 3 },
        { label: "Q1 26", val: 4 },
      ],
    },
    yTicks: [0, 1, 2, 3, 4, 5],
    yFormatter: (v: number) => `${v}`,
    color: "#84cc16", // lime-500 brand accent
  },
  mrr: {
    title: "MRR",
    subtitle: "Monthly recurring revenue from active contracts",
    value: "401",
    unit: "USDC",
    isCurrency: true,
    description: "Verified against recurring billing ledger",
    trends: {
      month: { text: "Trending up by 14.2% this month", isPositive: true },
      quarter: { text: "Trending up by 38.3% this quarter", isPositive: true },
      year: { text: "Trending up by 120% this year", isPositive: true },
    },
    data: {
      month: [
        { label: "Week 1", val: 350 },
        { label: "Week 2", val: 375 },
        { label: "Week 3", val: 390 },
        { label: "Week 4", val: 401 },
      ],
      quarter: [
        { label: "Sep 26", val: 180 },
        { label: "Oct 26", val: 220 },
        { label: "Nov 26", val: 290 },
        { label: "Dec 26", val: 340 },
        { label: "Jan 27", val: 375 },
        { label: "Feb 27", val: 401 },
      ],
      year: [
        { label: "Q1 25", val: 120 },
        { label: "Q2 25", val: 190 },
        { label: "Q3 25", val: 260 },
        { label: "Q4 25", val: 330 },
        { label: "Q1 26", val: 401 },
      ],
    },
    yTicks: [0, 100, 200, 300, 400, 500],
    yFormatter: (v: number) => `$${v}`,
    color: "#a3e635", // lime-400 brand accent
  },
  totalPayouts: {
    title: "Total Payouts",
    subtitle: "Gross sales invoiced vs Paid & collected",
    value: "3,917",
    unit: "USDC",
    isCurrency: true,
    description: "Verified against ledger bank & cash accounts",
    trends: {
      month: { text: "Trending up by 8.4% this month", isPositive: true },
      quarter: { text: "Trending up by 24.6% this quarter", isPositive: true },
      year: { text: "Trending up by 85.0% this year", isPositive: true },
    },
    data: {
      month: [
        { label: "Week 1", val: 3600 },
        { label: "Week 2", val: 3720 },
        { label: "Week 3", val: 3840 },
        { label: "Week 4", val: 3917 },
      ],
      quarter: [
        { label: "Sep 26", val: 1200 },
        { label: "Oct 26", val: 1850 },
        { label: "Nov 26", val: 2400 },
        { label: "Dec 26", val: 2950 },
        { label: "Jan 27", val: 3450 },
        { label: "Feb 27", val: 3917 },
      ],
      year: [
        { label: "Q1 25", val: 800 },
        { label: "Q2 25", val: 1500 },
        { label: "Q3 25", val: 2300 },
        { label: "Q4 25", val: 3100 },
        { label: "Q1 26", val: 3917 },
      ],
    },
    yTicks: [0, 1000, 2000, 3000, 4000],
    yFormatter: (v: number) => (v === 0 ? "$0" : `$${(v / 1000).toFixed(1)}k`),
    color: "#65a30d", // lime-600 brand accent
  },
  defaultRate: {
    title: "Default Rate",
    subtitle: "Overdue & defaulted lease risk percentage",
    value: "16.7%",
    unit: "",
    isCurrency: false,
    description: "Calculated across total historical agreements",
    trends: {
      month: { text: "Trending down by 2.1% this month", isPositive: true }, // Down is good for default rate
      quarter: { text: "Trending down by 5.8% this quarter", isPositive: true },
      year: { text: "Trending down by 12.3% this year", isPositive: true },
    },
    data: {
      month: [
        { label: "Week 1", val: 18.2 },
        { label: "Week 2", val: 17.6 },
        { label: "Week 3", val: 17.1 },
        { label: "Week 4", val: 16.7 },
      ],
      quarter: [
        { label: "Sep 26", val: 22.5 },
        { label: "Oct 26", val: 20.0 },
        { label: "Nov 26", val: 18.8 },
        { label: "Dec 26", val: 18.0 },
        { label: "Jan 27", val: 17.2 },
        { label: "Feb 27", val: 16.7 },
      ],
      year: [
        { label: "Q1 25", val: 29.0 },
        { label: "Q2 25", val: 25.4 },
        { label: "Q3 25", val: 22.1 },
        { label: "Q4 25", val: 19.5 },
        { label: "Q1 26", val: 16.7 },
      ],
    },
    yTicks: [0, 10, 20, 30],
    yFormatter: (v: number) => `${v}%`,
    color: "#8b5cf6", // violet-500
  },
}

function CustomTooltip({
  active,
  payload,
  label,
  yFormatter,
  unit,
  isCurrency,
}: any) {
  if (active && payload && payload.length) {
    const val = payload[0].value
    const formatted = yFormatter ? yFormatter(val) : val
    return (
      <div className="rounded-lg bg-popover/95 px-3 py-2 text-xs backdrop-blur-sm">
        <p className="font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold text-popover-foreground flex items-center gap-1 mt-0.5">
          {isCurrency && <USDCIcon className="size-3.5" />}
          {formatted} {unit && !isCurrency ? unit : ""}
        </p>
      </div>
    )
  }
  return null
}

function MetricChartCard({
  metricKey,
}: {
  metricKey: keyof typeof metricsData
}) {
  const [period, setPeriod] = useState<Period>("quarter")
  const config = metricsData[metricKey]
  const currentTrend = config.trends[period]
  const chartData = config.data[period]

  const chartId = `gradient-${metricKey}`

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-transparent p-4">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-card-foreground tracking-tight">
              {config.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">
              {config.subtitle}
            </p>
          </div>

          <Select
            value={period}
            onValueChange={(val) => setPeriod(val as Period)}
          >
            <SelectTrigger className="h-8 w-[100px] text-xs font-medium bg-transparent border-0 rounded-full px-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="month" className="text-xs">
                Month
              </SelectItem>
              <SelectItem value="quarter" className="text-xs">
                Quarter
              </SelectItem>
              <SelectItem value="year" className="text-xs">
                Year
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Big Display Value */}
        <div className="mt-4">
          <div className="text-3xl font-extrabold text-card-foreground tracking-tight flex items-center gap-1.5">
            {config.isCurrency ? (
              <>
                <USDCIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
                <span>{config.value}</span>
              </>
            ) : (
              <span>{config.value}</span>
            )}
          </div>

          {/* Trend Badge & Description */}
          <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span>{currentTrend.text}</span>
            {currentTrend.isPositive ? (
              <ArrowUpRightIcon className="size-4" />
            ) : (
              <ArrowDownRightIcon className="size-4" />
            )}
          </div>

          <p className="text-[11px] text-muted-foreground/75 mt-0.5">
            {config.description}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 h-[170px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={170}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              opacity={0.35}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              dy={6}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={config.yTicks}
              tickFormatter={config.yFormatter}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />

            <Tooltip
              content={
                <CustomTooltip
                  yFormatter={config.yFormatter}
                  unit={config.unit}
                  isCurrency={config.isCurrency}
                />
              }
            />

            <Area
              type="monotone"
              dataKey="val"
              stroke={config.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${chartId})`}
              activeDot={{ r: 5, strokeWidth: 0, fill: config.color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function VendorMetricsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
      <MetricChartCard metricKey="activeLeases" />
      <MetricChartCard metricKey="mrr" />
      <MetricChartCard metricKey="totalPayouts" />
      <MetricChartCard metricKey="defaultRate" />
    </div>
  )
}
