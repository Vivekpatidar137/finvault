import { subDays, format } from 'date-fns'

const categories = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Rent', 'Salary', 'Freelance', 'Investment']

const catColors = {
  'Food & Dining':  '#00d4ff',
  'Transport':      '#b47cff',
  'Shopping':       '#ffb800',
  'Entertainment':  '#ff4d6d',
  'Healthcare':     '#00ff9d',
  'Utilities':      '#64748b',
  'Rent':           '#f97316',
  'Salary':         '#00ff9d',
  'Freelance':      '#00d4ff',
  'Investment':     '#b47cff',
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function generateTransactions() {
  const txns = []
  const id = (i) => `txn-${String(i).padStart(4, '0')}`

  // Salary every month
  for (let m = 0; m < 6; m++) {
    txns.push({
      id: id(txns.length),
      date: format(subDays(new Date(), m * 30), 'yyyy-MM-dd'),
      description: 'Monthly Salary',
      category: 'Salary',
      type: 'income',
      amount: 95000,
      note: 'Regular payroll',
    })
  }

  // Freelance
  for (let i = 0; i < 6; i++) {
    txns.push({
      id: id(txns.length),
      date: format(subDays(new Date(), rand(1, 170)), 'yyyy-MM-dd'),
      description: 'Freelance Project',
      category: 'Freelance',
      type: 'income',
      amount: rand(8000, 35000),
      note: 'Client project payment',
    })
  }

  // Expenses
  const expenseDefs = [
    { desc: 'Zomato Order', cat: 'Food & Dining', min: 200, max: 1200 },
    { desc: 'Swiggy Delivery', cat: 'Food & Dining', min: 150, max: 800 },
    { desc: 'Cafe Coffee Day', cat: 'Food & Dining', min: 100, max: 400 },
    { desc: 'Uber Ride', cat: 'Transport', min: 80, max: 600 },
    { desc: 'Petrol', cat: 'Transport', min: 500, max: 2500 },
    { desc: 'Amazon Purchase', cat: 'Shopping', min: 300, max: 8000 },
    { desc: 'Flipkart Order', cat: 'Shopping', min: 200, max: 5000 },
    { desc: 'Netflix Subscription', cat: 'Entertainment', min: 649, max: 649 },
    { desc: 'Movie Tickets', cat: 'Entertainment', min: 200, max: 800 },
    { desc: 'Spotify Premium', cat: 'Entertainment', min: 119, max: 119 },
    { desc: 'Apollo Pharmacy', cat: 'Healthcare', min: 200, max: 3000 },
    { desc: 'Gym Membership', cat: 'Healthcare', min: 1500, max: 2500 },
    { desc: 'Electricity Bill', cat: 'Utilities', min: 800, max: 3000 },
    { desc: 'Internet Bill', cat: 'Utilities', min: 700, max: 1200 },
    { desc: 'House Rent', cat: 'Rent', min: 15000, max: 15000 },
    { desc: 'Mutual Fund SIP', cat: 'Investment', min: 5000, max: 10000 },
  ]

  for (let i = 0; i < 80; i++) {
    const def = expenseDefs[rand(0, expenseDefs.length - 1)]
    txns.push({
      id: id(txns.length),
      date: format(subDays(new Date(), rand(0, 179)), 'yyyy-MM-dd'),
      description: def.desc,
      category: def.cat,
      type: def.cat === 'Investment' ? 'investment' : 'expense',
      amount: rand(def.min, def.max),
      note: '',
    })
  }

  return txns.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const transactions = generateTransactions()
export { catColors, categories }
