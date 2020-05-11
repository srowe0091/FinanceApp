import { useCallback, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'
import minBy from 'lodash/fp/minBy'
import reduce from 'lodash/fp/reduce'

import { determineDays } from 'utils'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'

export const useHomeViewStyles = createUseStyles(theme => ({
  card: {
    textAlign: 'center',
    width: '80%',
    height: theme.spacing(21),
    margin: theme.spacing(0, 'auto'),
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
  const { allowance, inGroup } = useUser()
  const { cards, loading: walletLoading } = useWallet()
  const { data = {}, loading, refetch } = useQuery(UserTransactions, { variables: { inGroup } })
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const { amountLeft, groupSpent } = useMemo(() => {
    const _amountLeft = reduce((acc, curr) => {
      if (!curr.group) {
        acc = acc + curr.amount
      }
      return acc
    })(0)(data.transactions)

    return {
      groupSpent: (data.groupSpent / 100).toFixed(2),
      amountLeft: ((allowance - _amountLeft) / 100).toFixed(2)
    }
  }, [data, allowance])

  const daysLeft = useMemo(() => {
    const cardsDaysLeft = map(d => ({ ...d, daysLeft: determineDays(d.dueDate, true) }))(cards)
    if (cardsDaysLeft.length) {
      const closestCardDueDate = minBy('dueDate')(cardsDaysLeft)
      return `${closestCardDueDate.name} - ${determineDays(closestCardDueDate.dueDate)}`
    }
  }, [cards])

  return {
    amountLeft,
    groupSpent,
    daysLeft,
    onRefresh,
    loading: loading || walletLoading,
    transactions: data.transactions
  }
}
