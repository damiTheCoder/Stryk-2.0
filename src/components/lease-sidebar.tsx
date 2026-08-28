"use client"

import Image from "next/image"
import Link from "next/link"
import { LandmarkIcon, StoreIcon, UserIcon, ArrowLeftRightIcon, TrendingUpIcon, ChartAreaIcon, PlusIcon, WalletIcon, FileTextIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

const data = {
  user: {
    name: "Abderrahim G.",
    email: "abderrahim@fintech.com",
    avatar: "/avatars/1.png",
  },
  navVendorGroups: [
    {
      label: "Vendor Portal",
      items: [
        { title: "Dashboard", url: "/vendor/dashboard", icon: <StoreIcon /> },
        { title: "Active Leases", url: "/vendor/leases", icon: <FileTextIcon /> },
        { title: "New Lease", url: "/vendor/leases/new", icon: <PlusIcon /> },
        { title: "Settlements", url: "/vendor/payouts", icon: <WalletIcon /> },
      ],
    },
    {
      label: "Financial Portal",
      items: [
        { title: "Overview", url: "/vendor/overview", icon: <LandmarkIcon /> },
        { title: "Transactions", url: "/vendor/transactions", icon: <ArrowLeftRightIcon /> },
        { title: "Investments", url: "/vendor/investments", icon: <TrendingUpIcon /> },
        { title: "Analytics", url: "/vendor/analytics", icon: <ChartAreaIcon /> },
      ],
    },
  ],
  navConsumerGroups: [
    {
      label: "Consumer Portal",
      items: [
        { title: "Consumer Portal", url: "/portal", icon: <WalletIcon /> },
      ],
    },
  ],
}

export function LeaseSidebar({ role }: { role: "vendor" | "consumer" }) {
  const groups = role === "vendor" ? data.navVendorGroups : data.navConsumerGroups

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href={role === "vendor" ? "/vendor/dashboard" : "/portal"} />}>
              <div className="flex aspect-square size-10 items-center justify-center">
                <Image src="/LO.png" alt="Stryk" width={32} height={32} className="size-8 object-contain rounded-lg" />
              </div>
              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-semibold">Stryk</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={role === "vendor" ? data.navVendorGroups : data.navConsumerGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
