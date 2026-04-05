import { useSelector } from 'react-redux'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { computeMonthlyTrend, fmtShort } from '../../utils'
import { format, parseISO } from 'date-fns'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card border-navy-600 text-sm shadow-2xl min-w-[160px]">
      <p className="text-slate-400 mb-2 font-mono text-xs">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-mono text-slate-100">{fmtShort(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrend() {
  const items = useSelector(s => s.transactions.items)
  const data  = computeMonthlyTrend(items).map(d => ({
    ...d,
    label: format(parseISO(d.month + '-01'), 'MMM yy'),
  }))

  return (
    <div className="card animate-fade-up" style={{ animationDelay: '200ms' }}>
      <h2 className="text-sm font-semibold text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-2">
        <span className="w-1.5 h-4 bg-accent-cyan rounded-full inline-block" />
        Monthly Cash Flow
      </h2>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00ff9d" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ff4d6d" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,.1)" />
          <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtShort} tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={52} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Area type="monotone" dataKey="income"  name="Income"  stroke="#00ff9d" strokeWidth={2} fill="url(#gIncome)"  dot={false} />
          <Area type="monotone" dataKey="expense" name="Expense" stroke="#ff4d6d" strokeWidth={2} fill="url(#gExpense)" dot={false} />
          <Area type="monotone" dataKey="balance" name="Balance" stroke="#00d4ff" strokeWidth={2} fill="url(#gBalance)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
