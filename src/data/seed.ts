// ---------------------------------------------------------------------------
// Seed data – realistic fintech dashboard mock data
// ---------------------------------------------------------------------------

import { type Product, type LeaseAgreement } from "@/types/lease"

// Avatar URLs (local)
const avatar = (id: number) => `/avatars/${id}.png`

// ── Contacts (Quick Transfer) ──────────────────────────────────────────────
export const contacts = [
  { id: "1", name: "Sarah Chen", avatar: avatar(1) },
  { id: "2", name: "Marcus Johnson", avatar: avatar(2) },
  { id: "3", name: "Elena Rodriguez", avatar: avatar(3) },
  { id: "4", name: "James Wilson", avatar: avatar(4) },
  { id: "5", name: "Aisha Patel", avatar: avatar(1) },
  { id: "6", name: "David Kim", avatar: avatar(2) },
  { id: "7", name: "Olivia Brown", avatar: avatar(3) },
  { id: "8", name: "Liam Murphy", avatar: avatar(4) },
]

// ── Account Cards ──────────────────────────────────────────────────────────
export type AccountCard = {
  id: string
  label: string
  balance: string
  currency: string
  variant: "default" | "dark" | "primary"
}

export const accountCards: AccountCard[] = [
  {
    id: "1",
    label: "Euro Account",
    balance: "42,500",
    currency: "€",
    variant: "default",
  },
  {
    id: "2",
    label: "Crypto Wallet",
    balance: "1.24",
    currency: "BTC",
    variant: "dark",
  },
  {
    id: "3",
    label: "Investment Portfolio",
    balance: "28,300",
    currency: "$",
    variant: "primary",
  },
]

// ── Wallet Balance ─────────────────────────────────────────────────────────
export const walletBalance = {
  amount: 84765.0,
  changePercent: 12.4,
  changeDirection: "up" as const,
}

// ── Monthly Spending Limit ─────────────────────────────────────────────────
export const spendingLimit = {
  budget: 3000,
  spent: 2180,
  remaining: 920,
  currency: "USD",
  periodStart: "Apr 01",
  periodEnd: "Apr 30",
}

// ── Financial Overview (monthly revenue chart) ─────────────────────────────
export const financialOverview = [
  { month: "Jan", currentYear: 48200, lastYear: 42100 },
  { month: "Feb", currentYear: 51800, lastYear: 45300 },
  { month: "Mar", currentYear: 53573, lastYear: 48900 },
  { month: "Apr", currentYear: 124000, lastYear: 52400 },
  { month: "May", currentYear: 98400, lastYear: 61200 },
  { month: "Jun", currentYear: 105600, lastYear: 72800 },
  { month: "Jul", currentYear: 112300, lastYear: 78500 },
  { month: "Aug", currentYear: 108900, lastYear: 82100 },
  { month: "Sep", currentYear: 115200, lastYear: 85400 },
  { month: "Oct", currentYear: 109800, lastYear: 88900 },
  { month: "Nov", currentYear: 118500, lastYear: 92300 },
  { month: "Dec", currentYear: 124000, lastYear: 98500 },
]

// ── Money Movement ─────────────────────────────────────────────────────────
export const moneyMovement7d = [
  { label: "Sun", moneyIn: 2400, moneyOut: 1800 },
  { label: "Mon", moneyIn: 3200, moneyOut: 2100 },
  { label: "Tue", moneyIn: 2800, moneyOut: 1600 },
  { label: "Wed", moneyIn: 4100, moneyOut: 3120 },
  { label: "Thu", moneyIn: 3600, moneyOut: 2400 },
  { label: "Fri", moneyIn: 4250, moneyOut: 3120 },
  { label: "Sat", moneyIn: 1900, moneyOut: 1200 },
]

export const moneyMovement30d = [
  { label: "Week 1", moneyIn: 12400, moneyOut: 8900 },
  { label: "Week 2", moneyIn: 15800, moneyOut: 11200 },
  { label: "Week 3", moneyIn: 9600, moneyOut: 7400 },
  { label: "Week 4", moneyIn: 18200, moneyOut: 13500 },
]

export const moneyMovement90d = [
  { label: "Jan", moneyIn: 42500, moneyOut: 31200 },
  { label: "Feb", moneyIn: 38900, moneyOut: 29800 },
  { label: "Mar", moneyIn: 51200, moneyOut: 37400 },
  { label: "Apr", moneyIn: 46800, moneyOut: 34100 },
  { label: "May", moneyIn: 55300, moneyOut: 41200 },
  { label: "Jun", moneyIn: 48700, moneyOut: 35800 },
  { label: "Jul", moneyIn: 52100, moneyOut: 38900 },
  { label: "Aug", moneyIn: 44600, moneyOut: 33200 },
  { label: "Sep", moneyIn: 49800, moneyOut: 36500 },
  { label: "Oct", moneyIn: 53400, moneyOut: 39100 },
  { label: "Nov", moneyIn: 47200, moneyOut: 34800 },
  { label: "Dec", moneyIn: 56000, moneyOut: 41000 },
]

export const moneyMovementByPeriod = {
  "7d": moneyMovement7d,
  "30d": moneyMovement30d,
  "90d": moneyMovement90d,
} as const

// ── Logo helper ────────────────────────────────────────────────────────────
export const logo = (domain: string) =>
  `/logos/${domain.replace(/\./g, "-")}.png`

// ── Recent Transactions ────────────────────────────────────────────────────
export type Transaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
  consumerId: string
}

export const recentTransactions: Transaction[] = [
  {
    id: "1",
    merchant: "Sarah Chen",
    transactionId: "AGR_920076",
    amount: 80,
    date: "Apr 10, 2026",
    logo: "/logos/iphone.jpg",
    category: "Smartphone",
    consumerId: "c1",
  },
  {
    id: "2",
    merchant: "Marcus Johnson",
    transactionId: "AGR_918263",
    amount: 165,
    date: "Apr 09, 2026",
    logo: "/logos/macbook.jpg",
    category: "Laptop",
    consumerId: "c2",
  },
  {
    id: "3",
    merchant: "Elena Rodriguez",
    transactionId: "AGR_847291",
    amount: 76,
    date: "Apr 08, 2026",
    logo: "/logos/galaxy.jpg",
    category: "Smartphone",
    consumerId: "c3",
  },
  {
    id: "4",
    merchant: "Aisha Patel",
    transactionId: "AGR_773920",
    amount: 80,
    date: "Apr 07, 2026",
    logo: "/logos/iphone.jpg",
    category: "Smartphone",
    consumerId: "c5",
  },
  {
    id: "5",
    merchant: "James Wilson",
    transactionId: "AGR_920077",
    amount: 293,
    date: "Apr 06, 2026",
    logo: "/logos/ipad.jpg",
    category: "Tablet",
    consumerId: "c4",
  },
  {
    id: "6",
    merchant: "David Kim",
    transactionId: "AGR_661204",
    amount: 165,
    date: "Apr 05, 2026",
    logo: "/logos/macbook.jpg",
    category: "Laptop",
    consumerId: "c6",
  },
  {
    id: "7",
    merchant: "Olivia Brown",
    transactionId: "AGR_559831",
    amount: 76,
    date: "Apr 04, 2026",
    logo: "/logos/galaxy.jpg",
    category: "Smartphone",
    consumerId: "c7",
  },
]

