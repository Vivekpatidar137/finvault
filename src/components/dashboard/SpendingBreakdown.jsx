import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { computeCategoryBreakdown, fmtShort } from '../../utils'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value, color } = payload[0].payload
  return (
    <div className="card border-navy-600 text-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-slate-300">{name}</span>
      </div>
      <p className="font-mono text-slate-100 text-base">{fmtShort(value)}</p>
    </div>
  )
}

export default function SpendingBreakdown() {
  const txns = useFilteredTransactions()
  const data  = computeCategoryBreakdown(txns)

  if (!data.length) return (
    <div className="card flex items-center justify-center h-64 animate-fade-up" style={{ animationDelay: '280ms' }}>
      <p className="text-slate-500 text-sm">No expense data</p>
    </div>
  )

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="card animate-fade-up" style={{ animationDelay: '280ms' }}>
      <h2 className="text-sm font-semibold text-slate-300 mb-4 tracking-wide uppercase flex items-center gap-2">
        <span className="w-1.5 h-4 bg-accent-amber rounded-full inline-block" />
        Spending Breakdown
      </h2>
      <div className="flex gap-4 items-center">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={75}
                dataKey="value" paddingAngle={3} strokeWidth={0}>
                {data.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-slate-500">Total</p>
            <p className="font-mono text-sm font-semibold text-slate-100">{fmtShort(total)}</p>
          </div>
        </div>
        <div className="flex-1 space-y-1.5 overflow-auto max-h-[160px]">
          {data.slice(0, 7).map(d => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-slate-400 truncate">{d.name}</span>
              </div>
              <span className="text-xs font-mono text-slate-300 shrink-0">{fmtShort(d.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
