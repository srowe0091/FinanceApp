import React from 'react'
import { IonText } from '@ionic/react'
import map from 'lodash/fp/map'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { Fab } from 'elements'
import { ToolbarContent } from 'template'
import { TransactionEntry, FullPageLoader, PullToRefresh } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

const Home = () => {
  const classes = useHomeViewStyles()
  const { amountLeft, groupSpent, daysLeft, onRefresh, transactions, loading } = useHomeHooks()

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <ToolbarContent>
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
      <Fab routerLink={routes.newTransaction} />
    </ToolbarContent>
  )
}

export default Home
