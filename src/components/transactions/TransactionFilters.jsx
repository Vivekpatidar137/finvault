import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilters } from '../../store/slices/transactionsSlice'
import { categories } from '../../data/mockData'
import { Search, X } from 'lucide-react'

export default function TransactionFilters() {
  const dispatch = useDispatch()
  const filters  = useSelector(s => s.transactions.filters)
  const set      = (k, v) => dispatch(setFilter({ [k]: v }))

  const isActive = filters.search || filters.type !== 'all' || filters.category !== 'all'

  return (
    <div className="card border-navy-700/40">
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input w-full pl-8"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
          />
        </div>

        {/* Type */}
        <select className="select" value={filters.type} onChange={e => set('type', e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="investment">Investment</option>
        </select>

        {/* Category */}
        <select className="select" value={filters.category} onChange={e => set('category', e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Sort */}
        <select className="select" value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amt-desc">Highest Amount</option>
          <option value="amt-asc">Lowest Amount</option>
        </select>

        {/* Date range */}
        <select className="select" value={filters.dateRange} onChange={e => set('dateRange', e.target.value)}>
          <option value="1m">Last Month</option>
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="1y">Last Year</option>
          <option value="all">All Time</option>
        </select>

        {isActive && (
          <button onClick={() => dispatch(resetFilters())} className="btn-ghost gap-1.5 text-accent-red hover:text-accent-red">
            <X size={14} /> Reset
          </button>
        )}
      </div>
    </div>
  )
}
