"use client"

import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import {
  SparklesIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

type CustomerInsight = {
  id: string
  text: string
  trend: "up" | "down" | "neutral"
  percentChange: number
  category: string
}

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  switch (trend) {
    case "up":
      return <TrendingUpIcon className="size-3" />
    case "down":
      return <TrendingDownIcon className="size-3" />
    default:
      return <MinusIcon className="size-3" />
  }
}

function InsightIcon({ category }: { category: string }) {
  return <SparklesIcon className="size-4 text-primary" />
}

function generateCustomerInsights(leases: LeaseAgreement[]): CustomerInsight[] {
  const activeLeases = leases.filter((l) => l.status !== "Defaulted")
  const totalMonthly = activeLeases.reduce((s, l) => s + l.monthlyInstallment, 0)
  const totalPaid = activeLeases.reduce((s, l) => s + l.amountPaid, 0)
  const avgProgress = activeLeases.length > 0
    ? Math.round(activeLeases.reduce((s, l) => s + l.progress, 0) / activeLeases.length)
    : 0

  const insights: CustomerInsight[] = []

  if (activeLeases.length > 0) {
    insights.push({
      id: "ci1",
      text: `You have ${activeLeases.length} active lease${activeLeases.length > 1 ? "s" : ""} with a total monthly payment of $${totalMonthly.toLocaleString()}.`,
      trend: "neutral",
      percentChange: 0,
      category: "Overview",
    })
  }

  if (avgProgress >= 50) {
    insights.push({
      id: "ci2",
      text: `Great progress! You've paid off an average of ${avgProgress}% across your leases.`,
      trend: "up",
      percentChange: avgProgress,
      category: "Progress",
    })
  } else if (avgProgress < 25 && activeLeases.length > 0) {
    insights.push({
      id: "ci2",
      text: `You're early in your payment journey. Keep making timely payments to build your credit history.`,
      trend: "neutral",
      percentChange: 0,
      category: "Progress",
    })
  }

  if (totalPaid > 0) {
    insights.push({
      id: "ci3",
      text: `You've paid $${totalPaid.toLocaleString()} in total so far. Stay consistent to complete your leases.`,
      trend: "up",
      percentChange: Math.round((totalPaid / (totalPaid + activeLeases.reduce((s, l) => s + (l.totalPayable - l.amountPaid), 0))) * 100),
      category: "Payments",
    })
  }

  const deviceTypes = new Set(activeLeases.map((l) => l.productName.includes("MacBook") || l.productName.includes("Laptop") ? "Laptop" : l.productName.includes("iPad") ? "Tablet" : "Smartphone"))
  if (deviceTypes.size > 1) {
    insights.push({
      id: "ci4",
      text: `You have a diverse portfolio with ${deviceTypes.size} different device types financed.`,
      trend: "up",
      percentChange: deviceTypes.size * 10,
      category: "Portfolio",
    })
  }

  const onTrack = activeLeases.filter((l) => l.status === "Active").length
  if (onTrack > 0 && onTrack === activeLeases.length) {
    insights.push({
      id: "ci5",
      text: `All your leases are on track. Keep up the good work!`,
      trend: "up",
      percentChange: 100,
      category: "Status",
    })
  }

  return insights
}

export function CustomerAiInsights() {
  const insights = generateCustomerInsights(leaseAgreements)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-primary" />
          Your Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3"
        >
          {insights.map((insight, i) => (
            <motion.div
              key={insight.id}
              variants={item}
              className="flex gap-3 rounded-lg bg-muted/30 p-3"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <InsightIcon category={insight.category} />
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-sm leading-snug">{insight.text}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums",
                      insight.trend === "up" &&
                        "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                      insight.trend === "down" &&
                        "bg-red-500/10 text-red-600 dark:text-red-400",
                      insight.trend === "neutral" &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    <TrendIcon trend={insight.trend} />
                    {insight.percentChange > 0
                      ? `${insight.percentChange}%`
                      : "No change"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {insight.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
