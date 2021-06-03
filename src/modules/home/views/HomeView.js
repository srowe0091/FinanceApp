import React from 'react'
import { IonText, IonSlides, IonSlide } from '@ionic/react'
import map from 'lodash/fp/map'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { Fab } from 'elements'
import { ToolbarContent } from 'template'
import { PullToRefresh, Card } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'
import { TransactionEntry } from 'modules/transaction'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

const slideOpts = {
  slidesPerView: 1,
  initialSlide: 0,
  centeredSlides: true,
  pager: true
}

const Home = () => {
  const classes = useHomeViewStyles()
  const { amountLeft, groupSpent, daysLeft, transactions, loading, onRefresh } = useHomeHooks()

  return (
    <ToolbarContent loading={loading}>
      <PullToRefresh onRefresh={onRefresh} />

      <div className={classes.card}>
        <span>
          <IonText>
            <h2>
              <strong>{amountLeft}</strong>
            </h2>
          </IonText>
          {!!groupSpent && (
            <IonText>
              <p>Group Spent: {groupSpent}</p>
            </IonText>
          )}
        </span>

        <IonText>
          <p>{todayDate}</p>
        </IonText>
      </div>

      <IonSlides key={daysLeft.length} pager options={slideOpts} className={classes.dueDateContainer}>
        {map(c => (
          <IonSlide key={c.id} className={classes.slide}>
            <Card small type={c.type} className={classes.miniCard} />
            <IonText align="left">
              <p variant="subtitle1">{c.name}</p>
              <p variant="caption" color="textSecondary">
                {c.text}
              </p>
            </IonText>
          </IonSlide>
        ))(daysLeft)}
      </IonSlides>

      <div className={classes.transactions}>{map(t => <TransactionEntry key={t.id} {...t} />)(transactions)}</div>
      <Fab routerLink={routes.newTransaction} />
    </ToolbarContent>
  )
}

export default Home
