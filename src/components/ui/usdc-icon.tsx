"use client"

import { DollarSign } from "lucide-react"

export function USDCIcon({ className }: { className?: string }) {
  return (
    <DollarSign className={`size-4 text-green-600 ${className || ""}`} />
  )
}
