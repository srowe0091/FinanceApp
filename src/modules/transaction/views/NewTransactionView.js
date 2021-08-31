import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { TransactionView } from './TransactionView'
import { NewTransaction } from '../transaction.gql'
import { toNumber } from 'utils'
import { useWallet } from 'modules/wallet'

const NewTransactionView = ({ history }) => {
  const { defaultCard } = useWallet()

  const defaultValues = useMemo(() => ({ amount: 0, description: '', group: false, card: defaultCard }), [defaultCard])

  const [saveTransaction] = useMutation(NewTransaction, {
    awaitRefetchQueries: true,
    refetchQueries: ['UserTransactions']
  })

  const onSubmit = useCallback(
    values =>
      saveTransaction({
        variables: {
          input: Object.assign(values, { amount: toNumber(values.amount) })
        }
      }).then(history.goBack),
    [saveTransaction, history]
  )

  return <TransactionView header="New Transaction" onSubmit={onSubmit} defaultValues={defaultValues} />
}

NewTransactionView.propTypes = {
  history: PropTypes.object
}

export default NewTransactionView