// ── Lease Overview (monthly lease chart) ─────────────────────────────────────
export const leaseOverview = [
  { month: "Jan", currentYear: 48200, lastYear: 42100 },
  { month: "Feb", currentYear: 51800, lastYear: 45300 },
  { month: "Mar", currentYear: 53573, lastYear: 48900 },
  { month: "Apr", currentYear: 124000, lastYear: 52400 },
  { month: "May", currentYear: 98400, lastYear: 61200 },
  { month: "Jun", currentYear: 105600, lastYear: 72800 },
  { month: "Jul", currentYear: 112300, lastYear: 78500 },
  { month: "Aug", currentYear: 108900, lastYear: 82100 },
  { month: "Sep", currentYear: 115200, lastYear: 85400 },
  { month: "Oct", currentYear: 109800, lastYear: 88900 },
  { month: "Nov", currentYear: 118500, lastYear: 92300 },
  { month: "Dec", currentYear: 124000, lastYear: 98500 },
]

// ── Lease Payments (for Pay Installment) ─────────────────────────────────────
export type LeasePayment = {
  id: string
  label: string
  avatar: string
}

export const leasePayments: LeasePayment[] = [
  { id: "l1", label: "iPhone 16 Pro - Sarah Chen", avatar: avatar(1) },
  { id: "l2", label: "MacBook Air M3 - Marcus Johnson", avatar: avatar(2) },
  { id: "l3", label: "Galaxy S25 Ultra - Elena Rodriguez", avatar: avatar(3) },
  { id: "l4", label: "iPad Pro M4 - James Wilson", avatar: avatar(4) },
  { id: "l5", label: "iPhone 16 Pro - Aisha Patel", avatar: avatar(1) },
  { id: "l6", label: "MacBook Air M3 - David Kim", avatar: avatar(2) },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Transactions
// ══════════════════════════════════════════════════════════════════════════════

export type FullTransaction = {
  id: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
  status: "completed" | "pending" | "failed"
  type: "expense" | "income"
  notes?: string
  merchantInfo?: string
  cardLast4?: string
  consumerId: string
}

export const fullTransactions: FullTransaction[] = [
  { id: "t1", merchant: "Sarah Chen - iPhone 16 Pro", transactionId: "AGR_920076", amount: 80, date: "Apr 10, 2026", logo: avatar(1), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Apple iPhone 16 Pro, 128GB", cardLast4: "4589", consumerId: "c1" },
  { id: "t2", merchant: "Marcus Johnson - MacBook Air M3", transactionId: "AGR_918263", amount: 165, date: "Apr 09, 2026", logo: avatar(2), category: "Laptop", status: "completed", type: "expense", merchantInfo: "Apple MacBook Air M3, 13-inch", cardLast4: "4589", consumerId: "c2" },
  { id: "t3", merchant: "Elena Rodriguez - Galaxy S25 Ultra", transactionId: "AGR_847291", amount: 76, date: "Apr 08, 2026", logo: avatar(3), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Samsung Galaxy S25 Ultra, 256GB", cardLast4: "7321", consumerId: "c3" },
  { id: "t4", merchant: "Aisha Patel - iPhone 16 Pro", transactionId: "AGR_773920", amount: 80, date: "Apr 07, 2026", logo: avatar(1), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Apple iPhone 16 Pro, 128GB", cardLast4: "7321", consumerId: "c5" },
  { id: "t5", merchant: "James Wilson - iPad Pro M4", transactionId: "AGR_920077", amount: 293, date: "Apr 06, 2026", logo: avatar(4), category: "Tablet", status: "pending", type: "expense", merchantInfo: "Apple iPad Pro M4, 11-inch", cardLast4: "4589", consumerId: "c4" },
  { id: "t6", merchant: "David Kim - MacBook Air M3", transactionId: "AGR_661204", amount: 165, date: "Apr 05, 2026", logo: avatar(2), category: "Laptop", status: "completed", type: "expense", merchantInfo: "Apple MacBook Air M3, 13-inch", cardLast4: "4589", consumerId: "c6" },
  { id: "t7", merchant: "Olivia Brown - Galaxy S25 Ultra", transactionId: "AGR_559831", amount: 76, date: "Apr 04, 2026", logo: avatar(3), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Samsung Galaxy S25 Ultra, 256GB", cardLast4: "9012", consumerId: "c7" },
  { id: "t8", merchant: "Liam Murphy - iPhone 16 Pro", transactionId: "AGR_882341", amount: 80, date: "Apr 03, 2026", logo: avatar(4), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Apple iPhone 16 Pro, 128GB", cardLast4: "9012", consumerId: "c8" },
  { id: "t9", merchant: "Sarah Chen - MacBook Air M3", transactionId: "AGR_773001", amount: 165, date: "Apr 02, 2026", logo: avatar(1), category: "Laptop", status: "completed", type: "expense", merchantInfo: "Apple MacBook Air M3, 13-inch", cardLast4: "4589", consumerId: "c1" },
  { id: "t10", merchant: "Marcus Johnson - iPad Pro M4", transactionId: "AGR_990123", amount: 293, date: "Apr 01, 2026", logo: avatar(2), category: "Tablet", status: "completed", type: "expense", merchantInfo: "Apple iPad Pro M4, 11-inch", cardLast4: "4589", consumerId: "c2" },
  { id: "t11", merchant: "Elena Rodriguez - iPhone 16 Pro", transactionId: "AGR_445501", amount: 80, date: "Mar 31, 2026", logo: avatar(3), category: "Smartphone", status: "completed", type: "expense", cardLast4: "9012", consumerId: "c3" },
  { id: "t12", merchant: "Aisha Patel - Galaxy S25 Ultra", transactionId: "AGR_334112", amount: 76, date: "Mar 30, 2026", logo: avatar(1), category: "Smartphone", status: "completed", type: "expense", cardLast4: "4589", consumerId: "c5" },
  { id: "t13", merchant: "James Wilson - MacBook Air M3", transactionId: "AGR_221098", amount: 165, date: "Mar 29, 2026", logo: avatar(4), category: "Laptop", status: "completed", type: "expense", merchantInfo: "Apple MacBook Air M3, 13-inch", cardLast4: "7321", consumerId: "c4" },
  { id: "t14", merchant: "David Kim - iPhone 16 Pro", transactionId: "AGR_110987", amount: 80, date: "Mar 28, 2026", logo: avatar(2), category: "Smartphone", status: "completed", type: "expense", cardLast4: "4589", consumerId: "c6" },
  { id: "t15", merchant: "Olivia Brown - iPad Pro M4", transactionId: "AGR_998877", amount: 293, date: "Mar 27, 2026", logo: avatar(3), category: "Tablet", status: "completed", type: "expense", merchantInfo: "Apple iPad Pro M4, 11-inch", cardLast4: "4589", consumerId: "c7" },
  { id: "t16", merchant: "Liam Murphy - Galaxy S25 Ultra", transactionId: "AGR_887766", amount: 76, date: "Mar 26, 2026", logo: avatar(4), category: "Smartphone", status: "pending", type: "expense", cardLast4: "7321", consumerId: "c8" },
  { id: "t17", merchant: "Sarah Chen - iPhone 16 Pro", transactionId: "AGR_776655", amount: 80, date: "Mar 25, 2026", logo: avatar(1), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Apple iPhone 16 Pro, 128GB", cardLast4: "4589", consumerId: "c1" },
  { id: "t18", merchant: "Marcus Johnson - MacBook Air M3", transactionId: "AGR_665544", amount: 165, date: "Mar 24, 2026", logo: avatar(2), category: "Laptop", status: "completed", type: "expense", cardLast4: "9012", consumerId: "c2" },
  { id: "t19", merchant: "Elena Rodriguez - iPad Pro M4", transactionId: "AGR_554433", amount: 293, date: "Mar 23, 2026", logo: avatar(3), category: "Tablet", status: "completed", type: "expense", cardLast4: "4589", consumerId: "c3" },
  { id: "t20", merchant: "Aisha Patel - iPhone 16 Pro", transactionId: "AGR_443322", amount: 80, date: "Mar 22, 2026", logo: avatar(1), category: "Smartphone", status: "completed", type: "expense", merchantInfo: "Apple iPhone 16 Pro, 128GB", cardLast4: "9012", consumerId: "c5" },
  { id: "t21", merchant: "Payout - Sarah Chen", transactionId: "TXN_332211", amount: 240, date: "Mar 21, 2026", logo: avatar(1), category: "Payout", status: "completed", type: "income", merchantInfo: "USDC settlement", consumerId: "c1" },
  { id: "t22", merchant: "Payout - Marcus Johnson", transactionId: "TXN_221100", amount: 110, date: "Mar 20, 2026", logo: avatar(2), category: "Payout", status: "completed", type: "income", merchantInfo: "USDC settlement", consumerId: "c2" },
  { id: "t23", merchant: "Defaulted - James Wilson", transactionId: "INV_110099", amount: 293, date: "Mar 19, 2026", logo: avatar(4), category: "Default", status: "failed", type: "expense", notes: "Payment defaulted", cardLast4: "7321", consumerId: "c4" },
  { id: "t24", merchant: "Payout - Elena Rodriguez", transactionId: "INV_009988", amount: 390, date: "Mar 18, 2026", logo: avatar(3), category: "Payout", status: "completed", type: "income", merchantInfo: "USDC settlement", cardLast4: "9012", consumerId: "c3" },
  { id: "t25", merchant: "Payout - Aisha Patel", transactionId: "TXN_889977", amount: 240, date: "Mar 17, 2026", logo: avatar(1), category: "Payout", status: "completed", type: "income", notes: "USDC settlement", consumerId: "c5" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Cards
// ══════════════════════════════════════════════════════════════════════════════

export type CardData = {
  id: string
  name: string
  type: "physical" | "virtual"
  last4: string
  cardNumber: string
  holder: string
  expiry: string
  cvv: string
  network: "visa" | "mastercard"
  frozen: boolean
  dailyLimit: number
  monthlySpend: number
  monthlyLimit: number
  color: string
}

export const cardsData: CardData[] = [
  {
    id: "c1",
    name: "Main Debit",
    type: "physical",
    last4: "4589",
    cardNumber: "**** **** **** 4589",
    holder: "ALEX MORGAN",
    expiry: "09/28",
    cvv: "317",
    network: "visa",
    frozen: false,
    dailyLimit: 5000,
    monthlySpend: 2180,
    monthlyLimit: 10000,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "c2",
    name: "Travel Credit",
    type: "physical",
    last4: "7321",
    cardNumber: "**** **** **** 7321",
    holder: "ALEX MORGAN",
    expiry: "03/27",
    cvv: "892",
    network: "mastercard",
    frozen: false,
    dailyLimit: 3000,
    monthlySpend: 890,
    monthlyLimit: 8000,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "c3",
    name: "Virtual Shopping",
    type: "virtual",
    last4: "9012",
    cardNumber: "**** **** **** 9012",
    holder: "ALEX MORGAN",
    expiry: "12/26",
    cvv: "445",
    network: "visa",
    frozen: false,
    dailyLimit: 1000,
    monthlySpend: 456,
    monthlyLimit: 3000,
    color: "bg-muted text-foreground",
  },
  {
    id: "c4",
    name: "Business Expense",
    type: "physical",
    last4: "3456",
    cardNumber: "**** **** **** 3456",
    holder: "ALEX MORGAN",
    expiry: "06/29",
    cvv: "661",
    network: "mastercard",
    frozen: true,
    dailyLimit: 10000,
    monthlySpend: 0,
    monthlyLimit: 25000,
    color: "bg-card text-card-foreground",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Analytics
// ══════════════════════════════════════════════════════════════════════════════

export type SpendingHeatmapDay = { date: string; amount: number }

// Generate 365 days of spending data programmatically
function generateHeatmap(): SpendingHeatmapDay[] {
  const data: SpendingHeatmapDay[] = []
  const start = new Date(2025, 3, 14)
  for (let i = 0; i < 365; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 40 : 120
    const noise = Math.sin(i * 0.3) * 60 + Math.cos(i * 0.7) * 40
    const amount = Math.max(0, Math.round(base + noise + (i % 7) * 15))
    data.push({
      date: d.toISOString().split("T")[0],
      amount: Math.random() > 0.1 ? amount : 0,
    })
  }
  return data
}

export const spendingHeatmapData = generateHeatmap()

export type CategoryBreakdown = {
  category: string
  amount: number
  color: string
  subcategories: { name: string; amount: number }[]
}

export const categoryBreakdowns: CategoryBreakdown[] = [
  { category: "Smartphones", amount: 820, color: "var(--color-chart-1)", subcategories: [{ name: "iPhone", amount: 420 }, { name: "Samsung", amount: 280 }, { name: "Other", amount: 120 }] },
  { category: "Laptops", amount: 450, color: "var(--color-chart-2)", subcategories: [{ name: "MacBook", amount: 180 }, { name: "Windows", amount: 150 }, { name: "Chromebook", amount: 120 }] },
  { category: "Tablets", amount: 340, color: "var(--color-chart-3)", subcategories: [{ name: "iPad", amount: 175 }, { name: "Android", amount: 120 }, { name: "Other", amount: 45 }] },
  { category: "Wearables", amount: 560, color: "var(--color-chart-4)", subcategories: [{ name: "Watch", amount: 280 }, { name: "Fitness", amount: 180 }, { name: "AR/VR", amount: 100 }] },
  { category: "Audio", amount: 215, color: "var(--color-chart-5)", subcategories: [{ name: "Headphones", amount: 95 }, { name: "Earbuds", amount: 75 }, { name: "Speakers", amount: 45 }] },
]

export type RecurringCharge = {
  id: string
  merchant: string
  logo: string
  amount: number
  frequency: "monthly" | "yearly"
  nextDate: string
  status: "wanted" | "review" | "unset"
  category: string
}

export const recurringCharges: RecurringCharge[] = [
  { id: "r1", merchant: "iPhone 16 Pro - Sarah Chen", logo: "/logos/iphone.jpg", amount: 80, frequency: "monthly", nextDate: "May 10, 2026", status: "wanted", category: "Smartphone" },
  { id: "r2", merchant: "MacBook Air M3 - Marcus Johnson", logo: "/logos/macbook.jpg", amount: 165, frequency: "monthly", nextDate: "May 02, 2026", status: "wanted", category: "Laptop" },
  { id: "r3", merchant: "Galaxy S25 Ultra - Elena Rodriguez", logo: "/logos/galaxy.jpg", amount: 76, frequency: "monthly", nextDate: "May 06, 2026", status: "wanted", category: "Smartphone" },
  { id: "r4", merchant: "iPad Pro M4 - James Wilson", logo: "/logos/ipad.jpg", amount: 293, frequency: "monthly", nextDate: "May 07, 2026", status: "wanted", category: "Tablet" },
  { id: "r5", merchant: "iPhone 16 Pro - Aisha Patel", logo: "/logos/iphone.jpg", amount: 80, frequency: "monthly", nextDate: "Apr 29, 2026", status: "review", category: "Smartphone" },
  { id: "r6", merchant: "MacBook Air M3 - David Kim", logo: "/logos/macbook.jpg", amount: 165, frequency: "monthly", nextDate: "May 09, 2026", status: "wanted", category: "Laptop" },
  { id: "r7", merchant: "Galaxy S25 Ultra - Olivia Brown", logo: "/logos/galaxy.jpg", amount: 76, frequency: "monthly", nextDate: "May 05, 2026", status: "wanted", category: "Smartphone" },
  { id: "r8", merchant: "iPhone 16 Pro - Liam Murphy", logo: "/logos/iphone.jpg", amount: 80, frequency: "monthly", nextDate: "Apr 28, 2026", status: "review", category: "Smartphone" },
  { id: "r9", merchant: "MacBook Air M3 - Sarah Chen", logo: "/logos/macbook.jpg", amount: 165, frequency: "monthly", nextDate: "Apr 27, 2026", status: "wanted", category: "Laptop" },
  { id: "r10", merchant: "iPad Pro M4 - Marcus Johnson", logo: "/logos/ipad.jpg", amount: 293, frequency: "monthly", nextDate: "Apr 26, 2026", status: "unset", category: "Tablet" },
  { id: "r11", merchant: "Galaxy S25 Ultra - Elena Rodriguez", logo: "/logos/galaxy.jpg", amount: 76, frequency: "monthly", nextDate: "Apr 24, 2026", status: "review", category: "Smartphone" },
  { id: "r12", merchant: "iPhone 16 Pro - Aisha Patel", logo: "/logos/iphone.jpg", amount: 80, frequency: "monthly", nextDate: "Apr 23, 2026", status: "wanted", category: "Smartphone" },
]

export type MonthComparison = { category: string; thisMonth: number; lastMonth: number }

export const monthComparisons: MonthComparison[] = [
  { category: "Smartphone Leases", thisMonth: 820, lastMonth: 690 },
  { category: "Laptop Leases", thisMonth: 450, lastMonth: 520 },
  { category: "Tablet Leases", thisMonth: 340, lastMonth: 280 },
  { category: "New Agreements", thisMonth: 560, lastMonth: 410 },
  { category: "Early Payoffs", thisMonth: 215, lastMonth: 215 },
  { category: "Defaults", thisMonth: 180, lastMonth: 200 },
  { category: "Payouts", thisMonth: 634, lastMonth: 0 },
  { category: "Refinances", thisMonth: 250, lastMonth: 300 },
]

export type AiInsight = {
  id: string
  text: string
  trend: "up" | "down" | "neutral"
  percentChange: number
  category: string
}

export const aiInsights: AiInsight[] = [
  { id: "ai1", text: "Smartphone lease originations up 19% this month — driven by iPhone 16 Pro demand.", trend: "up", percentChange: 19, category: "Originators" },
  { id: "ai2", text: "Default rate dropped 13% — portfolio health improved after tightening eligibility rules.", trend: "down", percentChange: 13, category: "Risk" },
  { id: "ai3", text: "3 agreements flagged for review with upcoming due dates this week.", trend: "neutral", percentChange: 0, category: "Collections" },
  { id: "ai4", text: "Settlement volume jumped 37% — USDC payouts processing faster than last month.", trend: "up", percentChange: 37, category: "Payouts" },
  { id: "ai5", text: "You're on track to collect $24,500 USDC this month if current repayment pace holds.", trend: "down", percentChange: 8, category: "Revenue" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Investments
// ══════════════════════════════════════════════════════════════════════════════

function generateSparkline(base: number, volatility: number): number[] {
  const points: number[] = []
  let price = base
  for (let i = 0; i < 30; i++) {
    price += (Math.sin(i * 0.5) * volatility) + (Math.random() - 0.48) * volatility
    points.push(Math.round(price * 100) / 100)
  }
  return points
}

export type Holding = {
  id: string
  symbol: string
  name: string
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  logo: string
  sparklineData: number[]
  sector: string
}

export const holdings: Holding[] = [
  { id: "h1", symbol: "iPH16", name: "iPhone 16 Pro", quantity: 25, avgBuyPrice: 999, currentPrice: 1199, logo: "/logos/iphone.jpg", sparklineData: generateSparkline(1199, 20), sector: "Smartphone" },
  { id: "h2", symbol: "MBA13", name: "MacBook Air M3", quantity: 10, avgBuyPrice: 899, currentPrice: 1099, logo: "/logos/macbook.jpg", sparklineData: generateSparkline(1099, 25), sector: "Laptop" },
  { id: "h3", symbol: "iPPR4", name: "iPad Pro M4", quantity: 15, avgBuyPrice: 799, currentPrice: 1099, logo: "/logos/ipad.jpg", sparklineData: generateSparkline(1099, 30), sector: "Tablet" },
  { id: "h4", symbol: "GS25U", name: "Galaxy S25 Ultra", quantity: 8, avgBuyPrice: 899, currentPrice: 1299, logo: "/logos/galaxy.jpg", sparklineData: generateSparkline(1299, 35), sector: "Smartphone" },
  { id: "h5", symbol: "MBP14", name: "MacBook Pro 14", quantity: 12, avgBuyPrice: 1499, currentPrice: 1999, logo: "/logos/macbook-pro.jpg", sparklineData: generateSparkline(1999, 40), sector: "Laptop" },
  { id: "h6", symbol: "iPH15", name: "iPhone 15", quantity: 20, avgBuyPrice: 699, currentPrice: 799, logo: "/logos/iphone.jpg", sparklineData: generateSparkline(799, 15), sector: "Smartphone" },
  { id: "h7", symbol: "GLS24", name: "Galaxy Tab S9", quantity: 6, avgBuyPrice: 599, currentPrice: 849, logo: "/logos/galaxy.jpg", sparklineData: generateSparkline(849, 20), sector: "Tablet" },
  { id: "h8", symbol: "APW3", name: "Apple Watch 9", quantity: 18, avgBuyPrice: 299, currentPrice: 399, logo: "/logos/apple-watch.jpg", sparklineData: generateSparkline(399, 10), sector: "Wearable" },
]

export type WatchlistItem = {
  id: string
  symbol: string
  name: string
  currentPrice: number
  dayChange: number
  logo: string
  sparklineData: number[]
}

export const watchlistItems: WatchlistItem[] = [
  { id: "w1", symbol: "iPH16", name: "iPhone 16 Pro Lease", currentPrice: 1199, dayChange: 1.24, logo: "/logos/iphone.jpg", sparklineData: generateSparkline(1199, 8) },
  { id: "w2", symbol: "MBA13", name: "MacBook Air M3 Lease", currentPrice: 1099, dayChange: -0.87, logo: "/logos/macbook.jpg", sparklineData: generateSparkline(1099, 4) },
  { id: "w3", symbol: "GS25U", name: "Galaxy S25 Ultra Lease", currentPrice: 1299, dayChange: 0.56, logo: "/logos/galaxy.jpg", sparklineData: generateSparkline(1299, 3) },
  { id: "w4", symbol: "iPPR4", name: "iPad Pro M4 Lease", currentPrice: 1099, dayChange: -1.32, logo: "/logos/ipad.jpg", sparklineData: generateSparkline(1099, 2) },
  { id: "w5", symbol: "MBP14", name: "MacBook Pro 14 Lease", currentPrice: 1999, dayChange: 2.15, logo: "/logos/macbook-pro.jpg", sparklineData: generateSparkline(1999, 3) },
]

export type PortfolioHistoryPoint = { date: string; portfolio: number; sp500: number }

export const portfolioHistory: PortfolioHistoryPoint[] = [
  { date: "May 2025", portfolio: 120000, sp500: 44000 },
  { date: "Jun 2025", portfolio: 135000, sp500: 45200 },
  { date: "Jul 2025", portfolio: 128000, sp500: 44800 },
  { date: "Aug 2025", portfolio: 145000, sp500: 46100 },
  { date: "Sep 2025", portfolio: 162000, sp500: 47300 },
  { date: "Oct 2025", portfolio: 158000, sp500: 46800 },
  { date: "Nov 2025", portfolio: 175000, sp500: 48900 },
  { date: "Dec 2025", portfolio: 192000, sp500: 50200 },
  { date: "Jan 2026", portfolio: 205000, sp500: 49800 },
  { date: "Feb 2026", portfolio: 218000, sp500: 51400 },
  { date: "Mar 2026", portfolio: 235000, sp500: 53100 },
  { date: "Apr 2026", portfolio: 248000, sp500: 54800 },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Budgets
// ══════════════════════════════════════════════════════════════════════════════

export type BudgetCategory = {
  id: string
  category: string
  iconName: string
  budget: number
  spent: number
  color: string
}

export const budgetCategories: BudgetCategory[] = [
  { id: "b1", category: "Food & Dining", iconName: "utensils", budget: 800, spent: 820, color: "text-orange-500" },
  { id: "b2", category: "Transport", iconName: "car", budget: 400, spent: 310, color: "text-blue-500" },
  { id: "b3", category: "Entertainment", iconName: "gamepad-2", budget: 300, spent: 340, color: "text-purple-500" },
  { id: "b4", category: "Shopping", iconName: "shopping-bag", budget: 500, spent: 560, color: "text-pink-500" },
  { id: "b5", category: "Subscriptions", iconName: "repeat", budget: 200, spent: 215, color: "text-cyan-500" },
  { id: "b6", category: "Health & Fitness", iconName: "heart-pulse", budget: 150, spent: 95, color: "text-emerald-500" },
  { id: "b7", category: "Education", iconName: "graduation-cap", budget: 250, spent: 150, color: "text-amber-500" },
  { id: "b8", category: "Travel", iconName: "plane", budget: 600, spent: 634, color: "text-rose-500" },
]

export type SavingsGoal = {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  iconName: string
  monthlyContribution: number
}

export const savingsGoals: SavingsGoal[] = [
  { id: "g1", name: "Vacation Fund", targetAmount: 5000, currentAmount: 2400, deadline: "Aug 2026", iconName: "palm-tree", monthlyContribution: 400 },
  { id: "g2", name: "Emergency Fund", targetAmount: 15000, currentAmount: 8200, deadline: "Dec 2026", iconName: "shield", monthlyContribution: 850 },
  { id: "g3", name: "New Car", targetAmount: 35000, currentAmount: 12500, deadline: "Jun 2027", iconName: "car", monthlyContribution: 1500 },
  { id: "g4", name: "Home Down Payment", targetAmount: 60000, currentAmount: 24000, deadline: "Dec 2027", iconName: "home", monthlyContribution: 2000 },
]

export type DailySpending = { date: string; amount: number }

export const dailySpending: DailySpending[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 3, i + 1) // April 2026
  const dayOfWeek = d.getDay()
  const base = dayOfWeek === 0 || dayOfWeek === 6 ? 45 : 95
  const amount = Math.round(base + Math.sin(i * 0.8) * 40 + Math.random() * 30)
  return { date: d.toISOString().split("T")[0], amount: i < 13 ? amount : 0 }
})

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Accounts
// ══════════════════════════════════════════════════════════════════════════════

export type BankAccount = {
  id: string
  name: string
  type: "checking" | "savings" | "crypto" | "investment"
  institution: string
  institutionLogo: string
  accountNumber: string
  balance: number
  currency: string
  change: number
  changePercent: number
  lastActivity: string
  color: string
}

export const bankAccounts: BankAccount[] = [
  {
    id: "ba1",
    name: "Primary Checking",
    type: "checking",
    institution: "Chase",
    institutionLogo: logo("chase.com"),
    accountNumber: "****4589",
    balance: 24850.42,
    currency: "$",
    change: 1240.00,
    changePercent: 5.2,
    lastActivity: "Today",
    color: "bg-blue-500",
  },
  {
    id: "ba2",
    name: "High-Yield Savings",
    type: "savings",
    institution: "Marcus by Goldman Sachs",
    institutionLogo: logo("marcus.com"),
    accountNumber: "****7821",
    balance: 35200.00,
    currency: "$",
    change: 880.50,
    changePercent: 2.6,
    lastActivity: "Yesterday",
    color: "bg-emerald-500",
  },
  {
    id: "ba3",
    name: "Bitcoin Wallet",
    type: "crypto",
    institution: "Coinbase",
    institutionLogo: logo("coinbase.com"),
    accountNumber: "****3bc9",
    balance: 18450.80,
    currency: "$",
    change: -620.30,
    changePercent: -3.2,
    lastActivity: "2 hours ago",
    color: "bg-orange-500",
  },
  {
    id: "ba4",
    name: "Brokerage Account",
    type: "investment",
    institution: "Fidelity",
    institutionLogo: logo("fidelity.com"),
    accountNumber: "****9012",
    balance: 61450.00,
    currency: "$",
    change: 2840.00,
    changePercent: 4.8,
    lastActivity: "Today",
    color: "bg-violet-500",
  },
  {
    id: "ba5",
    name: "Travel Fund",
    type: "savings",
    institution: "Ally Bank",
    institutionLogo: logo("ally.com"),
    accountNumber: "****5567",
    balance: 4200.00,
    currency: "$",
    change: 400.00,
    changePercent: 10.5,
    lastActivity: "3 days ago",
    color: "bg-pink-500",
  },
  {
    id: "ba6",
    name: "Euro Account",
    type: "checking",
    institution: "Wise",
    institutionLogo: logo("wise.com"),
    accountNumber: "****8834",
    balance: 8750.00,
    currency: "€",
    change: 320.00,
    changePercent: 3.8,
    lastActivity: "Today",
    color: "bg-cyan-500",
  },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Transfers
// ══════════════════════════════════════════════════════════════════════════════

export type TransferRecord = {
  id: string
  type: "sent" | "received" | "scheduled"
  contactName: string
  contactAvatar: string
  amount: number
  date: string
  status: "completed" | "pending" | "scheduled"
  note?: string
}

export const transferRecords: TransferRecord[] = [
  { id: "tr1", type: "sent", contactName: "Sarah Chen", contactAvatar: avatar(1), amount: 250.00, date: "Apr 12, 2026", status: "completed", note: "Dinner split" },
  { id: "tr2", type: "received", contactName: "Marcus Johnson", contactAvatar: avatar(2), amount: 1200.00, date: "Apr 11, 2026", status: "completed", note: "Freelance payment" },
  { id: "tr3", type: "sent", contactName: "Elena Rodriguez", contactAvatar: avatar(3), amount: 85.00, date: "Apr 10, 2026", status: "completed", note: "Concert tickets" },
  { id: "tr4", type: "scheduled", contactName: "James Wilson", contactAvatar: avatar(4), amount: 500.00, date: "Apr 20, 2026", status: "scheduled", note: "Monthly rent share" },
  { id: "tr5", type: "received", contactName: "Aisha Patel", contactAvatar: avatar(1), amount: 340.00, date: "Apr 09, 2026", status: "completed", note: "Birthday gift" },
  { id: "tr6", type: "sent", contactName: "David Kim", contactAvatar: avatar(2), amount: 45.00, date: "Apr 08, 2026", status: "pending" },
  { id: "tr7", type: "scheduled", contactName: "Sarah Chen", contactAvatar: avatar(1), amount: 250.00, date: "May 01, 2026", status: "scheduled", note: "Monthly dinner budget" },
  { id: "tr8", type: "received", contactName: "Olivia Brown", contactAvatar: avatar(3), amount: 175.00, date: "Apr 07, 2026", status: "completed" },
  { id: "tr9", type: "sent", contactName: "Liam Murphy", contactAvatar: avatar(4), amount: 920.00, date: "Apr 06, 2026", status: "completed", note: "Equipment purchase" },
  { id: "tr10", type: "scheduled", contactName: "Elena Rodriguez", contactAvatar: avatar(3), amount: 150.00, date: "Apr 25, 2026", status: "scheduled", note: "Gym membership split" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Notifications
// ══════════════════════════════════════════════════════════════════════════════

export type Notification = {
  id: string
  type: "transaction" | "security" | "system" | "promotion" | "request"
  title: string
  description: string
  time: string
  read: boolean
  icon: string
  actionable?: {
    accept: string
    decline: string
    amount?: string
    from?: string
    fromAvatar?: string
  }
}

export const notifications: Notification[] = [
  { id: "n0a", type: "request", title: "Money Request", description: "Elena Rodriguez is requesting $85.00 for concert tickets", time: "Just now", read: false, icon: "hand-coins", actionable: { accept: "Pay $85.00", decline: "Decline", amount: "$85.00", from: "Elena Rodriguez", fromAvatar: avatar(3) } },
  { id: "n0b", type: "security", title: "Authorize New Device", description: "Someone is trying to log in from a Windows PC in Berlin, Germany", time: "5 min ago", read: false, icon: "shield-alert", actionable: { accept: "Approve", decline: "Block" } },
  { id: "n0c", type: "request", title: "Split Bill Request", description: "Marcus Johnson wants to split a $240.00 dinner bill (your share: $80.00)", time: "30 min ago", read: false, icon: "split", actionable: { accept: "Pay $80.00", decline: "Decline", amount: "$80.00", from: "Marcus Johnson", fromAvatar: avatar(2) } },
  { id: "n1", type: "transaction", title: "Payment Received", description: "You received $4,250.00 from Stripe Payout", time: "2 min ago", read: false, icon: "arrow-down-left" },
  { id: "n2", type: "security", title: "New Login Detected", description: "Your account was accessed from a new device in San Francisco, CA", time: "1 hour ago", read: false, icon: "shield-alert" },
  { id: "n3", type: "transaction", title: "Card Payment", description: "You paid $120.00 to AWS Cloud Services", time: "3 hours ago", read: false, icon: "credit-card" },
  { id: "n4", type: "system", title: "Budget Alert", description: "You've reached 90% of your Food & Dining budget", time: "5 hours ago", read: true, icon: "alert-triangle" },
  { id: "n5", type: "promotion", title: "Upgrade to Vault Pro", description: "Get advanced analytics, unlimited virtual cards, and priority support", time: "1 day ago", read: true, icon: "sparkles" },
  { id: "n6", type: "transaction", title: "Transfer Completed", description: "Your transfer of $250.00 to Sarah Chen was successful", time: "1 day ago", read: true, icon: "check-circle" },
  { id: "n7", type: "security", title: "Password Changed", description: "Your account password was successfully updated", time: "2 days ago", read: true, icon: "lock" },
  { id: "n8", type: "transaction", title: "Subscription Renewed", description: "Spotify Premium was renewed for $9.99", time: "2 days ago", read: true, icon: "repeat" },
  { id: "n9", type: "system", title: "Card Expiring Soon", description: "Your Travel Credit card ending in 7321 expires next month", time: "3 days ago", read: true, icon: "clock" },
  { id: "n10", type: "transaction", title: "Dividend Received", description: "AAPL Q1 2026 dividend payment of $142.50", time: "5 days ago", read: true, icon: "trending-up" },
  { id: "n11", type: "system", title: "Monthly Statement Ready", description: "Your March 2026 account statement is available for download", time: "1 week ago", read: true, icon: "file-text" },
  { id: "n12", type: "security", title: "Two-Factor Enabled", description: "Two-factor authentication has been enabled on your account", time: "2 weeks ago", read: true, icon: "shield-check" },
]

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Crypto
// ══════════════════════════════════════════════════════════════════════════════

export type CryptoCoin = {
  id: string
  symbol: string
  name: string
  logo: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume24h: number
  holdings: number
  sparklineData: number[]
}

export const cryptoCoins: CryptoCoin[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "/logos/bitcoin-com.png",
    price: 68420.50,
    change24h: 2.34,
    change7d: 5.12,
    marketCap: 1340000000000,
    volume24h: 28500000000,
    holdings: 1.24,
    sparklineData: [64200, 65100, 63800, 66500, 67200, 65800, 68100, 67500, 68900, 67800, 68420, 69100, 68200, 68420],
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: "/logos/ethereum-org.png",
    price: 3845.20,
    change24h: -1.15,
    change7d: 3.28,
    marketCap: 462000000000,
    volume24h: 15200000000,
    holdings: 12.5,
    sparklineData: [3720, 3680, 3750, 3810, 3790, 3850, 3820, 3780, 3860, 3830, 3845, 3870, 3810, 3845],
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    logo: "/logos/solana-com.png",
    price: 178.90,
    change24h: 4.56,
    change7d: 12.3,
    marketCap: 82000000000,
    volume24h: 3800000000,
    holdings: 45,
    sparklineData: [152, 158, 155, 163, 168, 165, 172, 170, 175, 173, 178, 180, 176, 178],
  },
  {
    id: "bnb",
    symbol: "BNB",
    name: "BNB",
    logo: "/logos/bnbchain-org.png",
    price: 612.30,
    change24h: 0.87,
    change7d: -1.45,
    marketCap: 91000000000,
    volume24h: 1200000000,
    holdings: 8.2,
    sparklineData: [620, 615, 618, 610, 608, 612, 615, 610, 614, 611, 612, 615, 610, 612],
  },
  {
    id: "xrp",
    symbol: "XRP",
    name: "XRP",
    logo: "/logos/ripple-com.png",
    price: 0.6234,
    change24h: -2.10,
    change7d: -4.32,
    marketCap: 34000000000,
    volume24h: 1500000000,
    holdings: 5000,
    sparklineData: [0.65, 0.64, 0.66, 0.63, 0.62, 0.64, 0.63, 0.61, 0.62, 0.63, 0.62, 0.64, 0.63, 0.62],
  },
  {
    id: "ada",
    symbol: "ADA",
    name: "Cardano",
    logo: "/logos/cardano-org.png",
    price: 0.4521,
    change24h: 1.23,
    change7d: 6.78,
    marketCap: 16000000000,
    volume24h: 420000000,
    holdings: 10000,
    sparklineData: [0.41, 0.42, 0.43, 0.42, 0.44, 0.43, 0.45, 0.44, 0.45, 0.44, 0.45, 0.46, 0.45, 0.45],
  },
  {
    id: "doge",
    symbol: "DOGE",
    name: "Dogecoin",
    logo: "/logos/dogecoin-com.png",
    price: 0.1245,
    change24h: 8.92,
    change7d: 15.4,
    marketCap: 18000000000,
    volume24h: 2100000000,
    holdings: 25000,
    sparklineData: [0.105, 0.108, 0.110, 0.112, 0.115, 0.118, 0.120, 0.118, 0.122, 0.120, 0.124, 0.126, 0.123, 0.124],
  },
  {
    id: "avax",
    symbol: "AVAX",
    name: "Avalanche",
    logo: "/logos/avax-network.png",
    price: 38.75,
    change24h: -0.54,
    change7d: 2.15,
    marketCap: 15000000000,
    volume24h: 560000000,
    holdings: 120,
    sparklineData: [37.2, 37.8, 38.1, 37.5, 38.0, 38.4, 37.9, 38.2, 38.6, 38.3, 38.7, 39.0, 38.5, 38.7],
  },
]

export type CryptoTransaction = {
  id: string
  type: "buy" | "sell" | "swap" | "receive" | "send"
  coin: string
  coinSymbol: string
  logo: string
  amount: number
  value: number
  date: string
  status: "completed" | "pending"
}

export const cryptoTransactions: CryptoTransaction[] = [
  { id: "ct1", type: "buy", coin: "Bitcoin", coinSymbol: "BTC", logo: "/logos/bitcoin-com.png", amount: 0.05, value: 3421.02, date: "Apr 12, 2026", status: "completed" },
  { id: "ct2", type: "sell", coin: "Ethereum", coinSymbol: "ETH", logo: "/logos/ethereum-org.png", amount: 2.0, value: 7690.40, date: "Apr 11, 2026", status: "completed" },
  { id: "ct3", type: "swap", coin: "SOL → ETH", coinSymbol: "SOL", logo: "/logos/solana-com.png", amount: 10, value: 1789.00, date: "Apr 10, 2026", status: "completed" },
  { id: "ct4", type: "receive", coin: "Bitcoin", coinSymbol: "BTC", logo: "/logos/bitcoin-com.png", amount: 0.1, value: 6842.05, date: "Apr 09, 2026", status: "completed" },
  { id: "ct5", type: "buy", coin: "Solana", coinSymbol: "SOL", logo: "/logos/solana-com.png", amount: 20, value: 3578.00, date: "Apr 08, 2026", status: "completed" },
  { id: "ct6", type: "send", coin: "Ethereum", coinSymbol: "ETH", logo: "/logos/ethereum-org.png", amount: 0.5, value: 1922.60, date: "Apr 07, 2026", status: "pending" },
  { id: "ct7", type: "buy", coin: "Dogecoin", coinSymbol: "DOGE", logo: "/logos/dogecoin-com.png", amount: 10000, value: 1245.00, date: "Apr 06, 2026", status: "completed" },
  { id: "ct8", type: "sell", coin: "Cardano", coinSymbol: "ADA", logo: "/logos/cardano-org.png", amount: 2000, value: 904.20, date: "Apr 05, 2026", status: "completed" },
]

// ══════════════════════════════════════════════════════════════════════════════
// WIDGET DATA: Financial Health Score
// ══════════════════════════════════════════════════════════════════════════════

export type HealthFactor = {
  id: string
  label: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "fair" | "poor"
  description: string
}

export const financialHealthScore = {
  overall: 78,
  trend: "up" as const,
  trendDelta: 3,
  factors: [
    { id: "hf1", label: "Collection Rate", score: 85, maxScore: 100, status: "excellent" as const, description: "92% of installments collected on time this month" },
    { id: "hf2", label: "Default Rate", score: 72, maxScore: 100, status: "good" as const, description: "Default rate of 1.2% — well within healthy range" },
    { id: "hf3", label: "Portfolio Growth", score: 90, maxScore: 100, status: "excellent" as const, description: "Active lease portfolio up 12.4% MoM" },
    { id: "hf4", label: "Settlement Speed", score: 68, maxScore: 100, status: "good" as const, description: "Average USDC settlement time: 2.4 hours" },
    { id: "hf5", label: "Customer Retention", score: 55, maxScore: 100, status: "fair" as const, description: "Repeat customer rate at 34% — aim for 50%" },
    { id: "hf6", label: "Compliance", score: 95, maxScore: 100, status: "excellent" as const, description: "All agreements compliant with KYC/AML checks" },
  ] as HealthFactor[],
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE DATA: Help & Support
// ══════════════════════════════════════════════════════════════════════════════

export type FaqItem = {
  id: string
  question: string
  answer: string
  category: "account" | "payments" | "security" | "billing" | "general"
}

export const faqItems: FaqItem[] = [
  { id: "faq1", category: "account", question: "How do I link a new bank account?", answer: "Go to the Accounts page, click \"Link New Account\", and follow the secure verification steps. We use 256-bit encryption and never store your bank credentials directly." },
  { id: "faq2", category: "payments", question: "How long do transfers take to process?", answer: "Domestic transfers typically complete within 1-2 business days. International transfers take 3-5 business days depending on the destination country and currency." },
  { id: "faq3", category: "security", question: "How do I enable two-factor authentication?", answer: "Navigate to Settings > Security, and toggle the Two-Factor Authentication switch. You can use an authenticator app or SMS verification. We recommend using an authenticator app for better security." },
  { id: "faq4", category: "billing", question: "What's included in Vault Pro?", answer: "Vault Pro includes unlimited bank connections, advanced analytics & AI insights, unlimited virtual cards, priority support, custom budget categories, and export to CSV & PDF. It's $12/month." },
  { id: "faq5", category: "account", question: "Can I have multiple currency accounts?", answer: "Yes! You can hold accounts in multiple currencies including USD, EUR, GBP, and more. Currency conversion happens at mid-market rates with a small transparent fee." },
  { id: "faq6", category: "security", question: "What happens if I notice suspicious activity?", answer: "Immediately freeze your cards from the Cards page, change your password in Settings > Security, and contact our support team. We have a dedicated fraud team that operates 24/7." },
  { id: "faq7", category: "payments", question: "Is there a limit on transfers?", answer: "Free accounts can transfer up to $5,000/day and $25,000/month. Pro accounts have limits of $25,000/day and $100,000/month. Contact support for higher limits." },
  { id: "faq8", category: "general", question: "How do I export my transaction history?", answer: "Go to the Transactions page, select the transactions you want to export using the checkboxes, then click the \"Export CSV\" button in the floating action bar." },
  { id: "faq9", category: "billing", question: "Can I cancel my Pro subscription anytime?", answer: "Yes, you can cancel at any time from Settings > Billing. Your Pro features will remain active until the end of your current billing period." },
  { id: "faq10", category: "general", question: "Does Vault support cryptocurrency trading?", answer: "Yes! The Crypto section supports buying, selling, swapping, and tracking major cryptocurrencies including BTC, ETH, SOL, and more. Real-time price tracking updates every 3 seconds." },
]

export type SupportTicket = {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
}

export const supportTickets: SupportTicket[] = [
  { id: "tk1", subject: "Transfer stuck in pending", status: "in-progress", priority: "high", createdAt: "Apr 10, 2026", lastUpdate: "Apr 12, 2026" },
  { id: "tk2", subject: "Request higher transfer limit", status: "open", priority: "medium", createdAt: "Apr 08, 2026", lastUpdate: "Apr 08, 2026" },
  { id: "tk3", subject: "Tax document request", status: "resolved", priority: "low", createdAt: "Mar 15, 2026", lastUpdate: "Mar 18, 2026" },
]

export const systemStatus = [
  { name: "Core Banking", status: "operational" as const },
  { name: "Card Payments", status: "operational" as const },
  { name: "Crypto Trading", status: "degraded" as const },
  { name: "International Transfers", status: "operational" as const },
  { name: "Mobile App", status: "operational" as const },
]

export const cryptoPriceHistory = [
  { time: "00:00", btc: 67800, eth: 3790 },
  { time: "02:00", btc: 67500, eth: 3780 },
  { time: "04:00", btc: 67900, eth: 3810 },
  { time: "06:00", btc: 68200, eth: 3830 },
  { time: "08:00", btc: 67800, eth: 3820 },
  { time: "10:00", btc: 68500, eth: 3850 },
  { time: "12:00", btc: 68100, eth: 3840 },
  { time: "14:00", btc: 68800, eth: 3860 },
  { time: "16:00", btc: 68300, eth: 3835 },
  { time: "18:00", btc: 68600, eth: 3855 },
  { time: "20:00", btc: 68200, eth: 3840 },
  { time: "22:00", btc: 68420, eth: 3845 },
]

// ── Lease Products ──────────────────────────────────────────────────────────
export const leaseProducts: Product[] = [
  {
    id: "p1",
    name: "iPhone 16 Pro",
    brand: "Apple",
    model: "A3102",
    price: 1199,
    image: "/devices/iphone16pro.jpg",
    category: "Smartphone",
  },
  {
    id: "p2",
    name: "MacBook Air M3",
    brand: "Apple",
    model: "MRXV3",
    price: 1099,
    image: "/devices/macbook-air-m3.jpg",
    category: "Laptop",
  },
  {
    id: "p3",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    model: "SM-S938",
    price: 1299,
    image: "/devices/galaxy-s25.jpg",
    category: "Smartphone",
  },
  {
    id: "p4",
    name: "iPad Pro M4",
    brand: "Apple",
    model: "A2835",
    price: 1099,
    image: "/devices/ipad-pro-m4.jpg",
    category: "Tablet",
  },
]

// ── Lease Agreements ────────────────────────────────────────────────────────
export const leaseAgreements: LeaseAgreement[] = [
  {
    id: "l1",
    consumerId: "c1",
    consumerName: "Sarah Chen",
    consumerAvatar: avatar(1),
    productId: "p1",
    productName: "iPhone 16 Pro",
    productBrand: "Apple",
    productImage: "/devices/iphone16pro.jpg",
    devicePrice: 1199,
    downPaymentPercent: 20,
    downPaymentAmount: 240,
    tenureMonths: 12,
    monthlyInstallment: 80,
    totalPayable: 1200,
    amountPaid: 320,
    progress: 27,
    nextDueDate: "2026-09-15",
    status: "Active",
    startDate: "2026-01-15",
  },
  {
    id: "l2",
    consumerId: "c2",
    consumerName: "Marcus Johnson",
    consumerAvatar: avatar(2),
    productId: "p2",
    productName: "MacBook Air M3",
    productBrand: "Apple",
    productImage: "/devices/macbook-air-m3.jpg",
    devicePrice: 1099,
    downPaymentPercent: 10,
    downPaymentAmount: 110,
    tenureMonths: 6,
    monthlyInstallment: 165,
    totalPayable: 1100,
    amountPaid: 495,
    progress: 45,
    nextDueDate: "2026-09-01",
    status: "Active",
    startDate: "2026-03-01",
  },
  {
    id: "l3",
    consumerId: "c3",
    consumerName: "Elena Rodriguez",
    consumerAvatar: avatar(3),
    productId: "p3",
    productName: "Galaxy S25 Ultra",
    productBrand: "Samsung",
    productImage: "/devices/galaxy-s25.jpg",
    devicePrice: 1299,
    downPaymentPercent: 30,
    downPaymentAmount: 390,
    tenureMonths: 12,
    monthlyInstallment: 76,
    totalPayable: 1302,
    amountPaid: 456,
    progress: 35,
    nextDueDate: "2026-09-20",
    status: "Active",
    startDate: "2026-02-20",
  },
  {
    id: "l4",
    consumerId: "c4",
    consumerName: "James Wilson",
    consumerAvatar: avatar(4),
    productId: "p4",
    productName: "iPad Pro M4",
    productBrand: "Apple",
    productImage: "/devices/ipad-pro-m4.jpg",
    devicePrice: 1099,
    downPaymentPercent: 20,
    downPaymentAmount: 220,
    tenureMonths: 3,
    monthlyInstallment: 293,
    totalPayable: 1099,
    amountPaid: 586,
    progress: 53,
    nextDueDate: "2026-08-30",
    status: "Defaulted",
    startDate: "2026-05-30",
  },
  {
    id: "l5",
    consumerId: "c5",
    consumerName: "Aisha Patel",
    consumerAvatar: avatar(1),
    productId: "p1",
    productName: "iPhone 16 Pro",
    productBrand: "Apple",
    productImage: "/devices/iphone16pro.jpg",
    devicePrice: 1199,
    downPaymentPercent: 20,
    downPaymentAmount: 240,
    tenureMonths: 12,
    monthlyInstallment: 80,
    totalPayable: 1200,
    amountPaid: 960,
    progress: 80,
    nextDueDate: "2026-09-10",
    status: "Active",
    startDate: "2025-09-10",
  },
  {
    id: "l6",
    consumerId: "c6",
    consumerName: "David Kim",
    consumerAvatar: avatar(2),
    productId: "p2",
    productName: "MacBook Air M3",
    productBrand: "Apple",
    productImage: "/devices/macbook-air-m3.jpg",
    devicePrice: 1099,
    downPaymentPercent: 10,
    downPaymentAmount: 110,
    tenureMonths: 6,
    monthlyInstallment: 165,
    totalPayable: 1100,
    amountPaid: 1100,
    progress: 100,
    nextDueDate: "—",
    status: "Completed",
    startDate: "2026-01-01",
  },
]

// ── Vendor Metrics ──────────────────────────────────────────────────────────
export const vendorMetrics = {
  totalActiveLeases: leaseAgreements.filter((l) => l.status === "Active").length,
  mrr: leaseAgreements
    .filter((l) => l.status === "Active")
    .reduce((sum, l) => sum + l.monthlyInstallment, 0),
  totalPayouts: leaseAgreements.reduce((sum, l) => sum + l.amountPaid, 0),
  defaultRate: Number(
    (
      (leaseAgreements.filter((l) => l.status === "Defaulted").length /
        leaseAgreements.length) *
      100
    ).toFixed(1)
  ),
}
