import React, { useCallback, useState, useMemo } from 'react'
import { IonContent, IonText, IonFab, IonFabButton, IonIcon, useIonViewWillEnter } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import useMountedState from 'react-use/lib/useMountedState'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'

import { add } from 'ionicons/icons'

import { TransactionEntry, Toolbar, FullPageLoader, PullToRefresh } from 'components'
import routes from 'routes'
import { formatDate, determineDays } from 'utils'
import { UserTransactions } from 'modules/transaction'
import { useUser } from 'modules/authentication'

const useHomeViewStyles = createUseStyles(theme => ({
  top: {
    width: '100%',
    height: theme.spacing(30),
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

const useHomeHooks = () => {
  const isMounted = useMountedState()
  const { allowance, dueDate } = useUser()
  const { data = {}, loading, refetch } = useQuery(UserTransactions)
  const [toolbarTransition, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const { amountLeft, groupSpent, daysLeft } = useMemo(() => {
    const { _amountLeft, _groupSpent } = reduce((acc, curr) => {
      if (curr.group) {
        acc._groupSpent = acc._groupSpent + curr.amount
      } else {
        acc._amountLeft = acc._amountLeft + curr.amount
      }
      return acc
    })({ _amountLeft: 0, _groupSpent: 0 })(data.transactions)

    return {
      groupSpent: (_groupSpent / 100).toFixed(2),
      amountLeft: ((allowance - _amountLeft) / 100).toFixed(2),
      daysLeft: determineDays(dueDate)
    }
  }, [dueDate, data, allowance])

  useIonViewWillEnter(() => isMounted() && refetch())

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

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

const Home = () => {
  const classes = useHomeViewStyles()
  const { amountLeft, groupSpent, daysLeft, onRefresh, toolbarTransition, scrollHandler, transactions, loading } = useHomeHooks()

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar translucent color={toolbarTransition ? 'primary' : null} />
      <IonContent color="dark" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <PullToRefresh onRefresh={onRefresh} />
        <div className={classes.top} />

        <div className={classes.card}>
          <IonText color="textPrimary">
            <p>{todayDate}</p>
          </IonText>
          <span>
            <IonText color="textPrimary">
              <h2>
                <strong>${amountLeft}</strong>
              </h2>
            </IonText>
            {!!groupSpent && (
              <IonText color="textSecondary">
                <p>
                  Group Spent: ${groupSpent}
                </p>
              </IonText>
            )}
          </span>
          <IonText color="textPrimary">
            <p>{daysLeft}</p>
          </IonText>
        </div>

        <div className={classes.transactions}>
          {map(t => <TransactionEntry key={t.id} {...t} />)(transactions)}
        </div>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink={routes.newTransaction}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  )
}

export default Home
