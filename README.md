# FinVault — Finance Dashboard

A sleek, dark-themed personal finance dashboard built with **React 18**, **Redux Toolkit**, and **Tailwind CSS**.

---

## ✨ Features

### Core
- **Dashboard Overview** — Summary cards (balance, income, expenses, investments), monthly cash flow area chart, spending donut chart, recent transactions
- **Transactions Page** — Full table with search, filter by type/category/date range, sort (date/amount asc/desc), CSV export
- **Insights Page** — Top spending category, savings rate, expense ratio, month-over-month comparison bar charts, smart observations
- **Role-Based UI** — Toggle between `Viewer` (read-only) and `Admin` (add, edit, delete transactions) via the sidebar switcher

### Optional Enhancements Included
- 💾 **Data persistence** — Transactions and role are saved to `localStorage`
- 📤 **CSV Export** — Download filtered transactions as a CSV file
- ✨ **Animations** — Staggered fade-up cards, smooth sidebar transitions, hover micro-interactions
- 🔍 **Advanced filtering** — Combined search + type + category + date range + sort
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer         | Tech                          |
|---------------|-------------------------------|
| Framework     | React 18                      |
| State         | Redux Toolkit + React-Redux   |
| Styling       | Tailwind CSS v3               |
| Charts        | Recharts                      |
| Icons         | Lucide React                  |
| Date utils    | date-fns                      |
| Build tool    | Vite                          |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions
│   ├── transactions/       # TransactionTable, TransactionFilters, TransactionModal
│   └── layout/             # Sidebar, Topbar
├── pages/                  # DashboardPage, TransactionsPage, InsightsPage
├── store/
│   ├── index.js            # Redux store config
│   └── slices/
│       ├── transactionsSlice.js   # CRUD + filter state
│       └── uiSlice.js             # Role, active page, sidebar
├── data/
│   └── mockData.js         # Seeded transactions (~90 items, 6 months)
├── hooks/
│   └── useFilteredTransactions.js # Memoised selector + filter logic
├── utils/
│   └── index.js            # Formatters, computeSummary, computeMonthlyTrend, etc.
├── App.jsx
├── main.jsx
└── index.css               # Tailwind + custom component classes
```

---

## 🔐 Role-Based UI

| Feature             | Viewer | Admin |
|---------------------|--------|-------|
| View dashboard      | ✅     | ✅    |
| View transactions   | ✅     | ✅    |
| View insights       | ✅     | ✅    |
| Add transaction     | ❌     | ✅    |
| Edit transaction    | ❌     | ✅    |
| Delete transaction  | ❌     | ✅    |
| Export CSV          | ✅     | ✅    |

Switch roles using the sidebar role switcher (bottom). Role persists via localStorage.

---

## 💡 Assumptions

- All amounts are in **Indian Rupees (₹)**
- Mock data spans ~6 months with realistic Indian expense categories
- "Investment" is treated as a separate type (not income, not expense)
- No backend — all state is in Redux with localStorage persistence
