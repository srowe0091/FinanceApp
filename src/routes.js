const routes = {
  login: '/login',
  setupAccount: '/setup-account',
  home: '/home',
  wallet: '/wallet',
  newCard: '/new-card',
  cardView: (id = ':id') => `/card-details/${id}`,
  profile: '/profile',
  updateAccount: '/update-account',
  newTransaction: '/new-transaction',
  editTransaction: (id = ':id') => `/edit-transaction/${id}`,
  notifications: '/notifications',
  lab: '/lab',
  admin: {
    bills: '/admin/bills',
    newBill: '/admin/new-bill',
    group: '/admin/group',
    payTransaction: '/admin/pay-transaction'
  }
}

export default routes
