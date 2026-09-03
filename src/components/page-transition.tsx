"use client"

import { useLayoutEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"

export function PageTransition() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useLayoutEffect(() => {
    setMounted(true)

    const timer = setTimeout(() => {
      setMounted(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-blur-out"
      key={pathname + searchParams.toString()}
    >
      <Image
        src="/LO.png"
        alt="Stryk"
        width={120}
        height={120}
        className="size-28 rounded-2xl object-contain"
      />
    </div>
  )
}
