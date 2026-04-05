import { useState } from 'react'
import { useSelector } from 'react-redux'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable   from '../components/transactions/TransactionTable'
import TransactionModal   from '../components/transactions/TransactionModal'
import { Plus, Download } from 'lucide-react'
import { useFilteredTransactions } from '../hooks/useFilteredTransactions'

function exportCSV(txns) {
  const header = 'Date,Description,Category,Type,Amount\n'
  const rows   = txns.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join('\n')
  const blob   = new Blob([header + rows], { type: 'text/csv' })
  const url    = URL.createObjectURL(blob)
  const a      = document.createElement('a')
  a.href = url; a.download = 'finvault-transactions.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function TransactionsPage() {
  const role   = useSelector(s => s.ui.role)
  const txns   = useFilteredTransactions()
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-slate-400 text-sm">{txns.length} transactions in current view</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(txns)} className="btn-ghost border border-navy-600 text-xs">
            <Download size={14} /> Export CSV
          </button>
          {role === 'admin' && (
            <button onClick={() => setShowAdd(true)} className="btn-primary text-xs">
              <Plus size={14} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionTable />

      {showAdd && <TransactionModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
