import { useCallback, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'
import sortBy from 'lodash/fp/sortBy'
import orderBy from 'lodash/fp/orderBy'
import compose from 'lodash/fp/compose'
import reduce from 'lodash/fp/reduce'

import { calculateDays } from 'utils'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'
import { usePreferences } from 'modules/preferences'

export const useHomeViewStyles = createUseStyles(theme => ({
  card: {
    textAlign: 'center',
    width: '85%',
    height: theme.spacing(21),
    margin: theme.spacing(0, 'auto'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'relative',
    background: theme.linearGradient('var(--ion-color-primary)', 'var(--ion-color-tertiary)'),
    boxShadow: '0px 4px 10px -4px var(--black)',
    borderRadius: 'var(--borderRadius)'
  },
  transactions: {
    paddingBottom: theme.spacing(8)
  },
  dueDateContainer: {
    width: '100%',
    padding: theme.spacing(1, 0),
    margin: theme.spacing(2, 'auto'),
    borderRadius: 'var(--borderRadius)',
    '& > .swiper-pagination': {
      bottom: '5px'
    }
  },
  slide: {
    alignSelf: 'center',
    padding: theme.spacing(0, 2, 2)
  },
  miniCard: {
    marginRight: theme.spacing(2)
  }
}))

export const useHomeHooks = () => {
  const { inGroup } = useUser()
  const { cards, loading: walletLoading } = useWallet()
  const { preferences, preferencesLoading } = usePreferences()
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
      amountLeft: ((preferences?.allowance - _amountLeft) / 100).toFixed(2)
    }
  }, [data, preferences])

  const daysLeft = useMemo(
    () =>
      compose(
        sortBy('count'),
        map(d => Object.assign({}, d, calculateDays(d.dueDate, true)))
      )(cards),
    [cards]
  )

  return {
    amountLeft,
    groupSpent,
    daysLeft,
    onRefresh,
    loading: loading || walletLoading || preferencesLoading,
    transactions: orderBy(['date'])(['desc'])(data.transactions)
  }
}
