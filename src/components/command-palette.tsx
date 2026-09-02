"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  LayoutDashboardIcon,
  WalletIcon,
  ArrowLeftRightIcon,
  CreditCardIcon,
  SendIcon,
  TrendingUpIcon,
  BitcoinIcon,
  ChartAreaIcon,
  TargetIcon,
  SettingsIcon,
  BellIcon,
  LogInIcon,
  UserPlusIcon,
  LifeBuoyIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
  MonitorIcon,
  StoreIcon,
  UserIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { contacts, recentTransactions, cryptoCoins } from "@/data/seed"
import Image from "next/image"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const run = useCallback(
    (fn: () => void) => {
      setOpen(false)
      fn()
    },
    []
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Palette"
      description="Search pages, transactions, contacts, and more"
    >
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {[
              { label: "Overview", icon: <LayoutDashboardIcon className="mr-2 size-4" />, href: "/vendor/overview" },
              { label: "Transactions", icon: <ArrowLeftRightIcon className="mr-2 size-4" />, href: "/vendor/transactions" },
              { label: "Investments", icon: <TrendingUpIcon className="mr-2 size-4" />, href: "/vendor/investments" },
              { label: "Analytics", icon: <ChartAreaIcon className="mr-2 size-4" />, href: "/vendor/analytics" },
              { label: "Inventory", icon: <Image src="/LO.png" alt="Stryk" width={16} height={16} className="mr-2 size-4" />, href: "/vendor/inventory" },
              { label: "Buy Now Pay Later Agreements", icon: <UserIcon className="mr-2 size-4" />, href: "/vendor/agreements" },
              { label: "My Agreements", icon: <Image src="/LO.png" alt="Stryk" width={16} height={16} className="mr-2 size-4" />, href: "/consumer/leases" },
              { label: "Settings", icon: <SettingsIcon className="mr-2 size-4" />, href: "/vendor/settings" },
              { label: "Help & Support", icon: <LifeBuoyIcon className="mr-2 size-4" />, href: "/vendor/support" },
              { label: "Sign In", icon: <LogInIcon className="mr-2 size-4" />, href: "/sign-in" },
              { label: "Sign Up", icon: <UserPlusIcon className="mr-2 size-4" />, href: "/sign-up" },
            ].map((page) => (
              <CommandItem key={page.href} onSelect={() => run(() => router.push(page.href))}>
                {page.icon}
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Transactions">
            {recentTransactions.slice(0, 5).map((tx) => (
              <CommandItem key={tx.id} onSelect={() => run(() => router.push("/transactions"))}>
                <SearchIcon className="mr-2 size-4" />
                {tx.merchant}
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Transfer">
            {contacts.slice(0, 4).map((c) => (
              <CommandItem key={c.id} onSelect={() => run(() => router.push("/transfers"))}>
                <SendIcon className="mr-2 size-4" />
                Send to {c.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Crypto">
            {cryptoCoins.slice(0, 4).map((coin) => (
              <CommandItem key={coin.id} onSelect={() => run(() => router.push("/crypto"))}>
                <BitcoinIcon className="mr-2 size-4" />
                {coin.name}
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  ${coin.price.toLocaleString()}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => run(() => setTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              Light Mode
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              Dark Mode
            </CommandItem>
            <CommandItem onSelect={() => run(() => setTheme("system"))}>
              <MonitorIcon className="mr-2 size-4" />
              System Theme
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
