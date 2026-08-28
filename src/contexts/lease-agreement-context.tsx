"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface LeaseAgreementDraft {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerWhatsApp: string
  customerAddress: string
  guarantor1Phone: string
  guarantor1Address: string
  guarantor2Phone: string
  guarantor2Address: string
  device: string | null
  devicePrice: number
  downPayment: number
  downPaymentPercent: number
  downPaymentAmount: number
  tenure: number
  upfrontDue: number
  monthlyInstallment: number
  totalPayable: number
  amountPaid?: number
  progress?: number
  nextDueDate?: string
  status: string
  productBrand?: string
  productName?: string
}

interface LeaseAgreementContextType {
  draft: LeaseAgreementDraft | null
  setDraft: (draft: LeaseAgreementDraft) => void
  clearDraft: () => void
}

const LeaseAgreementContext = createContext<LeaseAgreementContextType | undefined>(undefined)

export function LeaseAgreementProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<LeaseAgreementDraft | null>(null)

  const setDraft = useCallback((newDraft: LeaseAgreementDraft) => {
    setDraftState(newDraft)
  }, [])

  const clearDraft = useCallback(() => {
    setDraftState(null)
  }, [])

  return (
    <LeaseAgreementContext.Provider value={{ draft, setDraft, clearDraft }}>
      {children}
    </LeaseAgreementContext.Provider>
  )
}

export function useLeaseAgreement() {
  const context = useContext(LeaseAgreementContext)
  if (!context) {
    return {
      draft: null,
      setDraft: () => {},
      clearDraft: () => {},
    }
  }
  return context
}
