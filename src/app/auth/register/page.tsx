"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  LandmarkIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  CheckIcon,
  ShieldCheckIcon,
  StoreIcon,
  WalletIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { USDCIcon } from "@/components/ui/usdc-icon"
import dynamic from "next/dynamic"

const GlobeDemo = dynamic(() => import("@/components/globe-demo"), {
  ssr: false,
})

export default function VendorRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [businessType, setBusinessType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 2000)
    }, 1500)
  }

  return (
    <div className="flex min-h-svh">
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-950 lg:flex">
        <Link href="/" className="relative z-20 flex items-center gap-2.5 p-8">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white text-black">
            <LandmarkIcon className="size-4" />
          </div>
          <span className="text-sm font-semibold text-white">Stryk Lease</span>
        </Link>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <GlobeDemo />
        </div>

        <div className="relative z-20 mt-auto p-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <blockquote className="text-sm leading-relaxed text-white/80">
              &ldquo;Enable lease-to-own for your customers in minutes. Get paid instantly in <span className="inline-flex items-center gap-1"><USDCIcon /></span>.&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-white/50">— Stryk Lease</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LandmarkIcon className="size-5" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Vendor Onboarding</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Set up your business to start issuing leases
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <StoreIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput id="businessName" type="text" placeholder="Acme Electronics" required />
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <MailIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput id="email" type="email" placeholder="vendor@company.com" required />
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet">Settlement Wallet (USDC)</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <WalletIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput id="wallet" type="text" placeholder="0x..." required />
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={businessType} onValueChange={(v) => { if (v) setBusinessType(v) }}>
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Electronics Retailer</SelectItem>
                  <SelectItem value="online">E-commerce Store</SelectItem>
                  <SelectItem value="pos">POS / In-Store</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LockIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-3.5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-3.5 text-muted-foreground" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex items-start gap-2.5">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="font-medium text-foreground underline-offset-4 transition-colors hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || isSuccess || !agreed}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckIcon className="size-4" />
                    <span>Account created!</span>
                  </>
                ) : (
                  <span>Complete Onboarding</span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60">
            <ShieldCheckIcon className="size-3.5" />
            <span>256-bit SSL encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
