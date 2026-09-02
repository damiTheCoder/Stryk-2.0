"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, LaptopIcon, SmartphoneIcon, TrendingUpIcon, WalletIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function statusVariant(status: LeaseAgreement["status"]) {
  if (status === "Active") return "default"
  if (status === "Defaulted") return "destructive"
  return "secondary"
}

function DeviceIcon({ category }: { category: string }) {
  if (category === "Laptop" || category === "Tablet") {
    return <LaptopIcon className="size-4 text-muted-foreground" />
  }
  return <SmartphoneIcon className="size-4 text-muted-foreground" />
}

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params.id as string

  const customerLeases = leaseAgreements.filter((l) => l.consumerId === customerId)
  const customer = customerLeases[0]

  if (!customer) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 pt-0">
        <h1 className="text-2xl font-semibold">Customer Not Found</h1>
        <Link href="/vendor/leases">
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Leases
          </Button>
        </Link>
      </div>
    )
  }

  const totalPayable = customerLeases.reduce((sum, l) => sum + l.totalPayable, 0)
  const totalPaid = customerLeases.reduce((sum, l) => sum + l.amountPaid, 0)
  const totalDue = totalPayable - totalPaid
  const activeLeases = customerLeases.filter((l) => l.status === "Active").length
  const defaultedLeases = customerLeases.filter((l) => l.status === "Defaulted").length
  const completedLeases = customerLeases.filter((l) => l.status === "Completed").length

  const metrics = [
    {
      title: "Total Payable",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <USDCIcon /> {formatUSDC(totalPayable)}
        </span>
      ),
      icon: WalletIcon,
    },
    {
      title: "Amount Paid",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <USDCIcon /> {formatUSDC(totalPaid)}
        </span>
      ),
      icon: TrendingUpIcon,
    },
    {
      title: "Amount Due",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <USDCIcon /> {formatUSDC(totalDue)}
        </span>
      ),
      icon: WalletIcon,
    },
    {
      title: "Active Leases",
      value: activeLeases.toString(),
      icon: LaptopIcon,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-x-hidden md:p-6 md:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 md:px-0">
        <div className="flex items-center gap-4">
          <Link href="/vendor/leases">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeftIcon className="size-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <img
              src={customer.consumerAvatar}
              alt={customer.consumerName}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{customer.consumerName}</h1>
              <p className="text-muted-foreground text-sm">
                Customer ID: {customerId} · {customerLeases.length} Buy Now Pay Later agreement{customerLeases.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant={defaultedLeases > 0 ? "destructive" : "default"}>
            {defaultedLeases > 0 ? `${defaultedLeases} Defaulted` : "Good Standing"}
          </Badge>
        </div>
      </div>

      {/* Mobile bordered rows */}
      <div className="sm:hidden divide-y">
        {metrics.map((metric) => (
          <div key={metric.title} className="py-4 px-4">
            <span className="text-sm text-muted-foreground">{metric.title}</span>
            <div className="text-base font-semibold flex items-center gap-1.5 mt-1">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Desktop cards */}
      <div className="hidden sm:grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} size="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="size-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold flex items-center gap-1 md:text-2xl">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Buy Now Pay Later Agreements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[640px] md:min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Device</TableHead>
                  <TableHead className="min-w-[100px]">Start Date</TableHead>
                  <TableHead className="min-w-[80px]">Tenure</TableHead>
                  <TableHead className="min-w-[100px]">Monthly</TableHead>
                  <TableHead className="min-w-[100px]">Total Payable</TableHead>
                  <TableHead className="min-w-[100px]">Amount Paid</TableHead>
                  <TableHead className="min-w-[100px]">Amount Due</TableHead>
                  <TableHead className="min-w-[140px]">Progress</TableHead>
                  <TableHead className="min-w-[100px]">Next Due</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerLeases.map((lease) => {
                  const amountDue = lease.totalPayable - lease.amountPaid
                  return (
                    <TableRow key={lease.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                            <DeviceIcon category={lease.productBrand} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{lease.productBrand} {lease.productName}</span>
                            <span className="text-xs text-muted-foreground">{formatUSDC(lease.devicePrice)} retail</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tabular-nums text-sm">{lease.startDate}</TableCell>
                      <TableCell className="tabular-nums text-sm">{lease.tenureMonths} months</TableCell>
                      <TableCell>
                        <span className="font-medium tabular-nums inline-flex items-center gap-1">
                          <USDCIcon /> {formatUSDC(lease.monthlyInstallment)}/mo
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium tabular-nums inline-flex items-center gap-1">
                          <USDCIcon /> {formatUSDC(lease.totalPayable)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium tabular-nums inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <USDCIcon /> {formatUSDC(lease.amountPaid)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium tabular-nums inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <USDCIcon /> {formatUSDC(amountDue)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={lease.progress} className="h-1.5 w-20" />
                          <span className="text-xs tabular-nums text-muted-foreground">{lease.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="tabular-nums text-sm">{lease.nextDueDate}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(lease.status)}>{lease.status}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}