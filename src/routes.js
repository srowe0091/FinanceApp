const routes = {
  login: '/login',
  setupAccount: '/setup-account',
  home: '/home',
  wallet: '/wallet',
  newCard: '/new-card',
  bills: '/bills',
  newBill: '/new-bill',
  profile: '/profile',
  updateAccount: '/update-account',
  newTransaction: '/new-transaction',
  editTransaction: (id = ':id') => `/edit-transaction/${id}`,
  lab: '/lab',
  admin: {
    index: '/admin',
    group: '/admin/group',
    payTransaction: '/admin/pay-transaction'
  }
}

export default routes
