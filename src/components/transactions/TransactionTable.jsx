import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTransaction } from '../../store/slices/transactionsSlice'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'
import { fmtNum, fmtShort } from '../../utils'
import TransactionModal from './TransactionModal'
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const TYPE_STYLES = {
  income:     'tag-income',
  expense:    'tag-expense',
  investment: 'tag-invest',
}

const TypeDot = ({ type }) => {
  const colors = { income: 'bg-accent-green', expense: 'bg-accent-red', investment: 'bg-accent-purple' }
  return <span className={`w-2 h-2 rounded-full ${colors[type] || 'bg-slate-500'}`} />
}

export default function TransactionTable() {
  const dispatch = useDispatch()
  const role     = useSelector(s => s.ui.role)
  const txns     = useFilteredTransactions()
  const [editing, setEditing] = useState(null)
  const [delId,   setDelId]   = useState(null)

  const confirmDelete = (id) => {
    dispatch(deleteTransaction(id))
    setDelId(null)
  }

  if (!txns.length) return (
    <div className="card flex flex-col items-center justify-center py-16 gap-3">
      <div className="text-4xl">📭</div>
      <p className="text-slate-400">No transactions found</p>
      <p className="text-slate-600 text-sm">Try adjusting your filters</p>
    </div>
  )

  return (
    <>
      <div className="card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700/60">
              {['Date', 'Description', 'Category', 'Type', 'Amount', role === 'admin' ? 'Actions' : ''].map(h => h && (
                <th key={h} className="text-left text-xs text-slate-500 font-medium uppercase tracking-wide px-5 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/60">
            {txns.map(t => (
              <tr key={t.id} className="hover:bg-navy-800/30 transition-colors group">
                <td className="px-5 py-3 font-mono text-xs text-slate-400 whitespace-nowrap">{t.date}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <TypeDot type={t.type} />
                    <span className="text-slate-200 font-medium">{t.description}</span>
                  </div>
                  {t.note && <p className="text-xs text-slate-500 mt-0.5 ml-4">{t.note}</p>}
                </td>
                <td className="px-5 py-3 text-slate-400 whitespace-nowrap">{t.category}</td>
                <td className="px-5 py-3">
                  <span className={TYPE_STYLES[t.type] || 'badge bg-slate-700 text-slate-300'}>
                    {t.type}
                  </span>
                </td>
                <td className="px-5 py-3 font-mono font-semibold whitespace-nowrap">
                  <span className={
                    t.type === 'income' ? 'text-accent-green' :
                    t.type === 'investment' ? 'text-accent-purple' : 'text-accent-red'
                  }>
                    {t.type === 'income' ? '+' : '-'}{fmtShort(t.amount)}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="px-5 py-3">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditing(t)}
                        className="w-7 h-7 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan hover:bg-accent-cyan/20 transition-colors">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => setDelId(t.id)}
                        className="w-7 h-7 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red hover:bg-accent-red/20 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-navy-700/60 text-xs text-slate-500">
          Showing {txns.length} transaction{txns.length !== 1 ? 's' : ''}
        </div>
      </div>

      {editing && <TransactionModal existing={editing} onClose={() => setEditing(null)} />}

      {/* Delete confirm */}
      {delId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDelId(null)} />
          <div className="relative card border-accent-red/30 w-full max-w-sm animate-fade-up shadow-2xl text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <h3 className="text-slate-100 font-semibold mb-2">Delete Transaction?</h3>
            <p className="text-slate-400 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="btn-ghost flex-1 justify-center border border-navy-600">Cancel</button>
              <button onClick={() => confirmDelete(delId)} className="btn flex-1 justify-center bg-accent-red/10 text-accent-red border border-accent-red/30 hover:bg-accent-red/20">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
