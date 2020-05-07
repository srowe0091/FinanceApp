import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import replace from 'lodash/fp/replace'

import { TransactionSchema, useNewTransactionViewStyles } from '../util'
import { NewTransaction } from '../transaction.gql'
import { ToolbarContent } from 'template'
import { Input, Button, MaskedInput, Checkbox } from 'elements'
import { currenyFormat } from 'utils'
import { useUser } from 'modules/authentication'

const initialValues = {
  amount: 0,
  description: '',
  group: false
}

const NewTransactionPage = ({ history }) => {
  const classes = useNewTransactionViewStyles()
  const { isAdmin, inGroup } = useUser()
  const [saveTransaction, { loading }] = useMutation(NewTransaction, {
    awaitRefetchQueries: true,
    refetchQueries: () => ['UserTransactions'].concat(isAdmin ? ['GroupTransactions'] : [])
  })
  const onSubmit = useCallback(
    ({ amount, ...values }) => {
      saveTransaction({
        variables: {
          input: {
            amount: parseInt(replace(/\D/g)('')(amount), '10'),
            ...values
          }
        }
      }).then(() => history.goBack())
    },
    [saveTransaction, history]
  )

  return (
    <ToolbarContent back title="New Transaction">
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={TransactionSchema} validateOnMount>
        {({ handleSubmit, values, handleChange, handleBlur, isValid, isSubmitting }) => (
          <form className={classes.wrapper} onSubmit={handleSubmit} autoComplete="off">
            <MaskedInput
              autoFocus
              type="tel"
              name="amount"
              className={classes.moneyInput}
              format={currenyFormat}
              value={values.amount}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Input name="description" placeholder="memo" onBlur={handleBlur} onChange={handleChange} />
            {inGroup && <Checkbox label="Group Purchase" name="group" checked={values.group} onChange={handleChange} />}
            <Button type="submit" className={classes.button} disabled={isSubmitting || !isValid} loading={loading}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </ToolbarContent>
  )
}

NewTransactionPage.propTypes = {
  history: PropTypes.object
}

export default NewTransactionPage
