const routes = {
  login: '/login',
  home: '/home',
  wallet: '/wallet',
  bills: '/bills',
  profile: '/profile',
  newTransaction: '/new-transaction',
  newBill: '/new-bill',
  editTransaction: (id = ':id') => `/edit-transaction/${id}`,
  newCard: '/new-card',
  lab: '/lab',
  admin: {
    index: '/admin',
    group: '/admin/group',
    payTransaction: '/admin/pay-transaction'
  }
}

export default routes
