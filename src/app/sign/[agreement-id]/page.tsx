"use client"

import { useParams } from "next/navigation"
import { SmartphoneIcon, WalletIcon, CheckCircleIcon, UserIcon, PhoneIcon, HomeIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { leaseAgreements } from "@/data/seed"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"
import { useLeaseAgreement } from "@/contexts/lease-agreement-context"
import { useState, useEffect } from "react"

function formatUSDC(value: number) {
  return value.toLocaleString()
}

function getDraftFromStorage(agreementId?: string) {
  if (typeof window === "undefined" || !agreementId) return null
  try {
    const raw = window.sessionStorage.getItem(`lease-draft-${agreementId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function SignAgreementPage() {
  const params = useParams()
  const agreementId = params["agreement-id"] as string
  const { draft } = useLeaseAgreement()
  const storageDraft = getDraftFromStorage(agreementId)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const agreement = draft && draft.id.toLowerCase() === agreementId.toLowerCase()
    ? null
    : leaseAgreements.find((l) => l.id === agreementId || agreementId.includes(l.id.toLowerCase()))

  const displayAgreement = draft && draft.id.toLowerCase() === agreementId.toLowerCase() ? draft : (storageDraft || agreement)

  if (!displayAgreement) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Agreement Not Found</h1>
          <p className="mt-2 text-muted-foreground">This lease agreement link is invalid or has expired.</p>
        </div>
      </div>
    )
  }

  const remaining = (displayAgreement as any).totalPayable - ((displayAgreement as any).amountPaid || 0)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <SmartphoneIcon className="size-6" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Lease Agreement</h1>
        <p className="text-muted-foreground text-sm">
          Review your payment plan and sign to accept the lease.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{displayAgreement.productBrand || ""} {displayAgreement.productName || ""}</CardTitle>
              <p className="text-xs text-muted-foreground">Agreement ID: {displayAgreement.id.toUpperCase?.() || displayAgreement.id}</p>
            </div>
            <Badge variant="default">{displayAgreement.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`rounded-lg p-4 ${isMobile ? "" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">Device Price</p>
               <p className="text-lg font-semibold tabular-nums flex items-center gap-1.5"><USDCIcon /> {formatUSDC(displayAgreement.devicePrice)}</p>
            </div>
            <div className={`rounded-lg p-4 ${isMobile ? "" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">Down Payment</p>
               <p className="text-lg font-semibold tabular-nums flex items-center gap-1.5"><USDCIcon /> {formatUSDC(displayAgreement.downPaymentAmount)} ({displayAgreement.downPaymentPercent}%)</p>
            </div>
            <div className={`rounded-lg p-4 ${isMobile ? "" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">Monthly Installment</p>
               <p className="text-lg font-semibold tabular-nums flex items-center gap-1.5"><USDCIcon /> {formatUSDC(displayAgreement.monthlyInstallment)}</p>
            </div>
            <div className={`rounded-lg p-4 ${isMobile ? "" : "bg-muted/50"}`}>
              <p className="text-xs text-muted-foreground">Tenure</p>
               <p className="text-lg font-semibold tabular-nums">{displayAgreement.tenureMonths} months</p>
            </div>
          </div>

          <Separator />

          {"customerName" in displayAgreement && (
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer Details</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <UserIcon className="size-3" />
                    Name
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.customerName}</p>
                </div>
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PhoneIcon className="size-3" />
                    Phone
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.customerPhone || "—"}</p>
                </div>
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PhoneIcon className="size-3" />
                    WhatsApp
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.customerWhatsApp || "—"}</p>
                </div>
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <HomeIcon className="size-3" />
                    Address
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.customerAddress || "—"}</p>
                </div>
              </div>
            </div>
          )}

          {"guarantor1Phone" in displayAgreement && (
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guarantor 1</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PhoneIcon className="size-3" />
                    Phone
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.guarantor1Phone || "—"}</p>
                </div>
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <HomeIcon className="size-3" />
                    House Address
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.guarantor1Address || "—"}</p>
                </div>
              </div>
            </div>
          )}

          {"guarantor2Phone" in displayAgreement && (
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guarantor 2</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PhoneIcon className="size-3" />
                    Phone
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.guarantor2Phone || "—"}</p>
                </div>
                <div className={`rounded-lg p-3 ${isMobile ? "" : "bg-muted/50"}`}>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <HomeIcon className="size-3" />
                    House Address
                  </div>
                  <p className="text-sm font-medium">{displayAgreement.guarantor2Address || "—"}</p>
                </div>
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ownership Progress</span>
              <span className="font-semibold tabular-nums">{(displayAgreement as any).progress ?? 0}%</span>
            </div>
            <Progress value={(displayAgreement as any).progress ?? 0} className="h-2" />
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Remaining Balance</span>
            <span className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {formatUSDC(remaining)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next Due Date</span>
            <span className="font-semibold tabular-nums">{(displayAgreement as any).nextDueDate || "—"}</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button className="w-full" size="lg">
            <WalletIcon className="mr-2 size-4" />
            Connect Wallet & Sign Agreement
          </Button>
          <p className="text-xs text-muted-foreground">
            By signing, you authorize automated <span className="inline-flex items-center gap-1"><USDCIcon /></span> debit payments for the agreed tenure.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
