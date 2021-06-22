import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import map from 'lodash/fp/map'

import { TransactionSchema, useNewTransactionViewStyles } from '../util'
import { NewTransaction } from '../transaction.gql'
import { PageContainer } from 'template'
import { Input, MaskedInput, Checkbox, Select, Fab } from 'elements'
import { currenyFormat, toNumber } from 'utils'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'

import dollarSign from 'styles/icons/dollarSign.svg'

const NewTransactionPage = ({ history }) => {
  const classes = useNewTransactionViewStyles()
  const { isAdmin, inGroup } = useUser()
  const { cards, defaultCard, loading: walletLoading } = useWallet()
  const [saveTransaction] = useMutation(NewTransaction, {
    awaitRefetchQueries: true,
    refetchQueries: () => ['UserTransactions'].concat(isAdmin ? ['GroupTransactions'] : [])
  })
  const onSubmit = useCallback(
    values => {
      saveTransaction({
        variables: {
          input: {
            ...values,
            amount: toNumber(values.amount)
          }
        }
      }).then(() => history.goBack())
    },
    [saveTransaction, history]
  )

  const initialValues = useMemo(() => ({ amount: 0, description: '', group: false, card: defaultCard }), [defaultCard])

  const cardOptions = useMemo(() => map(card => ({ label: card.name, value: card.id }))(cards), [cards])

  return (
    <PageContainer>
      <Formik
        validateOnMount
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={TransactionSchema}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
          <Form className={classes.container} autoComplete="off">
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

            <Select
              type="popover"
              name="card"
              label={walletLoading ? 'Loading...' : 'Put on Card'}
              value={walletLoading ? '' : values.card}
              options={cardOptions}
              onChange={handleChange}
              disabled={walletLoading}
            />

            {inGroup && <Checkbox label="Group Purchase" name="group" checked={values.group} onChange={handleChange} />}

            <Fab icon={dollarSign} onClick={handleSubmit} loading={isSubmitting} disabled={!isValid} />
          </Form>
        )}
      </Formik>
    </PageContainer>
  )
}

NewTransactionPage.propTypes = {
  history: PropTypes.object
}

export default NewTransactionPage
