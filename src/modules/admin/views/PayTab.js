import React, { useCallback, useState, useMemo, Fragment } from 'react'
import { IonContent, IonText, useIonViewWillEnter } from '@ionic/react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import useMountedState from 'react-use/lib/useMountedState'
import map from 'lodash/fp/map'
import concat from 'lodash/fp/concat'
import reject from 'lodash/fp/reject'
import isEmpty from 'lodash/fp/isEmpty'
import groupBy from 'lodash/fp/groupBy'
import includes from 'lodash/fp/includes'

import { useAdminViewStyles } from '../util'
import { GroupTransactions, PayTransactions } from '../admin.gql'
import { Button } from 'elements'
import { TransactionEntry, FullPageLoader, PullToRefresh } from 'components'
import Pubsub from 'modules/pubsub'

const PayTransaction = () => {
  const isMounted = useMountedState()
  const classes = useAdminViewStyles()
  const [transactionIds, handleIds] = useState([])
  const { data, loading, refetch } = useQuery(GroupTransactions)
  const [payTransaction, { loading: ptLoading }] = useMutation(PayTransactions, {
    variables: { transactionIds },
    awaitRefetchQueries: true,
    refetchQueries: ['UserTransactions'],
    onCompleted: () => Pubsub.emit('TOAST_NOTIFICATION', 'Transactions Paid')
  })
  const checkboxClick = useCallback(
    id => e => handleIds(_ids => (e.target.checked ? concat(_ids)(id) : reject(_id => _id === id)(_ids))),
    []
  )
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const transactions = useMemo(() => groupBy('owner')(data?.admin?.groupTransactions), [data])

  useIonViewWillEnter(() => {
    if (isMounted()) {
      handleIds([])
    }
  })

  if (loading) {
    return (
      <FullPageLoader />
    )
  }

  return (
    <IonContent color="dark">
      <PullToRefresh onRefresh={onRefresh} />
      <div className={classes.wrapper}>
        <div className={classes.transactions}>
          {isEmpty(transactions) ? (
            <IonText color="textSecondary">
              <h5 align="center" className={classes.emptyView}>No transactions</h5>
            </IonText>
          ) : Object.keys(transactions).map(email => (
            <Fragment key={email}>
              <IonText color="textSecondary">
                <h5 className={classes.headers}>{email}</h5>
              </IonText>
              {map(t => (
                <TransactionEntry
                  key={t.id}
                  onCheckboxClick={checkboxClick}
                  checked={includes(t.id)(transactionIds)}
                  {...t}
                />
              ))(transactions[email])}
            </Fragment>
          ))}
        </div>
        {!!transactionIds.length && (
          <Button
            className={classes.button}
            disabled={ptLoading || !transactionIds.length}
            loading={ptLoading}
            onClick={payTransaction}
          >
            Pay
          </Button>
        )}
      </div>
    </IonContent>
  )
}

export default PayTransaction
