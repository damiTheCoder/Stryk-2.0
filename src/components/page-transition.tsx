"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"

export function PageTransition() {
  const [loading, setLoading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(true)
    setFadeOut(false)

    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      onTransitionEnd={() => {
        if (fadeOut) setLoading(false)
      }}
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
