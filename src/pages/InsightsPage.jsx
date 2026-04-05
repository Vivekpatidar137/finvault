import { useSelector } from 'react-redux'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'
import { computeCategoryBreakdown, computeMonthlyTrend, computeSummary, fmtShort, getCatColor } from '../utils'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'
import { TrendingUp, TrendingDown, AlertTriangle, Award, Repeat } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card border-navy-600 text-sm shadow-2xl min-w-[140px]">
      <p className="text-slate-400 mb-2 font-mono text-xs">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex justify-between gap-4">
          <span style={{ color: p.color || p.fill }}>{p.name}</span>
          <span className="font-mono text-slate-100">{fmtShort(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

function InsightCard({ icon: Icon, color, title, value, sub, delay = 0 }) {
  return (
    <div className={`card border-navy-700/40 animate-fade-up flex items-start gap-4`}
      style={{ animationDelay: `${delay}ms` }}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${color}/10 border border-${color}/20`}>
        <Icon size={18} className={`text-${color}`} />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{title}</p>
        <p className="font-mono font-semibold text-slate-100 text-lg leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default function InsightsPage() {
  const allItems  = useSelector(s => s.transactions.items)
  const filtered  = useFilteredTransactions()
  const summary   = computeSummary(filtered)
  const catData   = computeCategoryBreakdown(filtered)
  const monthly   = computeMonthlyTrend(allItems).map(d => ({
    ...d,
    label: format(parseISO(d.month + '-01'), 'MMM yy'),
  }))

  const topCat       = catData[0]
  const savingsRate  = summary.income > 0 ? ((summary.income - summary.expense) / summary.income * 100).toFixed(1) : 0
  const expenseRatio = summary.income > 0 ? (summary.expense / summary.income * 100).toFixed(1) : 0

  // Month over month
  const lastTwo = monthly.slice(-2)
  const momChange = lastTwo.length === 2
    ? ((lastTwo[1].expense - lastTwo[0].expense) / lastTwo[0].expense * 100).toFixed(1)
    : null

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard icon={Award}         color="accent-cyan"   title="Top Spend Category"  value={topCat?.name || '—'}      sub={topCat ? fmtShort(topCat.value) : undefined} delay={0} />
        <InsightCard icon={TrendingUp}    color="accent-green"  title="Savings Rate"         value={`${savingsRate}%`}         sub="Of total income saved" delay={80} />
        <InsightCard icon={TrendingDown}  color="accent-red"    title="Expense Ratio"        value={`${expenseRatio}%`}        sub="Expenses vs income" delay={160} />
        <InsightCard icon={Repeat}        color="accent-purple" title="Total Transactions"   value={filtered.length}           sub="In current filter range" delay={240} />
      </div>

      {/* MoM alert */}
      {momChange !== null && (
        <div className={`card border flex items-center gap-3 animate-fade-up ${
          Number(momChange) > 0 ? 'border-accent-red/30 bg-accent-red/5' : 'border-accent-green/30 bg-accent-green/5'
        }`} style={{ animationDelay: '300ms' }}>
          <AlertTriangle size={16} className={Number(momChange) > 0 ? 'text-accent-red' : 'text-accent-green'} />
          <p className="text-sm text-slate-300">
            {Number(momChange) > 0
              ? `Spending increased by ${momChange}% vs previous month — consider reviewing your expenses.`
              : `Great job! Spending decreased by ${Math.abs(momChange)}% compared to last month.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category bar */}
        <div className="card animate-fade-up" style={{ animationDelay: '360ms' }}>
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent-amber rounded-full" />
            Top Spending Categories
          </h2>
          {catData.length === 0 ? <p className="text-slate-500 text-sm py-8 text-center">No data</p> : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={catData.slice(0, 7)} layout="vertical" margin={{ left: 0, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,.1)" horizontal={false} />
                <XAxis type="number" tickFormatter={fmtShort}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={110}
                  tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Amount" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {catData.slice(0, 7).map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly expense comparison */}
        <div className="card animate-fade-up" style={{ animationDelay: '440ms' }}>
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent-red rounded-full" />
            Monthly Expense Trend
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,.1)" />
              <XAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmtShort} tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={52} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="expense" name="Expense" fill="#ff4d6d" radius={[4, 4, 0, 0]} maxBarSize={32} fillOpacity={0.85} />
              <Bar dataKey="income"  name="Income"  fill="#00ff9d" radius={[4, 4, 0, 0]} maxBarSize={32} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Observations */}
      <div className="card animate-fade-up border-navy-700/40" style={{ animationDelay: '520ms' }}>
        <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-4 bg-accent-cyan rounded-full" />
          Key Observations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            topCat && {
              color: 'text-accent-amber',
              dot: 'bg-accent-amber',
              text: `Your biggest spend is <strong>${topCat.name}</strong> at ${fmtShort(topCat.value)} — ${((topCat.value / (summary.expense || 1)) * 100).toFixed(0)}% of all expenses.`,
            },
            {
              color: Number(savingsRate) >= 20 ? 'text-accent-green' : 'text-accent-red',
              dot:   Number(savingsRate) >= 20 ? 'bg-accent-green'   : 'bg-accent-red',
              text:  Number(savingsRate) >= 20
                ? `Your savings rate of <strong>${savingsRate}%</strong> is healthy. Keep it up!`
                : `Your savings rate is only <strong>${savingsRate}%</strong>. Aim for at least 20%.`,
            },
            summary.invest > 0 && {
              color: 'text-accent-purple',
              dot:   'bg-accent-purple',
              text:  `You've invested <strong>${fmtShort(summary.invest)}</strong> this period — great for long-term wealth building.`,
            },
            momChange !== null && {
              color: Number(momChange) > 15 ? 'text-accent-red' : 'text-slate-300',
              dot:   Number(momChange) > 15 ? 'bg-accent-red'   : 'bg-slate-500',
              text:  `Month-over-month spending ${Number(momChange) > 0 ? 'increased' : 'decreased'} by <strong>${Math.abs(momChange)}%</strong>.`,
            },
          ].filter(Boolean).map((obs, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-navy-800/50">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${obs.dot}`} />
              <p className={`text-sm leading-relaxed ${obs.color}`}
                dangerouslySetInnerHTML={{ __html: obs.text }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
