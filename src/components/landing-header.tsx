"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons"
import { PanelLeft } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
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
                {isMenuOpen ? <Cross1Icon className="size-5" /> : <PanelLeft className="size-5" />}
              </motion.div>
            </Button>
          </div>
          <div className="flex sm:hidden">
            <Link href="/" className="flex items-center gap-2 font-light tracking-tighter text-lg">
              <NextImage src="/brand-logo.png" alt="Stryk" width={24} height={24} className="size-6 rounded-full border border-black dark:border-black object-contain" />
              <span>STRYK</span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center">
            <Link href="/" className="flex items-center gap-2 font-light tracking-tighter text-2xl">
              <NextImage src="/brand-logo.png" alt="Stryk" width={28} height={28} className="size-7 rounded-full border border-black dark:border-black object-contain" />
              <span>STRYK</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
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
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={mode === "vendor" ? "/vendor/overview" : "/customer/dashboard"}>
              <Button size="default" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium shadow-sm shadow-primary/20">
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
