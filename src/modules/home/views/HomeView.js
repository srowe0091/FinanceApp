import React, { useCallback, useState, useMemo } from 'react'
import { IonContent, IonText, IonFab, IonFabButton, IonIcon, useIonViewWillEnter } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import useMountedState from 'react-use/lib/useMountedState'
import map from 'lodash/fp/map'
import sumBy from 'lodash/fp/sumBy'

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
    height: theme.spacing(18),
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
  const [toolbarStyle, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const { amountLeft, daysLeft } = useMemo(() => {
    return {
      amountLeft: ((allowance - sumBy('amount')(data.transactions)) / 100).toFixed(2),
      daysLeft: determineDays(dueDate)
    }
  }, [dueDate, data, allowance])

  useIonViewWillEnter(() => isMounted() && refetch())

  return {
    amountLeft,
    daysLeft,
    onRefresh,
    toolbarStyle,
    scrollHandler,
    loading,
    transactions: data.transactions
  }
}

const Home = () => {
  const classes = useHomeViewStyles()
  const { amountLeft, daysLeft, onRefresh, toolbarStyle, scrollHandler, transactions, loading } = useHomeHooks()

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar translucent color={toolbarStyle ? 'primary' : null} />
      <IonContent color="dark" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <PullToRefresh onRefresh={onRefresh} />
        <div className={classes.top} />

        <div className={classes.card}>
          <IonText color="textPrimary">
            <p>{formatDate(new Date(), 'dddd, MMM D, YYYY')}</p>
          </IonText>
          <IonText color="textPrimary">
            <h2>
              <strong>{amountLeft}</strong>
            </h2>
          </IonText>
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
