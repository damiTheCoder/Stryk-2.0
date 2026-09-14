"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const labelMap: Record<string, string> = {
  vendor: "Vendor",
  customer: "Customer",
  overview: "Dashboard",
  dashboard: "Dashboard",
  leases: "Active Lease",
  payouts: "Settlements",
  analytics: "Analytics",
  new: "New Lease",
  transactions: "Transactions",
  investments: "Asset To Liability Ratio",
  liability: "Cash To Liability Ratio",
  agreements: "Agreements",
  inventory: "Inventory",
  settings: "Settings",
  support: "Support",
  accounts: "Accounts",
  transfers: "Transfers",
  cards: "Cards",
  crypto: "Crypto",
  budgets: "Budgets",
  notifications: "Notifications",
  "sign-in": "Sign In",
  "sign-up": "Sign Up",
}

const hrefMap: Record<string, string> = {
  "/vendor": "/vendor/overview",
  "/customer": "/customer/dashboard",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const rawHref = "/" + segments.slice(0, index + 1).join("/")
          const href = hrefMap[rawHref] || rawHref
          const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
          const isLast = index === segments.length - 1

          return (
            <BreadcrumbItem key={rawHref} className="shrink-0">
              {isLast ? (
                <BreadcrumbPage className="text-base md:text-sm font-medium">{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink render={<Link href={href} />} className="whitespace-nowrap text-base md:text-sm hover:text-foreground hover:underline transition-colors">
                    {label}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="shrink-0" />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
