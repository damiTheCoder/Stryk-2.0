"use client"

import { useMemo, useState } from "react"
import { SmartphoneIcon, LaptopIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDownLeftIcon, WalletIcon } from "lucide-react"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

type CustomerPayment = {
  id: string
  date: string
  amount: number
  device: string
  category: string
  status: "completed" | "pending" | "failed"
  leaseId: string
}

function DeviceIcon({ category }: { category: string }) {
  if (category === "Laptop" || category === "Tablet") {
    return <LaptopIcon className="size-4 text-foreground" />
  }
  return <SmartphoneIcon className="size-4 text-foreground" />
}

function generatePaymentHistory(leases: LeaseAgreement[]): CustomerPayment[] {
  const payments: CustomerPayment[] = []

  leases.forEach((lease) => {
    const monthsPaid = Math.floor((lease.amountPaid / lease.monthlyInstallment))
    const today = new Date()

    for (let i = 0; i < monthsPaid; i++) {
      const paymentDate = new Date(today)
      paymentDate.setMonth(today.getMonth() - i)
      const dateStr = paymentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      let status: CustomerPayment["status"] = "completed"
      if (lease.status === "Defaulted") {
        status = "failed"
      }

      payments.push({
        id: `${lease.id}-payment-${i}`,
        date: dateStr,
        amount: lease.monthlyInstallment,
        device: `${lease.productBrand} ${lease.productName}`,
        category: lease.productName.includes("MacBook") || lease.productName.includes("Laptop") ? "Laptop" : lease.productName.includes("iPad") || lease.productName.includes("Tablet") ? "Tablet" : "Smartphone",
        status,
        leaseId: lease.id,
      })
    }
  })

  payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return payments
}

function statusBadge(status: CustomerPayment["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="default">Completed</Badge>
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-500 dark:text-amber-400">
          Pending
        </Badge>
      )
    case "failed":
      return <Badge variant="destructive">Failed</Badge>
  }
}

export function CustomerTransactionsPageClient() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const activeLeases = leaseAgreements.filter((l) => l.status !== "Defaulted")
  const totalPaid = activeLeases.reduce((sum, l) => sum + l.amountPaid, 0)
  const totalMonthly = activeLeases.reduce((sum, l) => sum + l.monthlyInstallment, 0)
  const allPayments = useMemo(() => generatePaymentHistory(activeLeases), [activeLeases])

  const filteredPayments = allPayments.filter((p) => {
    if (search) {
      const q = search.toLowerCase()
      return (
        p.device.toLowerCase().includes(q) ||
        p.leaseId.toLowerCase().includes(q) ||
        p.date.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") {
      return p.status === statusFilter
    }
    return true
  })

  const statusCounts = {
    all: allPayments.length,
    completed: allPayments.filter((p) => p.status === "completed").length,
    pending: allPayments.filter((p) => p.status === "pending").length,
    failed: allPayments.filter((p) => p.status === "failed").length,
  }

  const metrics = [
    {
      title: "Total Paid",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalPaid)}</span>,
      icon: <WalletIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Monthly Payments",
      value: <span className="inline-flex items-center gap-1.5"><USDCIcon /> {formatUSDC(totalMonthly)}</span>,
      icon: <ArrowDownLeftIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Active Leases",
      value: String(activeLeases.length),
      icon: <WalletIcon className="size-4 text-blue-600" />,
    },
    {
      title: "Total Transactions",
      value: String(allPayments.length),
      icon: <WalletIcon className="size-4 text-blue-600" />,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
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

      <div className="px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by device or lease ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Status:</Label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    <option value="all">All ({statusCounts.all})</option>
                    <option value="completed">Completed ({statusCounts.completed})</option>
                    <option value="pending">Pending ({statusCounts.pending})</option>
                    <option value="failed">Failed ({statusCounts.failed})</option>
                  </select>
                </div>
              </div>

              {filteredPayments.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No payment history found.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead className="hidden sm:table-cell">Lease ID</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="hidden lg:table-cell">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                                  <DeviceIcon category={payment.category} />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">{payment.device}</p>
                                  <Badge variant="secondary" className="mt-0.5 text-[10px]">
                                    {payment.category}
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <span className="font-mono text-xs text-muted-foreground">
                                {payment.leaseId}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className="tabular-nums text-sm font-semibold">
                                -{formatUSDC(payment.amount)}
                              </span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="text-sm text-muted-foreground">{payment.date}</span>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {statusBadge(payment.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
