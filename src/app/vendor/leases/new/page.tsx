"use client"

import { useState } from "react"
import { ArrowLeftIcon, CalculatorIcon, CopyIcon, ShareIcon, SmartphoneIcon, LaptopIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLeaseAgreement } from "@/contexts/lease-agreement-context"
import { cn } from "@/lib/utils"
import { USDCIcon } from "@/components/ui/usdc-icon"

const DOWN_PAYMENT_OPTIONS = [10, 20, 30] as const
const TENURE_OPTIONS = [3, 6, 12] as const

export default function NewLeasePage() {
  const [devicePrice, setDevicePrice] = useState(999)
  const [downPayment, setDownPayment] = useState(20)
  const [tenure, setTenure] = useState(6)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerWhatsApp, setCustomerWhatsApp] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [guarantor1Phone, setGuarantor1Phone] = useState("")
  const [guarantor1Address, setGuarantor1Address] = useState("")
  const [guarantor2Phone, setGuarantor2Phone] = useState("")
  const [guarantor2Address, setGuarantor2Address] = useState("")
  const [device, setDevice] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)
  const [agreementId, setAgreementId] = useState<string | null>(null)
  const router = useRouter()
  const { setDraft } = useLeaseAgreement()

  const upfrontDue = Math.round(devicePrice * (downPayment / 100))
  const financed = devicePrice - upfrontDue
  const monthlyInstallment = Math.round(financed / tenure)

  const handleGenerate = () => {
    const newId = `AGR-${Date.now().toString(36).toUpperCase()}`
    setAgreementId(newId)
    setGenerated(true)
  }

  const handlePreview = () => {
    const deviceName = device === "iphone16" ? "iPhone 16 Pro" : device === "macbook" ? "MacBook Air M3" : null
    const deviceBrand = device === "iphone16" ? "Apple" : device === "macbook" ? "Apple" : null
    const draft = {
      id: agreementId || "",
      customerName,
      customerEmail,
      customerPhone,
      customerWhatsApp,
      customerAddress,
      guarantor1Phone,
      guarantor1Address,
      guarantor2Phone,
      guarantor2Address,
      device,
      devicePrice,
      downPayment,
      downPaymentPercent: downPayment,
      downPaymentAmount: upfrontDue,
      tenure,
      upfrontDue,
      monthlyInstallment,
      totalPayable: upfrontDue + monthlyInstallment * tenure,
      amountPaid: 0,
      progress: 0,
      nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Active",
      productBrand: deviceBrand || undefined,
      productName: deviceName || undefined,
    }
    setDraft(draft)
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(`lease-draft-${agreementId}`, JSON.stringify(draft))
      } catch {}
    }
    router.push(`/sign/${(agreementId || "").toLowerCase()}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center gap-4">
        <Link href="/vendor/leases">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeftIcon className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Buy Now Pay Later Agreement</h1>
          <p className="text-muted-foreground text-sm">
            Configure terms and generate a signing link for the customer.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Customer & Device</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="jane@example.com"
                />
               </div>
             </div>

             <div className="grid gap-4 sm:grid-cols-2">
               <div className="space-y-2">
                 <Label htmlFor="customerPhone">Phone Number</Label>
                 <Input
                   id="customerPhone"
                   value={customerPhone}
                   onChange={(e) => setCustomerPhone(e.target.value)}
                   placeholder="+1 555 000 0000"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="customerWhatsApp">WhatsApp Number</Label>
                 <Input
                   id="customerWhatsApp"
                   value={customerWhatsApp}
                   onChange={(e) => setCustomerWhatsApp(e.target.value)}
                   placeholder="+1 555 000 0000"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <Label htmlFor="customerAddress">Address</Label>
               <Input
                 id="customerAddress"
                 value={customerAddress}
                 onChange={(e) => setCustomerAddress(e.target.value)}
                 placeholder="123 Main St, City, Country"
               />
             </div>

             <Separator />

             <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guarantor 1</p>
             <div className="grid gap-4 sm:grid-cols-2">
               <div className="space-y-2">
                 <Label htmlFor="guarantor1Phone">Guarantor 1 Phone Number</Label>
                 <Input
                   id="guarantor1Phone"
                   value={guarantor1Phone}
                   onChange={(e) => setGuarantor1Phone(e.target.value)}
                   placeholder="+1 555 000 0000"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="guarantor1Address">Guarantor 1 House Address</Label>
                 <Input
                   id="guarantor1Address"
                   value={guarantor1Address}
                   onChange={(e) => setGuarantor1Address(e.target.value)}
                   placeholder="123 Main St, City, Country"
                 />
               </div>
             </div>

             <Separator />

             <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guarantor 2</p>
             <div className="grid gap-4 sm:grid-cols-2">
               <div className="space-y-2">
                 <Label htmlFor="guarantor2Phone">Guarantor 2 Phone Number</Label>
                 <Input
                   id="guarantor2Phone"
                   value={guarantor2Phone}
                   onChange={(e) => setGuarantor2Phone(e.target.value)}
                   placeholder="+1 555 000 0000"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="guarantor2Address">Guarantor 2 House Address</Label>
                 <Input
                   id="guarantor2Address"
                   value={guarantor2Address}
                   onChange={(e) => setGuarantor2Address(e.target.value)}
                   placeholder="123 Main St, City, Country"
                 />
               </div>
             </div>

             <Separator />

            <div className="space-y-2">
              <Label htmlFor="device">Device</Label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger id="device">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iphone16">
                    <div className="flex items-center gap-2">
                      <SmartphoneIcon className="size-4" />
                      iPhone 16 Pro — $1,199
                    </div>
                  </SelectItem>
                  <SelectItem value="macbook">
                    <div className="flex items-center gap-2">
                      <LaptopIcon className="size-4" />
                      MacBook Air M3 — $1,099
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
               <Label htmlFor="price">Device Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="price"
                  type="number"
                  value={devicePrice}
                  onChange={(e) => setDevicePrice(Math.max(0, Number(e.target.value)))}
                  className="pl-7"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Financing Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment</Label>
              <Select value={String(downPayment)} onValueChange={(v) => { if (v) setDownPayment(Number(v)) }}>
                <SelectTrigger id="downPayment">
                  <SelectValue placeholder="Select %" />
                </SelectTrigger>
                <SelectContent>
                  {DOWN_PAYMENT_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={String(opt)}>
                      {opt}% — ${Math.round(devicePrice * (opt / 100)).toLocaleString()} upfront
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure</Label>
              <Select value={String(tenure)} onValueChange={(v) => { if (v) setTenure(Number(v)) }}>
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

            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Upfront Due</span>
                 <span className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {upfrontDue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Installment</span>
                 <span className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {monthlyInstallment.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Payable</span>
                 <span className="font-semibold tabular-nums flex items-center gap-1"><USDCIcon /> {(upfrontDue + monthlyInstallment * tenure).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleGenerate} disabled={!customerName || !customerEmail || !device}>
              <CalculatorIcon className="mr-2 size-4" />
              Generate Agreement
            </Button>
          </CardFooter>
        </Card>
      </div>

      {generated && agreementId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Agreement Generated</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Agreement ID: {agreementId}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with {customerName} to review and sign the Buy Now Pay Later agreement.
            </p>
            <div className="flex items-center gap-2">
              <Input readOnly value={`${typeof window !== "undefined" ? window.location.origin : ""}/sign/${agreementId.toLowerCase()}`} />
              <Button variant="outline" size="icon-sm">
                <CopyIcon className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm">
                <ShareIcon className="size-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePreview}>
              Preview Agreement
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
