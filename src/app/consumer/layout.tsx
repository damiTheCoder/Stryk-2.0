"use client"

import Image from "next/image"
import { LeaseSidebar } from "@/components/lease-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { CommandPalette } from "@/components/command-palette"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMode } from "@/contexts/mode-context"
import { StoreIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter, usePathname } from "next/navigation"

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { mode, setMode } = useMode()
  const router = useRouter()
  const pathname = usePathname()

  const handleModeChange = (next: "vendor" | "customer") => {
    setMode(next)
    if (pathname.startsWith("/vendor") || pathname.startsWith("/consumer") || pathname.startsWith("/customer")) {
      router.replace(next === "vendor" ? "/vendor/overview" : "/customer/dashboard")
    }
  }

  return (
    <SidebarProvider>
      <LeaseSidebar role={mode} />
      <SidebarInset className="overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-950/60 md:h-14">
          <div className="flex items-center gap-3 px-4">
            <SidebarTrigger className="-ml-1 size-8 [&_svg]:size-6 md:[&_svg]:size-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-5 data-vertical:self-auto md:data-vertical:h-4"
            />
            <Image src="/LO.png" alt="Stryk" width={32} height={32} className="size-8 rounded-lg border border-black/10 dark:border-white/10 object-contain md:hidden" />
            <DynamicBreadcrumb />
          </div>
          <div className="ml-auto flex items-center gap-1 pr-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon"
                    onClick={() => handleModeChange(mode === "vendor" ? "customer" : "vendor")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {mode === "vendor" ? (
                      <StoreIcon className="size-4" />
                    ) : (
                      <UserIcon className="size-4" />
                    )}
                  </Button>
                }
              >
                <span className="sr-only">Switch mode</span>
              </TooltipTrigger>
              <TooltipContent>
                Switch to {mode === "vendor" ? "Customer" : "Vendor"} mode
              </TooltipContent>
            </Tooltip>
            <ThemeToggle className="size-8 [&_svg]:!size-4 md:[&_svg]:!size-4" />
          </div>
        </header>
        <CommandPalette />
        <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}