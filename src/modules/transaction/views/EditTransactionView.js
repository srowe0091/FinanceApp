import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useApolloClient } from '@apollo/client'
import pick from 'lodash/fp/pick'

import { TransactionView } from './TransactionView'

import { UpdateTransaction, TransactionFragment } from '../transaction.gql'
import { toNumber } from 'utils'
import Pubsub from 'modules/pubsub'

export const EditTransaction = ({ match, history }) => {
  const client = useApolloClient()
  const [updateTransaction] = useMutation(UpdateTransaction)

  const data = client.readFragment({
    id: `Transaction:${match.params.id}`,
    fragment: TransactionFragment
  })

  const _defaultValues = useMemo(() => {
    const values = pick(['amount', 'card.id', 'date', 'description', 'group', 'id'])(data)
    return { ...values, card: values.card?.id }
  }, [data])

  const onSubmit = useCallback(
    (values, { setSubmitting }) =>
      updateTransaction({
        variables: {
          input: Object.assign(values, { amount: toNumber(values.amount) })
        }
      })
        .then(history.goBack)
        .catch(err => {
          setSubmitting(false)
          Pubsub.emit('TOAST_NOTIFICATION', err)
        }),
    [updateTransaction, history]
  )

  if (!data) return history.goBack()

  return <TransactionView edit header="Edit Transaction" onSubmit={onSubmit} defaultValues={_defaultValues} />
}

EditTransaction.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default EditTransaction
