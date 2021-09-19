import React, { useCallback, useState, useMemo, Fragment } from 'react'
import { IonText, useIonViewDidLeave } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { useMutation } from '@apollo/client'
import sumBy from 'lodash/fp/sumBy'
import concat from 'lodash/fp/concat'
import reject from 'lodash/fp/reject'
import groupBy from 'lodash/fp/groupBy'
import isEqual from 'lodash/fp/isEqual'
import includes from 'lodash/fp/includes'
import mapValues from 'lodash/fp/mapValues'

import { usePayTransactionStyles } from '../util'
import { GroupTransactions, PayTransactions } from '../admin.gql'
import { StaggeredList, Fade } from 'animation'
import { PageContainer } from 'template'
import { Fab, PullToRefresh } from 'components'
import { currency } from 'utils'
import { useQuery } from 'hooks'
import Pubsub from 'modules/pubsub'
import { TransactionEntry } from 'modules/transaction'

const PayTransaction = props => {
  const classes = usePayTransactionStyles()
  const [transactionIds, updateSelectedIds] = useState([])
  const { data = [], loading, refetch } = useQuery(GroupTransactions, { path: 'admin.groupTransactions' })
  const [payTransaction, { loading: ptLoading }] = useMutation(PayTransactions, {
    variables: { transactionIds },
    awaitRefetchQueries: true,
    refetchQueries: ['UserTransactions', 'GroupTransactions'],
    onCompleted: () => {
      updateSelectedIds([])
      Pubsub.emit('TOAST_NOTIFICATION', 'Transactions Paid')
    }
  })
  const checkboxClick = useCallback(
    id => e => updateSelectedIds(_ids => (e.target.checked ? concat(_ids)(id) : reject(isEqual(id))(_ids))),
    []
  )
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])

  const { transactions, totalSpent } = useMemo(() => {
    const groupedTransactions = groupBy('owner.email')(data)
    const totalSpent = mapValues(sumBy('amount'))(groupedTransactions)
    return { totalSpent, transactions: groupedTransactions }
  }, [data])

  // This only works because tabs are present and views do not get removed from DOM
  useIonViewDidLeave(() => {
    updateSelectedIds([])
  })

  return (
    <PageContainer loading={loading} {...props}>
      <PullToRefresh onRefresh={onRefresh} />

      <div className={classes.transactions}>
        {!data.length === 0 && !loading && (
          <IonText>
            <h5 align="center" className={classes.emptyView}>
              No transactions
            </h5>
          </IonText>
        )}
        {Object.keys(transactions).map(email => (
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
        ))}
      </div>

      <Fab icon={checkmark} onClick={payTransaction} disabled={!transactionIds.length} loading={ptLoading} />
    </PageContainer>
  )
}

export default PayTransaction
