import React from 'react'
import { IonText, IonSlides, IonSlide } from '@ionic/react'
import map from 'lodash/fp/map'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { Fab } from 'elements'
import { ToolbarContent } from 'template'
import { PullToRefresh, Card } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'
import { StaggeredList, Fade, SlideIn } from 'animation'
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

      <Fade duration={750}>
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
      </Fade>
      <SlideIn duration={750}>
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
      </SlideIn>

      <div className={classes.transactions}>
        {transactions.map((t, idx) => (
          <StaggeredList key={t.id} index={idx} delay={10}>
            <TransactionEntry {...t} />
          </StaggeredList>
        ))}
      </div>
      <Fab delay={300} routerLink={routes.newTransaction} />
    </ToolbarContent>
  )
}

export default Home
