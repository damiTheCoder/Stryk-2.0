"use client"

import { useState, useRef } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { leasePayments } from "@/data/seed"
import { ChevronRightIcon, CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

type SendState = "idle" | "success"

export function QuickTransfer() {
  const [selectedLease, setSelectedLease] = useState(leasePayments[0].id)
  const [sendState, setSendState] = useState<SendState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const selected = leasePayments.find((c) => c.id === selectedLease)

  const handleSend = () => {
    if (sendState !== "idle") return
    setSendState("success")
    timeoutRef.current = setTimeout(() => setSendState("idle"), 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <Link href="/vendor/leases">
          <Button variant="ghost" size="sm" className="h-auto gap-1 px-0 text-xs text-muted-foreground">
            View all Customer leases
            <ChevronRightIcon className="size-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center py-2">
            {leasePayments.slice(0, 6).map((contact) => {
              const isSelected = selectedLease === contact.id
              return (
                <motion.button
                  key={contact.id}
                  onClick={() => {
                    if (sendState === "idle") setSelectedLease(contact.id)
                  }}
                  className="relative shrink-0 rounded-full"
                  animate={{
                    scale: isSelected ? 1.2 : 0.9,
                    marginLeft: isSelected ? 6 : -4,
                    marginRight: isSelected ? 6 : -4,
                    zIndex: isSelected ? 10 : 1,
                    opacity: isSelected ? 1 : 0.7,
                  }}
                  whileHover={{ scale: isSelected ? 1.2 : 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Avatar
                    className={
                      isSelected
                        ? "size-11 ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "size-10"
                    }
                  >
                    <AvatarImage src={contact.avatar} alt={contact.label} />
                    <AvatarFallback className="text-xs">
                      {contact.label.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {sendState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-2 py-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2Icon className="size-10 text-blue-500" />
              </motion.div>
              <p className="text-sm font-semibold">
                Installment paid!
              </p>
              <p className="text-xs text-muted-foreground">
                {selected?.label}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
