"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LandmarkIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  CheckIcon,
  ShieldCheckIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import dynamic from "next/dynamic"

const GlobeDemo = dynamic(() => import("@/components/globe-demo"), {
  ssr: false,
})

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        router.push("/vendor/overview")
      }, 1200)
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
              &ldquo;The best time to start leasing was yesterday. The second best time is now.&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-white/50">— Financial Wisdom</p>
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
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Sign in to your vendor account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <MailIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="vendor@company.com"
                  required
                />
              </InputGroup>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <LockIcon className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <div className="pt-1">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckIcon className="size-4" />
                    <span>Success!</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Vendor onboarding
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
