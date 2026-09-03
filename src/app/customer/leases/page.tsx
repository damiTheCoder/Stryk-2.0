"use client"

import { useState } from "react"
import { SmartphoneIcon, LaptopIcon, WalletIcon, LinkIcon, CheckCircleIcon, MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { leaseAgreements } from "@/data/seed"
import { LeaseAgreement } from "@/types/lease"
import { USDCIcon } from "@/components/ui/usdc-icon"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function DeviceIcon({ category }: { category: string }) {
  if (category === "Laptop" || category === "Tablet") {
    return <LaptopIcon className="size-4 text-foreground" />
  }
  return <SmartphoneIcon className="size-4 text-foreground" />
}

function statusVariant(status: string) {
  if (status === "Completed") return "secondary"
  if (status === "Active") return "default"
  return "destructive"
}

export default function CustomerLeasesPage() {
  const [linkInput, setLinkInput] = useState("")
  const [linkedLeases, setLinkedLeases] = useState<LeaseAgreement[]>([])
  const [error, setError] = useState("")

  const activeLeases = leaseAgreements.filter((l) => l.status !== "Defaulted")
  const allLeases = [...linkedLeases, ...activeLeases]

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!linkInput.trim()) {
      setError("Please enter a link")
      return
    }

    const idMatch = linkInput.match(/\/sign\/([^/?]+)/)
    if (!idMatch) {
      setError("Invalid link format. Expected /sign/AGR-XXXXX")
      return
    }

    const agreementId = idMatch[1].toUpperCase()
    const found = leaseAgreements.find((l) => l.id === agreementId || l.id.toLowerCase() === agreementId.toLowerCase())

    if (!found) {
      setError("Agreement not found")
      return
    }

    if (linkedLeases.some((l) => l.id === found.id)) {
      setError("This agreement is already linked")
      return
    }

    setLinkedLeases((prev) => [...prev, found])
    setLinkInput("")
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Active Leases</h1>
        <p className="text-muted-foreground text-sm">
          View your financed devices and manage installment payments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Link a New Agreement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLinkSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="link">Agreement Link</Label>
              <div className="relative">
                <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="link"
                  placeholder="Paste your agreement link here..."
                  value={linkInput}
                  onChange={(e) => {
                    setLinkInput(e.target.value)
                    setError("")
                  }}
                  className="pl-8"
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <LinkIcon className="mr-2 size-4" />
              Link Agreement
            </Button>
          </form>
        </CardContent>
      </Card>

      {allLeases.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No active Buy Now Pay Later agreements found.</p>
            <p className="text-sm text-muted-foreground mt-2">Paste a vendor agreement link above to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Leases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead className="hidden sm:table-cell">Lease ID</TableHead>
                      <TableHead className="text-right">Monthly</TableHead>
                      <TableHead className="hidden md:table-cell">Remaining</TableHead>
                      <TableHead className="hidden lg:table-cell">Progress</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allLeases.map((lease) => {
                      const remaining = lease.totalPayable - lease.amountPaid
                      const isPaid = lease.status === "Completed"
                      const category = lease.productName.includes("MacBook") || lease.productName.includes("Laptop") ? "Laptop" : lease.productName.includes("iPad") ? "Tablet" : "Smartphone"
                      return (
                        <TableRow key={lease.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                                <DeviceIcon category={category} />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">
                                  {lease.productBrand} {lease.productName}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Started {lease.startDate} · {lease.tenureMonths} mo
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="font-mono text-xs text-muted-foreground">
                              {lease.id}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-sm font-semibold tabular-nums inline-flex items-center gap-1 justify-end">
                              <USDCIcon /> {formatUSDC(lease.monthlyInstallment)}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm tabular-nums inline-flex items-center gap-1">
                              <USDCIcon /> {formatUSDC(remaining)}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Progress value={lease.progress} className="h-1.5 w-16" />
                              <span className="text-xs tabular-nums text-muted-foreground">{lease.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={statusVariant(lease.status)}>{lease.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {isPaid ? (
                              <Button variant="secondary" size="sm" disabled className="hidden md:inline-flex">
                                <CheckCircleIcon className="mr-2 size-4" />
                                Transferred
                              </Button>
                            ) : (
                              <Button size="sm" className="hidden md:inline-flex">
                                <WalletIcon className="mr-2 size-4" />
                                Pay
                              </Button>
                            )}
                            <Button variant="ghost" size="icon-sm" className="md:hidden">
                              <MoreHorizontalIcon className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
