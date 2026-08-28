import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { leaseAgreements } from "@/data/seed"
import { LandmarkIcon } from "lucide-react"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return `$${value.toLocaleString()}`
  }

export function SpendingLimit() {
  const totalValue = leaseAgreements.reduce((s, l) => s + l.totalPayable, 0)
  const collected = leaseAgreements.reduce((s, l) => s + l.amountPaid, 0)
  const activeLeases = leaseAgreements.filter((l) => l.status === "Active").length
  const percentCollected = Math.round((collected / totalValue) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Lease Portfolio
        </CardTitle>
        <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
          <LandmarkIcon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground">Total Lease Value</p>
          <p className="text-2xl font-bold tabular-nums tracking-tight flex items-center gap-1">
            <USDCIcon /> {formatUSDC(totalValue)}
          </p>
        </div>

        <Progress value={percentCollected} className="h-2" />

        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Collected</p>
            <p className="font-semibold tabular-nums flex items-center gap-1">
              <USDCIcon /> {formatUSDC(collected)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Active Leases</p>
            <p className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
              {activeLeases}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
