export type LeaseStatus = "Active" | "Defaulted" | "Completed"

export type Product = {
  id: string
  name: string
  brand: string
  model: string
  price: number
  image: string
  category: string
}

export type LeaseAgreement = {
  id: string
  consumerId: string
  consumerName: string
  consumerAvatar: string
  productId: string
  productName: string
  productBrand: string
  productImage: string
  devicePrice: number
  downPaymentPercent: number
  downPaymentAmount: number
  tenureMonths: number
  monthlyInstallment: number
  totalPayable: number
  amountPaid: number
  progress: number
  nextDueDate: string
  status: LeaseStatus
  startDate: string
}

export type VendorMetrics = {
  totalActiveLeases: number
  mrr: number
  totalPayouts: number
  defaultRate: number
}
