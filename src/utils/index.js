import { catColors } from '../data/mockData'

export const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
export const fmtNum = (n) => fmt.format(n)
export const fmtShort = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(1)}K`
  return `₹${n}`
}

export const getCatColor = (cat) => catColors[cat] || '#64748b'

export function computeSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const invest  = transactions.filter(t => t.type === 'investment').reduce((s, t) => s + t.amount, 0)
  return { income, expense, invest, balance: income - expense - invest }
}

export function computeCategoryBreakdown(transactions) {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount
  })
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: getCatColor(name) }))
    .sort((a, b) => b.value - a.value)
}

export function computeMonthlyTrend(allTransactions) {
  const map = {}
  allTransactions.forEach(t => {
    const month = t.date.slice(0, 7)
    if (!map[month]) map[month] = { month, income: 0, expense: 0, invest: 0 }
    map[month][t.type === 'income' ? 'income' : t.type === 'investment' ? 'invest' : 'expense'] += t.amount
  })
  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6)
    .map(m => ({ ...m, balance: m.income - m.expense - m.invest, label: m.month.slice(0, 7) }))
}

export function genId() {
  return 'txn-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6)
}
