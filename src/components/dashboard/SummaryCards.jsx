import { useSelector } from 'react-redux'
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { computeSummary, fmtShort } from '../../utils'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'

const cards = [
  {
    key: 'balance',
    label: 'Net Balance',
    icon: Wallet,
    color: 'accent-cyan',
    gradient: 'from-accent-cyan/20 to-transparent',
    border: 'border-accent-cyan/30',
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    color: 'accent-green',
    gradient: 'from-accent-green/20 to-transparent',
    border: 'border-accent-green/30',
  },
  {
    key: 'expense',
    label: 'Total Expenses',
    icon: TrendingDown,
    color: 'accent-red',
    gradient: 'from-accent-red/20 to-transparent',
    border: 'border-accent-red/30',
  },
  {
    key: 'invest',
    label: 'Investments',
    icon: PiggyBank,
    color: 'accent-purple',
    gradient: 'from-accent-purple/20 to-transparent',
    border: 'border-accent-purple/30',
  },
]

export default function SummaryCards() {
  const txns = useFilteredTransactions()
  const summary = computeSummary(txns)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color, gradient, border }, i) => (
        <div
          key={key}
          className={`card border ${border} animate-fade-up`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 pointer-events-none rounded-2xl`} />
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{label}</p>
              <div className={`w-8 h-8 rounded-lg bg-${color}/10 border border-${color}/20 flex items-center justify-center`}>
                <Icon size={15} className={`text-${color}`} />
              </div>
            </div>
            <p className={`stat-value text-${color}`}>{fmtShort(summary[key])}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
