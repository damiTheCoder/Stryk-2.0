"use client"

import Image from "next/image"

export function USDCIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/usdc.png"
      alt="USDC"
      width={20}
      height={20}
      className={`size-5 rounded-full object-contain align-middle ${className || ""}`}
    />
  )
}
