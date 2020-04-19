import { useCallback, useState, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import reduce from 'lodash/fp/reduce'

import { determineDays } from 'utils'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'

export const useHomeViewStyles = createUseStyles(theme => ({
  top: {
    width: '100%',
    height: theme.spacing(23),
    top: 0,
    position: 'absolute',
    background: 'linear-gradient(140deg, var(--ion-color-secondary) 0%, var(--ion-color-primary) 100%)',
    '&:before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: theme.spacing(12),
      background: 'linear-gradient(to bottom, var(--alpha0) 0%, var(--themeGray2) 100%)',
      position: 'absolute',
      bottom: '-1px'
    }
  },
  card: {
    textAlign: 'center',
    width: '80%',
    height: theme.spacing(20),
    margin: theme.spacing(2, 'auto', 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'relative',
    background: 'var(--white)',
    borderRadius: '20px'
  },
  transactions: {
    margin: theme.spacing(4, 2, 0),
    paddingBottom: theme.spacing(7)
  }
}))

export const useHomeHooks = () => {
  const { allowance, dueDate } = useUser()
  const { data = {}, loading, refetch } = useQuery(UserTransactions)
  const [toolbarTransition, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const { amountLeft, groupSpent, daysLeft } = useMemo(() => {
    const _amountLeft = reduce((acc, curr) => {
      if (!curr.group) {
        acc = acc + curr.amount
      }
      return acc
    })(0)(data.transactions)

    return {
      groupSpent: (data.groupSpent / 100).toFixed(2),
      amountLeft: ((allowance - _amountLeft) / 100).toFixed(2),
      daysLeft: determineDays(dueDate)
    }
  }, [dueDate, data, allowance])

  return {
    amountLeft,
    groupSpent,
    daysLeft,
    onRefresh,
    toolbarTransition,
    scrollHandler,
    loading,
    transactions: data.transactions
  }
}