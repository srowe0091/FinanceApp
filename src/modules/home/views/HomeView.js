import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { IonText, IonIcon } from '@ionic/react'
import AnimateHeight from 'react-animate-height'
import AnimatedNumber from 'react-animated-number'
import map from 'lodash/fp/map'

import { chevronDown } from 'ionicons/icons'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { PageContainer, Loading } from 'template'
import { Fab, PullToRefresh, Card, ProgressBar } from 'components'
import { formatDate, currency } from 'utils'
import routes from 'routes'
import { StaggeredList } from 'animation'
import { TransactionEntry } from 'modules/transaction'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')
const DURATION = 1500

const Home = () => {
  const [expand, updateExpansion] = useState(false)
  const { inGroup, amountLeft, percentage, groupSpent, creditCards, transactions, loading, onRefresh } = useHomeHooks()
  const classes = useHomeViewStyles({ cardsPresent: creditCards.length })

  const handleOpenSummary = useCallback(
    () => !expand && creditCards.length > 1 && updateExpansion(true),
    [creditCards.length, expand]
  )

  const handleCloseSumary = useCallback(() => expand && updateExpansion(false), [expand])

  return (
    <PageContainer loading={loading}>
      {!loading && <PullToRefresh onRefresh={onRefresh} />}

      <div className={clsx(classes.header, expand && classes.expandedHeader)}>
        <AnimatedNumber
          component="h2"
          value={amountLeft}
          style={{ fontWeight: 'bold' }}
          duration={DURATION}
          formatValue={currency}
        />

        <ProgressBar className={classes.progressBar} duration={DURATION} percent={percentage} />

        <p>{todayDate}</p>
      </div>

      {(inGroup || creditCards.length > 0) && (
        <div className={clsx(classes.summary, expand && classes.expandedSummary)} onClick={handleOpenSummary}>
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
              ))(creditCards)}
            </div>
          </AnimateHeight>

          {inGroup && (
            <div className={classes.flex}>
              <h6>{groupSpent}</h6>
              <p variant="caption" color="textSecondary">
                Group Spent
              </p>
            </div>
          )}

          {creditCards.length > 1 && (
            <IonIcon
              onClick={handleCloseSumary}
              icon={chevronDown}
              className={clsx(classes.expandIcon, expand && classes.rotateIcon)}
            />
          )}
        </div>
      )}

      <div
        className={clsx(
          classes.transactions,
          !loading && classes.reset,
          transactions.length === 0 && classes.transactionSpacing
        )}
      >
        <Loading spinner>
          {transactions.length === 0 && (
            <p align="center" color="textSecondary">
              No transactions
            </p>
          )}
          {transactions.map((t, idx) => (
            <StaggeredList key={t.id} index={idx} delay={10}>
              <TransactionEntry {...t} />
            </StaggeredList>
          ))}
        </Loading>
      </div>

      <Fab routerLink={routes.newTransaction} />
    </PageContainer>
  )
}

export default Home
