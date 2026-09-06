"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { leaseOverview } from "@/data/seed"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"



const chartConfig = {
  currentYear: {
    label: "This Year",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

// Map month names to month indices (0-based)
const monthIndex: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

export function FinancialOverview() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 11, 31),
  })

  const filteredData = useMemo(() => {
    if (!date?.from || !date?.to) return leaseOverview
    let fromMonth = date.from.getMonth()
    let toMonth = date.to.getMonth()
    if (toMonth - fromMonth < 2) {
      fromMonth = Math.max(0, fromMonth - 1)
      toMonth = Math.min(11, toMonth + 1)
    }
    return leaseOverview.filter((d) => {
      const m = monthIndex[d.month]
      return m >= fromMonth && m <= toMonth
    })
  }, [date])

  const totals = useMemo(() => {
    const current = filteredData.reduce((s, d) => s + d.currentYear, 0)
    return current
  }, [filteredData])

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-col gap-3 space-y-0 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Installment Plan Portfolio Overview
          </CardTitle>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary" />
              This Year{" "}
              <span className="font-medium text-foreground">
                ${totals.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className={cn(
                  "h-8 w-full justify-start text-left text-xs font-normal border-0 hover:bg-accent sm:w-[200px] sm:border",
                  !date && "text-muted-foreground"
                )}
              />
            }
          >
            <CalendarIcon className="mr-2 size-3.5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM yyyy")} - {format(date.to, "MMM yyyy")}
                </>
              ) : (
                format(date.from, "MMM yyyy")
              )
            ) : (
              "Pick a date range"
            )}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart
            data={filteredData}
            margin={{ top: 8, right: 8, bottom: 0, left: -20 }}
          >
            <defs>
              <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => label}
                  formatter={(value) =>
                    `$${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <Area
              dataKey="currentYear"
              type="linear"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#fillCurrent)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
