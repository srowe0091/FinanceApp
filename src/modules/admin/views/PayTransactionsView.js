import React, { useCallback, useState, useMemo, Fragment } from 'react'
import { IonText, useIonViewWillEnter } from '@ionic/react'
import { useQuery, useMutation } from '@apollo/client'
import { useMountedState } from 'react-use'
import sumBy from 'lodash/fp/sumBy'
import concat from 'lodash/fp/concat'
import reject from 'lodash/fp/reject'
import isEmpty from 'lodash/fp/isEmpty'
import groupBy from 'lodash/fp/groupBy'
import includes from 'lodash/fp/includes'
import mapValues from 'lodash/fp/mapValues'

import { usePayTransactionStyles } from '../util'
import { GroupTransactions, PayTransactions } from '../admin.gql'
import { Fab } from 'elements'
import { StaggeredList, Fade } from 'animation'
import { PageContainer } from 'template'
import { PullToRefresh } from 'components'
import { currency } from 'utils'
import Pubsub from 'modules/pubsub'
import { TransactionEntry } from 'modules/transaction'

const PayTransaction = () => {
  const isMounted = useMountedState()
  const classes = usePayTransactionStyles()
  const [transactionIds, handleIds] = useState([])
  const { data, loading, refetch } = useQuery(GroupTransactions)
  const [payTransaction, { loading: ptLoading }] = useMutation(PayTransactions, {
    variables: { transactionIds },
    awaitRefetchQueries: true,
    refetchQueries: ['UserTransactions', 'GroupTransactions'],
    onCompleted: () => {
      handleIds([])
      Pubsub.emit('TOAST_NOTIFICATION', 'Transactions Paid')
    }
  })
  const checkboxClick = useCallback(
    id => e => handleIds(_ids => (e.target.checked ? concat(_ids)(id) : reject(_id => _id === id)(_ids))),
    []
  )
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const { transactions, totalSpent } = useMemo(() => {
    const groupedTransactions = groupBy('owner.email')(data?.admin?.groupTransactions)
    const totalSpent = mapValues(sumBy('amount'))(groupedTransactions)
    return { transactions: groupedTransactions, totalSpent }
  }, [data])

  useIonViewWillEnter(() => {
    if (isMounted()) {
      handleIds([])
    }
  })

  return (
    <PageContainer loading={loading}>
      <PullToRefresh onRefresh={onRefresh} />
      <div className={classes.transactions}>
        {isEmpty(transactions) ? (
          <IonText>
            <h5 align="center" className={classes.emptyView}>
              No transactions
            </h5>
          </IonText>
        ) : (
          Object.keys(transactions).map(email => (
            <Fragment key={email}>
              <Fade delay={300} duration={500}>
                <IonText>
                  <span className={classes.headers}>{email?.substring(0, 2)}</span>&nbsp;&nbsp;&nbsp;
                  {currency(totalSpent[email])}
                </IonText>
              </Fade>
              {transactions[email]?.map((t, idx) => (
                <StaggeredList key={t.id} index={idx}>
                  <TransactionEntry
                    disableEdit
                    onCheckboxClick={checkboxClick}
                    checked={includes(t.id)(transactionIds)}
                    {...t}
                  />
                </StaggeredList>
              ))}
            </Fragment>
          ))
        )}
      </div>
      {!!transactionIds.length && <Fab disableAnimation text="PAY" onClick={payTransaction} loading={ptLoading} />}
    </PageContainer>
  )
}

export default PayTransaction
