import { useSelector } from 'react-redux'
import { ShieldCheck, Eye, Bell } from 'lucide-react'

const pageTitles = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights' }

export default function Topbar() {
  const { activePage, role, sidebarOpen } = useSelector(s => s.ui)

  return (
    <header className={`
      fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6
      bg-navy-950/80 backdrop-blur-sm border-b border-navy-700/60
      transition-all duration-300
      ${sidebarOpen ? 'left-56' : 'left-16'}
    `}>
      <div>
        <h1 className="font-display text-xl text-slate-100">{pageTitles[activePage]}</h1>
        <p className="text-xs text-slate-500 font-mono">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className={`badge ${role === 'admin' ? 'bg-accent-amber/10 text-accent-amber border-accent-amber/20' : 'bg-slate-700/40 text-slate-400 border-slate-600/30'}`}>
          {role === 'admin' ? <ShieldCheck size={11} /> : <Eye size={11} />}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </div>

        <button className="w-8 h-8 rounded-lg bg-navy-800 border border-navy-600 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors relative">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-cyan rounded-full" />
        </button>

        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/30 to-accent-purple/30 border border-navy-600 flex items-center justify-center">
          <span className="text-xs font-mono font-semibold text-accent-cyan">U</span>
        </div>
      </div>
    </header>
  )
}
