"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusIcon, SearchIcon, UserIcon, SmartphoneIcon, LaptopIcon, MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function installmentStatus(lease: LeaseAgreement): "Paid" | "Pending" | "Defaulted" {
  if (lease.status === "Defaulted") return "Defaulted"
  if (lease.progress >= 100) return "Paid"
  return "Pending"
}

function statusVariant(status: "Paid" | "Pending" | "Defaulted") {
  if (status === "Paid") return "secondary"
  if (status === "Pending") return "default"
  return "destructive"
}

const devices = [
  { value: "iphone", label: "iPhone 16 Pro", icon: <SmartphoneIcon className="size-4" /> },
  { value: "macbook", label: "MacBook Air M3", icon: <LaptopIcon className="size-4" /> },
]

export default function VendorLeasesPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string | null>("all")

  const filtered = leaseAgreements.filter((l) => {
    const matchesSearch = l.consumerName.toLowerCase().includes(search.toLowerCase()) ||
      l.productName.toLowerCase().includes(search.toLowerCase())
    if (filter === "all") return matchesSearch
    const status = installmentStatus(l).toLowerCase()
    return matchesSearch && status === filter
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Active Leases</h1>
          <p className="text-muted-foreground text-sm">
            Track installment statuses and customer ownership progression.
          </p>
        </div>
        <Link href="/vendor/leases/new">
          <Button>
            <PlusIcon className="mr-2 size-4" />
            New Buy Now Pay Later Agreement
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">Buy Now Pay Later Ledger</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search customer or device..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 sm:w-64"
              />
            </div>
            <Select value={filter ?? "all"} onValueChange={(v) => setFilter(v)}>
              <SelectTrigger className="sm:w-40">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="defaulted">Defaulted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Installment</TableHead>
                <TableHead>Ownership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lease) => {
                const status = installmentStatus(lease)
                return (
                  <TableRow key={lease.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={lease.consumerAvatar}
                          alt={lease.consumerName}
                          className="size-8 rounded-full object-cover shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <Link href={`/vendor/customers/${lease.consumerId}`} className="font-medium truncate text-primary hover:underline">
                            {lease.consumerName}
                          </Link>
                          <span className="text-xs text-muted-foreground truncate">Started {lease.startDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                          {lease.productName.includes("iPhone") ? <SmartphoneIcon className="size-4 text-muted-foreground" /> : <LaptopIcon className="size-4 text-muted-foreground" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{lease.productBrand} {lease.productName}</span>
                            <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(lease.devicePrice)} retail</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                         <span className="font-medium tabular-nums inline-flex items-center gap-1"><USDCIcon /> {formatUSDC(lease.monthlyInstallment)}/mo</span>
                        <span className="text-xs text-muted-foreground">{lease.tenureMonths} months</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={lease.progress} className="h-1.5 w-20" />
                        <span className="text-xs tabular-nums text-muted-foreground">{lease.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(status)}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
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
