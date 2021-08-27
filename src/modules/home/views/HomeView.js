import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { IonText, IonIcon } from '@ionic/react'
import AnimateHeight from 'react-animate-height'
import AnimatedNumber from 'react-animated-number'
import map from 'lodash/fp/map'

import { chevronDown } from 'ionicons/icons'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { PageContainer, Loading } from 'template'
import { Fab, PullToRefresh, Card, ProgressBar, ProfileIcon } from 'components'
import { currency } from 'utils'
import routes from 'routes'
import { StaggeredList } from 'animation'
import { TransactionEntry } from 'modules/transaction'

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

      <div className={classes.profileIcon}>
        <ProfileIcon />
      </div>

      <div className={clsx(classes.header, expand && classes.expandedHeader)}>
        <AnimatedNumber
          component="h2"
          value={amountLeft}
          style={{ fontWeight: 'bold' }}
          duration={DURATION}
          formatValue={currency}
        />

        <ProgressBar className={classes.progressBar} duration={DURATION} percent={percentage} />

        {inGroup && (
          <p>
            Group Spent: <strong>{groupSpent}</strong>
          </p>
        )}
      </div>

      {creditCards.length > 0 && (
        <div className={clsx(classes.summary, expand && classes.expandedSummary)} onClick={handleOpenSummary}>
          <AnimateHeight height={expand ? 'auto' : 68} duration={550} delay={100}>
            <div className={classes.cardList}>
              {map(c => (
                <div key={c.id} className={classes.cardWrapper}>
                  <Card small type={c.type} />

                  <IonText className={classes.stretch} align="left">
                    <h6>{c.name}</h6>
                    <p variant="caption" color="textSecondary">
                      {c.text}
                    </p>
                  </IonText>
                  <p>
                    <strong>{currency(c.transactionSum)}</strong>
                  </p>
                </div>
              ))(creditCards)}
            </div>
          </AnimateHeight>

          {creditCards.length > 1 && (
            <IonIcon
              onClick={handleCloseSumary}
              icon={chevronDown}
              className={clsx(classes.expandIcon, expand && classes.rotateIcon)}
            />
          )}
        </div>
      )}

      <div className={clsx(classes.transactions, !loading && classes.reset)}>
        <Loading spinner>
          {transactions.length === 0 && (
            <p align="center" color="textSecondary" className={classes.transactionSpacing}>
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
