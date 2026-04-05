import { createSlice } from '@reduxjs/toolkit'
import { transactions as initialData } from '../../data/mockData'

const saved = localStorage.getItem('finvault_transactions')
const initialTransactions = saved ? JSON.parse(saved) : initialData

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: initialTransactions,
    filters: {
      search: '',
      type: 'all',
      category: 'all',
      sortBy: 'date-desc',
      dateRange: '6m',
    },
  },
  reducers: {
    addTransaction(state, action) {
      state.items.unshift(action.payload)
      localStorage.setItem('finvault_transactions', JSON.stringify(state.items))
    },
    updateTransaction(state, action) {
      const idx = state.items.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
      localStorage.setItem('finvault_transactions', JSON.stringify(state.items))
    },
    deleteTransaction(state, action) {
      state.items = state.items.filter(t => t.id !== action.payload)
      localStorage.setItem('finvault_transactions', JSON.stringify(state.items))
    },
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters(state) {
      state.filters = { search: '', type: 'all', category: 'all', sortBy: 'date-desc', dateRange: '6m' }
    },
  },
})

export const { addTransaction, updateTransaction, deleteTransaction, setFilter, resetFilters } = transactionsSlice.actions
export default transactionsSlice.reducer
