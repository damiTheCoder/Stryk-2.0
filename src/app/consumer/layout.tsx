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

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <LeaseSidebar role="consumer" />
      <SidebarInset className="overflow-x-hidden">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-950/60 md:h-14">
          <div className="flex items-center gap-3 px-4">
            <SidebarTrigger className="-ml-1 size-10 md:size-9" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-5 data-vertical:self-auto md:data-vertical:h-4"
            />
            <Image src="/LO.png" alt="Stryk" width={24} height={24} className="size-6 rounded-lg object-contain md:hidden" />
            <DynamicBreadcrumb />
          </div>
          <div className="ml-auto flex items-center gap-2 pr-4">
            <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
            <ThemeToggle className="size-5 md:size-4" />
          </div>
        </header>
        <CommandPalette />
        <main className="mt-4 flex flex-1 flex-col overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
