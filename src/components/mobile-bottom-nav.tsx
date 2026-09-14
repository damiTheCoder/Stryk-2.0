"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  PlusCircleIcon,
  WalletIcon,
  BarChart3Icon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "/vendor/overview",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Active Lease",
    href: "/vendor/leases",
    icon: FileTextIcon,
  },
  {
    label: "New Lease",
    href: "/vendor/leases/new",
    icon: PlusCircleIcon,
  },
  {
    label: "Settlements",
    href: "/vendor/payouts",
    icon: WalletIcon,
  },
  {
    label: "Analytics",
    href: "/vendor/analytics",
    icon: BarChart3Icon,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  // Only render on vendor pages
  if (!pathname.startsWith("/vendor")) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:hidden shadow-lg">
      <nav className="flex items-center justify-around px-1 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== "/vendor/overview" &&
              pathname.startsWith(item.href) &&
              item.href !== "/vendor/leases/new")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1 px-1.5 rounded-xl transition-all duration-200 min-w-[54px] flex-1",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full p-1 transition-transform duration-200",
                  isActive ? "bg-primary/10 scale-105" : ""
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    isActive ? "text-primary stroke-[2.2]" : "text-muted-foreground/80 stroke-[1.8]"
                  )}
                />
              </div>
              <span className="text-[10px] leading-none tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
