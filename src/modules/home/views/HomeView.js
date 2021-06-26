import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { IonText, IonIcon } from '@ionic/react'
import AnimateHeight from 'react-animate-height'
import map from 'lodash/fp/map'

import { add, chevronDown } from 'ionicons/icons'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { PageContainer } from 'template'
import { Fab, PullToRefresh, Card, ProgressBar } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'
import { StaggeredList } from 'animation'
import { TransactionEntry } from 'modules/transaction'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

const Home = () => {
  const [expand, updateExpansion] = useState(false)
  const { amountLeft, percentage, groupSpent, daysLeft, transactions, loading, onRefresh } = useHomeHooks()
  const classes = useHomeViewStyles({ cardsPresent: daysLeft.length })

  const handleOpen = useCallback(
    () => !expand && daysLeft.length > 1 && updateExpansion(true),
    [daysLeft.length, expand]
  )

  const handleClose = useCallback(() => expand && updateExpansion(false), [expand])

  return (
    <PageContainer loading={loading}>
      <PullToRefresh onRefresh={onRefresh} />

      <div className={clsx(classes.header, expand && classes.expandedHeader)}>
        <h2>
          <strong>{amountLeft}</strong>
        </h2>

        <ProgressBar className={classes.progressBar} percent={percentage} />

        <p>{todayDate}</p>
      </div>

      <div className={clsx(classes.summary, expand && classes.expandedSummary)} onClick={handleOpen}>
        <AnimateHeight height={expand ? 'auto' : 68} duration={550} delay={100}>
          <div className={classes.cardList}>
            {map(c => (
              <div key={c.id} className={classes.card}>
                <Card small type={c.type} className={classes.cardSpace} />
                <IonText align="left">
                  <h6>{c.name}</h6>
                  <p variant="caption" color="textSecondary">
                    {c.text}
                  </p>
                </IonText>
              </div>
            ))(daysLeft)}
          </div>
        </AnimateHeight>

        <div className={classes.flex}>
          <h6>{groupSpent}</h6>
          <p variant="caption" color="textSecondary">
            Group Spent
          </p>
        </div>

        {daysLeft.length > 1 && (
          <IonIcon
            onClick={handleClose}
            icon={chevronDown}
            className={clsx(classes.expandIcon, expand && classes.rotateIcon)}
          />
        )}
      </div>
      <div className={classes.transactions}>
        {transactions.map((t, idx) => (
          <StaggeredList key={t.id} index={idx} delay={10}>
            <TransactionEntry {...t} />
          </StaggeredList>
        ))}
      </div>

      <Fab icon={add} routerLink={routes.newTransaction} />
    </PageContainer>
  )
}

export default Home
