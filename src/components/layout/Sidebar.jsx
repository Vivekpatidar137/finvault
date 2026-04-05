import { useDispatch, useSelector } from 'react-redux'
import { setActivePage, setRole, toggleSidebar } from '../../store/slices/uiSlice'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  ChevronLeft, ChevronRight, ShieldCheck, Eye, Menu
} from 'lucide-react'

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb },
]

export default function Sidebar() {
  const dispatch   = useDispatch()
  const { activePage, role, sidebarOpen } = useSelector(s => s.ui)

  return (
    <aside className={`
      fixed top-0 left-0 h-full z-40 flex flex-col
      bg-navy-900 border-r border-navy-700/60
      transition-all duration-300
      ${sidebarOpen ? 'w-56' : 'w-16'}
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-navy-700/60 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center shrink-0">
          <span className="text-accent-cyan font-mono font-bold text-sm">F</span>
        </div>
        {sidebarOpen && (
          <span className="font-display text-lg text-slate-100 tracking-wide">FinVault</span>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto text-slate-500 hover:text-slate-200 transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => dispatch(setActivePage(id))}
            className={activePage === id ? 'nav-item-active' : 'nav-item-inactive'}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Role switcher */}
      <div className="px-2 pb-4 border-t border-navy-700/60 pt-3 shrink-0">
        {sidebarOpen ? (
          <div className="space-y-1">
            <p className="text-xs text-slate-500 px-1 mb-2">Role</p>
            {['viewer', 'admin'].map(r => (
              <button
                key={r}
                onClick={() => dispatch(setRole(r))}
                className={`
                  w-full nav-item justify-start capitalize
                  ${role === r ? 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20' : 'nav-item-inactive'}
                `}
              >
                {r === 'admin' ? <ShieldCheck size={16} /> : <Eye size={16} />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => dispatch(setRole(role === 'admin' ? 'viewer' : 'admin'))}
            className="nav-item-inactive w-full justify-center"
            title={`Role: ${role}`}
          >
            {role === 'admin' ? <ShieldCheck size={18} className="text-accent-amber" /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </aside>
  )
}
