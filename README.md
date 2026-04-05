# FinVault — Finance Dashboard

A sleek, dark-themed personal finance dashboard to track income, expenses, and investments.

🔗 **Live Demo** → [finvault-io.vercel.app](https://finvault-io.vercel.app)

---

## ✨ Features

- **Dashboard Overview** — Summary cards (balance, income, expenses, investments), monthly cash flow area chart, spending donut chart, and recent transactions
- **Transactions Page** — Full table with search, filtering by type/category/date range, sorting by date or amount, and CSV export
- **Insights Page** — Top spending category, savings rate, expense ratio, month-over-month comparison charts, and smart observations based on your data
- **Role-Based UI** — Switch between `Viewer` (read-only) and `Admin` (full CRUD) via the sidebar
- **Data Persistence** — Transactions and role are saved to localStorage so nothing is lost on refresh
- **Responsive** — Works on mobile, tablet, and desktop
- **Animations** — Staggered fade-in cards, smooth sidebar transitions, hover micro-interactions

---

## 🛠 Tech Stack

| Layer      | Tech                        |
| ---------- | --------------------------- |
| Framework  | React 18                    |
| State      | Redux Toolkit + React-Redux |
| Styling    | Tailwind CSS v3             |
| Charts     | Recharts                    |
| Icons      | Lucide React                |
| Date utils | date-fns                    |
| Build tool | Vite                        |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/finvault.git
cd finvault

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
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

| Feature            | Viewer | Admin |
| ------------------ | ------ | ----- |
| View dashboard     | ✅     | ✅    |
| View transactions  | ✅     | ✅    |
| View insights      | ✅     | ✅    |
| Add transaction    | ❌     | ✅    |
| Edit transaction   | ❌     | ✅    |
| Delete transaction | ❌     | ✅    |
| Export CSV         | ✅     | ✅    |

Switch roles using the switcher at the bottom of the sidebar. Role persists via localStorage.

---
