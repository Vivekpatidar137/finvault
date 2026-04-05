import { useSelector, useDispatch } from 'react-redux'
import { setActivePage } from '../../store/slices/uiSlice'
import { fmtShort } from '../../utils'
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react'

const TypeIcon = ({ type }) => {
  if (type === 'income')     return <ArrowUpRight size={13} className="text-accent-green" />
  if (type === 'investment') return <ArrowUpRight size={13} className="text-accent-purple" />
  return <ArrowDownRight size={13} className="text-accent-red" />
}

export default function RecentTransactions() {
  const dispatch = useDispatch()
  const items    = useSelector(s => s.transactions.items).slice(0, 6)

  return (
    <div className="card animate-fade-up" style={{ animationDelay: '360ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-300 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-4 bg-accent-purple rounded-full inline-block" />
          Recent Transactions
        </h2>
        <button
          onClick={() => dispatch(setActivePage('transactions'))}
          className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
        >
          View all <ArrowRight size={11} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-navy-800/60 transition-colors">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center shrink-0
              ${t.type === 'income'
                ? 'bg-accent-green/10 border border-accent-green/20'
                : t.type === 'investment'
                ? 'bg-accent-purple/10 border border-accent-purple/20'
                : 'bg-accent-red/10 border border-accent-red/20'}
            `}>
              <TypeIcon type={t.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">{t.description}</p>
              <p className="text-xs text-slate-500">{t.category} · {t.date}</p>
            </div>
            <p className={`font-mono text-sm font-medium shrink-0 ${
              t.type === 'income' ? 'text-accent-green' : t.type === 'investment' ? 'text-accent-purple' : 'text-accent-red'
            }`}>
              {t.type === 'income' ? '+' : '-'}{fmtShort(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
