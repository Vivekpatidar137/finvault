import { useSelector } from 'react-redux'
import Sidebar  from './components/layout/Sidebar'
import Topbar   from './components/layout/Topbar'
import DashboardPage    from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage     from './pages/InsightsPage'

const PAGES = {
  dashboard:    DashboardPage,
  transactions: TransactionsPage,
  insights:     InsightsPage,
}

export default function App() {
  const { activePage, sidebarOpen } = useSelector(s => s.ui)
  const Page = PAGES[activePage] || DashboardPage

  return (
    <div className="min-h-screen bg-navy-950 bg-grid-navy bg-grid">
      <Sidebar />
      <Topbar />
      <main className={`transition-all duration-300 pt-16 min-h-screen ${sidebarOpen ? 'pl-56' : 'pl-16'}`}>
        <div className="p-5 md:p-6 max-w-7xl mx-auto">
          <Page />
        </div>
      </main>
    </div>
  )
}
