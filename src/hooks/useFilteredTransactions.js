import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { subDays, parseISO, isAfter } from 'date-fns'

export function useFilteredTransactions() {
  const { items, filters } = useSelector(s => s.transactions)

  return useMemo(() => {
    const rangeMap = { '1m': 30, '3m': 90, '6m': 180, '1y': 365, 'all': 99999 }
    const days = rangeMap[filters.dateRange] || 180
    const cutoff = subDays(new Date(), days)

    let result = items.filter(t => {
      const d = parseISO(t.date)
      if (!isAfter(d, cutoff)) return false
      if (filters.type !== 'all' && t.type !== filters.type) return false
      if (filters.category !== 'all' && t.category !== filters.category) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (!t.description.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false
      }
      return true
    })

    switch (filters.sortBy) {
      case 'date-asc':  result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date)); break
      case 'date-desc': result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date)); break
      case 'amt-asc':   result = [...result].sort((a, b) => a.amount - b.amount); break
      case 'amt-desc':  result = [...result].sort((a, b) => b.amount - a.amount); break
    }

    return result
  }, [items, filters])
}
