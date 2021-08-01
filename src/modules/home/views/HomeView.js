import React, { useCallback, useState } from 'react'
import clsx from 'clsx'
import { IonText, IonIcon } from '@ionic/react'
import AnimateHeight from 'react-animate-height'
import map from 'lodash/fp/map'

import { chevronDown } from 'ionicons/icons'

import { useHomeViewStyles, useHomeHooks } from '../util'
import { PageContainer, Loading } from 'template'
import { Fab, PullToRefresh, Card, ProgressBar } from 'components'
import { formatDate } from 'utils'
import routes from 'routes'
import { StaggeredList } from 'animation'
import { TransactionEntry } from 'modules/transaction'

const todayDate = formatDate(new Date(), 'dddd, MMM D, YYYY')

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
      <PullToRefresh onRefresh={onRefresh} />

      <div className={clsx(classes.header, expand && classes.expandedHeader)}>
        <Loading spacing={10} height={32} width={200}>
          <h2>
            <strong>{amountLeft}</strong>
          </h2>
        </Loading>

        <ProgressBar className={classes.progressBar} percent={loading ? 0 : percentage} />

        <p>{todayDate}</p>
      </div>

      {(inGroup || creditCards.length > 0) && (
        <div className={clsx(classes.summary, expand && classes.expandedSummary)} onClick={handleOpenSummary}>
          <Loading marginTop={8} marginBottom={40} height={20}>
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
          </Loading>
        </div>
      )}

      <div className={classes.transactions}>
        <Loading spinner>
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
