import { useCallback, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import map from 'lodash/fp/map'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'
import reduce from 'lodash/fp/reduce'
import groupBy from 'lodash/fp/groupBy'
import orderBy from 'lodash/fp/orderBy'
import compose from 'lodash/fp/compose'

import { calculateDays, currency } from 'utils'
import { useQuery } from 'hooks'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'

export const useHomeViewStyles = createUseStyles(theme => ({
  header: {
    color: 'var(--white)',
    textShadow: '0px 4px 4px var(--alpha5)',
    textAlign: 'center',
    padding: theme.spacing(6, 4, 8),
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-around',
    background: theme.linearGradient('var(--ion-color-primary)', 'var(--ion-color-secondary)'),
    transition: theme.transition({})
  },
  progressBar: {
    maxWidth: 300,
    margin: theme.spacing(3, 'auto'),
    filter: 'drop-shadow(0px 2px 6px var(--alpha5))'
  },
  transactions: {
    flex: 1,
    minHeight: '100px',
    backgroundColor: '#F8F8FF',
    transform: 'translateY(-68px)',
    transition: theme.transition({ duration: 750, timing: 'ease-out' }),
    padding: theme.spacing(0, 2, 8),
    '&:before': {
      content: '""',
      width: '100%',
      height: '16px',
      left: 0,
      position: 'absolute',
      transform: 'translateY(-100%)',
      backgroundColor: '#F8F8FF',
      borderRadius: '20px 20px 0 0 '
    }
  },
  transactionSpacing: {
    paddingTop: theme.spacing(2)
  },
  summary: {
    position: 'relative',
    padding: theme.spacing(0, 2, 0),
    backgroundColor: '#e0e9ff',
    transition: theme.transition({}),
    '&:before': {
      content: '""',
      width: '100%',
      height: '16px',
      left: 0,
      position: 'absolute',
      transform: 'translateY(-100%)',
      backgroundColor: '#e0e9ff',
      borderRadius: '20px 20px 0 0 '
    }
  },
  reset: {
    transform: 'translateY(0)'
  },
  stretch: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  cardWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  cardList: {
    paddingBottom: theme.spacing(4)
  },
  expandedSummary: {
    marginTop: ({ cardsPresent }) => theme.spacing(-Math.min(cardsPresent, 5))
  },
  expandedHeader: {
    marginTop: ({ cardsPresent }) => theme.spacing(-Math.min(cardsPresent, 6))
  },
  expandIcon: {
    margin: '0 auto',
    left: 0,
    right: 0,
    bottom: 18,
    position: 'absolute',
    transition: theme.transition({ duration: 200 })
  },
  rotateIcon: {
    transform: 'rotateZ(-180deg)',
    bottom: theme.spacing(3.5)
  },
  profileIcon: {
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
    position: 'absolute'
  }
}))

export const useHomeHooks = () => {
  const { inGroup, allowance, profileImage } = useUser()
  const { cards, loading: walletLoading } = useWallet()
  const { data = {}, loading, refetch } = useQuery(UserTransactions, { variables: { inGroup } })
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])

  const { amountLeft, groupSpent, percentage, transactions } = useMemo(() => {
    const _amountLeft = reduce((acc, curr) => {
      if (!curr.group) {
        acc = acc + curr.amount
      }
      return acc
    })(0)(data.transactions)

    const diff = allowance - _amountLeft

    return {
      groupSpent: currency(data.groupSpent),
      amountLeft: diff,
      percentage: diff / allowance,
      transactions: orderBy(['date'])(['desc'])(data.transactions)
    }
  }, [data, allowance])

  const creditCards = useMemo(() => {
    const creditCards = compose(
      sortBy('daysLeft'),
      map(d => Object.assign({}, d, calculateDays(d.dueDate)))
    )(cards)

    const cardKeys = groupBy('card.id')(transactions)
    return map(card => ({ ...card, transactionSum: sumBy('amount')(cardKeys[card.id]) }))(creditCards)
  }, [transactions, cards])

  const _loading = loading || walletLoading

  return {
    onRefresh,
    inGroup,
    creditCards,
    percentage: _loading ? 0 : percentage,
    amountLeft: _loading ? 0 : amountLeft,
    groupSpent: _loading ? 0 : groupSpent,
    transactions,
    profileImage,
    loading: _loading
  }
}
