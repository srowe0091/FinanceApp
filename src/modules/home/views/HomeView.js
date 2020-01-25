import React, { useCallback, useState } from 'react'
import { IonContent, IonText, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { format } from 'date-fns'

import { add } from 'ionicons/icons'

import { TransactionEntry, Toolbar } from 'components'
import routes from 'routes'

import data from './data.json'

const useHomeViewStyles = createUseStyles(theme => ({
  top: {
    width: '100%',
    height: theme.spacing(20),
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
  },
  refresher: {
    position: 'fixed',
    backgroundColor: 'var(--themeGray1)',
    '& .spinner-circular, & .refresher-pulling-icon': {
      color: 'var(--white)'
    }
  }
}))

const Home = () => {
  const classes = useHomeViewStyles()
  const [toolbarStyle, toggleStyle] = useState(false)
  const scrollHandler = useCallback(e => toggleStyle(e.detail.scrollTop > 40), [])
  const onRefresh = useCallback(e => {
    setTimeout(() => {
      e.detail.complete()
    }, 2000)
  }, [])
  return (
    <>
      <Toolbar translucent color={toolbarStyle ? 'primary' : null} />
      <IonContent color="dark" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <IonRefresher className={classes.refresher} pullMax={300} slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent refreshingSpinner="circular"></IonRefresherContent>
        </IonRefresher>
        <div className={classes.top} />

        <div className={classes.card}>
          <IonText color="textPrimary">
            <p>{format(new Date(), 'EEEE, MMM dd, yyyy')}</p>
          </IonText>
          <IonText color="textPrimary">
            <h2><strong>$257.95</strong></h2>
          </IonText>
          <IonText color="textPrimary">
            <p>3 days left</p>
          </IonText>
        </div>

        <div className={classes.transactions}>
          {data.map(TransactionEntry)}
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
