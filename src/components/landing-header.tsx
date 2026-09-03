"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "motion/react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMode } from "@/contexts/mode-context"

const navigation = [
  {
    title: "For Sellers",
    href: "#sellers",
  },
  {
    title: "How It Works",
    href: "#how-it-works",
  },
  {
    title: "Resources",
    links: [
      { title: "Blog", href: "#blog" },
      { title: "Docs", href: "#docs" },
      { title: "Terms of Service", href: "#terms" },
      { title: "Privacy Policy", href: "#privacy" },
      { title: "Cookie Policy", href: "#cookies" },
    ],
  },
]

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mode } = useMode()

  const menuItems = navigation.filter((item): item is { title: string; links: { title: string; href: string }[] } => Boolean(item.links))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </motion.div>
            </Button>
          </div>
          <div className="flex sm:hidden">
            <Link href="/" className="font-light tracking-tighter text-lg">
              STRYK
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <Link href="/" className="font-light tracking-tighter text-2xl">
              STRYK
            </Link>

            {navigation.map((item) =>
              item.links ? (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="sm">
                        {item.title}
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      </Button>
                    }
                  >
                    {item.title}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    {item.links.map((link) => (
                      <DropdownMenuItem key={link.title} render={<Link href={link.href} />}>
                        {link.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ) : null
            )}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={mode === "vendor" ? "/vendor/overview" : "/customer/dashboard"}>
              <Button size="default" className="bg-black text-white hover:bg-black/90 rounded-lg">
                {mode === "vendor" ? "Launch App" : "My Dashboard"}
              </Button>
            </Link>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="sm:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-2 pt-2 pb-3 space-y-1"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" className="w-full justify-between">
                            {item.title}
                            <ChevronDownIcon className="h-4 w-4" />
                          </Button>
                        }
                      >
                        {item.title}
                        <ChevronDownIcon className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80">
                        {item.links.map((link) => (
                          <DropdownMenuItem key={link.title} render={<Link href={link.href} />}>
                            {link.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
