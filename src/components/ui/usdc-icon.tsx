"use client"

import Image from "next/image"

export function USDCIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/usdc.png"
      alt="USDC"
      width={16}
      height={16}
      className={`size-4 rounded-full object-contain align-middle ${className || ""}`}
    />
  )
}
