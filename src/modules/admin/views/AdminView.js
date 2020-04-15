import React, { useCallback, useState, useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { IonContent, IonText, useIonViewWillEnter } from '@ionic/react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import useMountedState from 'react-use/lib/useMountedState'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import concat from 'lodash/fp/concat'
import reject from 'lodash/fp/reject'
import groupBy from 'lodash/fp/groupBy'
import includes from 'lodash/fp/includes'

import { useAdminViewStyles } from '../util'
import { GroupTransactions, PayTransactions } from '../admin.gql'
import { Button } from 'elements'
import { Toolbar, TransactionEntry, FullPageLoader, PullToRefresh } from 'components'
import routes from 'routes'

const Admin = ({ history }) => {
  const isMounted = useMountedState()
  const classes = useAdminViewStyles()
  const [transactionIds, handleIds] = useState([])
  const [payTransaction, { loading: ptLoading }] = useMutation(PayTransactions, {
    variables: { transactionIds },
    awaitRefetchQueries: true,
    refetchQueries: ['UserTransactions'],
    onCompleted: () => history.push(routes.home)
  })
  const { data, loading, refetch } = useQuery(GroupTransactions)
  const checkboxClick = useCallback(
    id => e => handleIds(_ids => (e.target.checked ? concat(_ids)(id) : reject(_id => _id === id)(_ids))),
    []
  )
  const onRefresh = useCallback(e => refetch().then(e.detail.complete), [refetch])
  const transactions = useMemo(() => groupBy('owner')(get('admin.groupTransactions')(data)), [data])

  useIonViewWillEnter(() => {
    if (isMounted()) {
      handleIds([])
      refetch()
    }
  })

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar color="medium" title="Pay Transactions" />
      <IonContent color="dark">
        <PullToRefresh onRefresh={onRefresh} />
        <div className={classes.wrapper}>
          <div className={classes.transactions}>
            {Object.keys(transactions).map(email => (
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
          <Button
            type="button"
            className={classes.button}
            disabled={ptLoading || !transactionIds.length}
            loading={ptLoading}
            onClick={payTransaction}
          >
            Pay
          </Button>
        </div>
      </IonContent>
    </>
  )
}

Admin.propTypes = {
  history: PropTypes.object
}

export default Admin
