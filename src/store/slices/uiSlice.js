import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    role: localStorage.getItem('finvault_role') || 'viewer',
    activePage: 'dashboard',
    sidebarOpen: true,
  },
  reducers: {
    setRole(state, action) {
      state.role = action.payload
      localStorage.setItem('finvault_role', action.payload)
    },
    setActivePage(state, action) {
      state.activePage = action.payload
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { setRole, setActivePage, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
