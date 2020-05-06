import { useCallback, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import reduce from 'lodash/fp/reduce'

import { determineDays } from 'utils'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'

export const useHomeViewStyles = createUseStyles(theme => ({
  card: {
    textAlign: 'center',
    width: '80%',
    height: theme.spacing(21),
    margin: theme.spacing(1, 'auto', 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'relative',
    background: theme.linearGradient('var(--ion-color-primary)', 'var(--ion-color-secondary)'),
    boxShadow: '0px 4px 10px -4px var(--black)',
    borderRadius: 'var(--borderRadius)'
  },
  transactions: {
    margin: theme.spacing(4, 2, 0),
    paddingBottom: theme.spacing(7)
  }
}))

export const useHomeHooks = () => {
  const { allowance, dueDate, inGroup } = useUser()
  const { data = {}, loading, refetch } = useQuery(UserTransactions, { variables: { inGroup } })
  // const [toolbarTransition, toggleStyle] = useState(false)
  // const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
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
    // scrollHandler,
    loading,
    transactions: data.transactions
  }
}
