import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><BalanceTrend /></div>
        <SpendingBreakdown />
      </div>
      <RecentTransactions />
    </div>
  )
}
