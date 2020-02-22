import React, { useCallback, useState } from 'react'
import { IonContent, IonText, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, useIonViewWillEnter } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'

import { add } from 'ionicons/icons'

import { TransactionEntry, Toolbar, FullPageLoader } from 'components'
import routes from 'routes'
import { UserTransactions } from 'modules/transaction'
import { formatDate } from 'utils/normalizer'

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
    borderRadius: '20px',
  },
  transactions: {
    margin: theme.spacing(4, 2, 0),
    paddingBottom: theme.spacing(7)
  }
}))

const Home = () => {
  const classes = useHomeViewStyles()
  const [toolbarStyle, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  const { data, loading, refetch } = useQuery(UserTransactions)
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])

  useIonViewWillEnter(() => refetch())

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar translucent color={toolbarStyle ? 'primary' : null} />
      <IonContent color="dark" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className={classes.top} />

        <div className={classes.card}>
          <IonText color="textPrimary">
            <p>{formatDate(new Date(), 'dddd, MMM D, YYYY')}</p>
          </IonText>
          <IonText color="textPrimary">
            <h2><strong>$257.95</strong></h2>
          </IonText>
          <IonText color="textPrimary">
            <p>3 days left</p>
          </IonText>
        </div>

        <div className={classes.transactions}>
          {map(t => <TransactionEntry key={t._id} {...t} />)(data.transactions)}
        </div>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink={routes.newTransaction} >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  )
}

export default Home
