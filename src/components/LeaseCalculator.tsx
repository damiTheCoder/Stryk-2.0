"use client"

import { useState } from "react"
import { Calculator, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { USDCIcon } from "@/components/ui/usdc-icon"
import { cn } from "@/lib/utils"

interface LeaseCalculatorProps {
  onApply?: (values: CalculatorValues) => void
  className?: string
}

export interface CalculatorValues {
  devicePrice: number
  downPaymentPercent: number
  tenureMonths: number
  upfrontDue: number
  monthlyInstallment: number
  totalPayable: number
}

const DOWN_PAYMENT_OPTIONS = [10, 20, 30] as const
const TENURE_OPTIONS = [3, 6, 12] as const

export function LeaseCalculator({ onApply, className }: LeaseCalculatorProps) {
  const [price, setPrice] = useState(999)
  const [downPayment, setDownPayment] = useState<number>(20)
  const [tenure, setTenure] = useState<number>(6)

  const upfrontDue = Math.round(price * (downPayment / 100))
  const financed = price - upfrontDue
  const monthlyInstallment = Math.round(financed / tenure)
  const totalPayable = upfrontDue + monthlyInstallment * tenure

  const values: CalculatorValues = {
    devicePrice: price,
    downPaymentPercent: downPayment,
    tenureMonths: tenure,
    upfrontDue,
    monthlyInstallment,
    totalPayable,
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="size-4" />
          </div>
          <div>
            <CardTitle className="text-base">Lease Calculator</CardTitle>
            <CardDescription>Configure your stablecoin financing plan</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="device-price">Device Price</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="device-price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              className="pl-7"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="down-payment">Down Payment</Label>
          <Select
            value={String(downPayment)}
            onValueChange={(v) => setDownPayment(Number(v))}
          >
            <SelectTrigger id="down-payment">
              <SelectValue placeholder="Select %" />
            </SelectTrigger>
            <SelectContent>
              {DOWN_PAYMENT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                    {opt}% — $<span className="inline-flex items-center gap-1"><USDCIcon /> {Math.round(price * (opt / 100)).toLocaleString()}</span> upfront
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure">Tenure</Label>
          <Select
            value={String(tenure)}
            onValueChange={(v) => setTenure(Number(v))}
          >
            <SelectTrigger id="tenure">
              <SelectValue placeholder="Select months" />
            </SelectTrigger>
            <SelectContent>
              {TENURE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt} Month{opt > 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Upfront Due</span>
             <span className="font-semibold text-foreground flex items-center gap-1"><USDCIcon /> {upfrontDue.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly Installment</span>
             <span className="font-semibold text-foreground flex items-center gap-1"><USDCIcon /> {monthlyInstallment.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Payable</span>
             <span className="font-semibold text-foreground flex items-center gap-1"><USDCIcon /> {totalPayable.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={() => onApply?.(values)}>
          <Wallet className="mr-2 size-4" />
          Apply for Lease
        </Button>
      </CardFooter>
    </Card>
  )
}
