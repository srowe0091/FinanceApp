import React from 'react'
import { IonContent, IonText } from '@ionic/react'
import map from 'lodash/fp/map'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { Fab } from 'elements'
import { TransactionEntry, Toolbar, FullPageLoader, PullToRefresh } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

const Home = () => {
  const classes = useHomeViewStyles()
  const {
    amountLeft,
    groupSpent,
    daysLeft,
    onRefresh,
    toolbarTransition,
    scrollHandler,
    transactions,
    loading
  } = useHomeHooks()

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar transition={toolbarTransition} />

      <IonContent color="background" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <PullToRefresh onRefresh={onRefresh} />

        <div className={classes.card}>
          <IonText>
            <p>{todayDate}</p>
          </IonText>
          <span>
            <IonText>
              <h2>
                <strong>${amountLeft}</strong>
              </h2>
            </IonText>
            {groupSpent > 0 && (
              <IonText>
                <p>Group Spent: ${groupSpent}</p>
              </IonText>
            )}
          </span>
          <IonText>
            <p>{daysLeft}</p>
          </IonText>
        </div>

        <div className={classes.transactions}>{map(t => <TransactionEntry key={t._id} {...t} />)(transactions)}</div>
      </IonContent>

      <Fab routerLink={routes.newTransaction} />
    </>
  )
}

export default Home
