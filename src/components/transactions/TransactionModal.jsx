import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTransaction, updateTransaction } from '../../store/slices/transactionsSlice'
import { categories } from '../../data/mockData'
import { genId } from '../../utils'
import { X } from 'lucide-react'

const EMPTY = { description: '', amount: '', category: 'Food & Dining', type: 'expense', date: new Date().toISOString().slice(0, 10), note: '' }

export default function TransactionModal({ onClose, existing }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState(existing || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = 'Required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (!validate()) return
    const payload = { ...form, amount: Number(form.amount) }
    if (existing) {
      dispatch(updateTransaction(payload))
    } else {
      dispatch(addTransaction({ ...payload, id: genId() }))
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card border-navy-600 w-full max-w-md animate-fade-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-slate-100">
            {existing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="btn-ghost p-1.5 rounded-lg">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Description *</label>
            <input className={`input w-full ${errors.description ? 'border-accent-red/50' : ''}`}
              placeholder="e.g. Zomato order" value={form.description}
              onChange={e => set('description', e.target.value)} />
            {errors.description && <p className="text-xs text-accent-red mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Amount (₹) *</label>
              <input className={`input w-full ${errors.amount ? 'border-accent-red/50' : ''}`}
                type="number" min="0" placeholder="0" value={form.amount}
                onChange={e => set('amount', e.target.value)} />
              {errors.amount && <p className="text-xs text-accent-red mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Date *</label>
              <input className={`input w-full ${errors.date ? 'border-accent-red/50' : ''}`}
                type="date" value={form.date}
                onChange={e => set('date', e.target.value)} />
              {errors.date && <p className="text-xs text-accent-red mt-1">{errors.date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Type</label>
            <div className="flex gap-2">
              {['expense', 'income', 'investment'].map(t => (
                <button key={t} onClick={() => set('type', t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                    form.type === t
                      ? t === 'income'     ? 'bg-accent-green/10 text-accent-green border-accent-green/40'
                        : t === 'expense'  ? 'bg-accent-red/10 text-accent-red border-accent-red/40'
                        : 'bg-accent-purple/10 text-accent-purple border-accent-purple/40'
                      : 'bg-navy-800 text-slate-400 border-navy-600 hover:border-navy-500'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Category</label>
            <select className="select w-full" value={form.category} onChange={e => set('category', e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Note (optional)</label>
            <input className="input w-full" placeholder="Any note..." value={form.note}
              onChange={e => set('note', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1 justify-center border border-navy-600">Cancel</button>
          <button onClick={submit} className="btn-primary flex-1 justify-center">
            {existing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}
