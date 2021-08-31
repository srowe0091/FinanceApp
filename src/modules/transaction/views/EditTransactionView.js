import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { TransactionView } from './TransactionView'

import { UpdateTransaction } from '../transaction.gql'
import { toNumber } from 'utils'
import Pubsub from 'modules/pubsub'

export const EditTransaction = ({ dismissModal, ...defaultValues }) => {
  const [updateTransaction] = useMutation(UpdateTransaction)

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      updateTransaction({
        variables: {
          input: Object.assign(values, { amount: toNumber(values.amount) })
        }
      })
        .then(() => dismissModal())
        .catch(err => {
          setSubmitting(false)
          Pubsub.emit('TOAST_NOTIFICATION', err)
        })
    },
    [updateTransaction, dismissModal]
  )

  return <TransactionView edit header="Edit Transaction" onSubmit={onSubmit} defaultValues={defaultValues} />
}

EditTransaction.propTypes = {
  dismissModal: PropTypes.func
}
