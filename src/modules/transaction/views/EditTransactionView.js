import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { createUseStyles } from 'react-jss'
import { IonText, IonContent } from '@ionic/react'
import { Formik, Form } from 'formik'
import map from 'lodash/fp/map'

import { checkmark } from 'ionicons/icons'

import { UpdateTransaction } from '../transaction.gql'
import { Input, Checkbox, Fab, DatePicker, MaskedInput, Select } from 'elements'
import { currenyFormat, toNumber } from 'utils'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'
import Pubsub from 'modules/pubsub'

const useEditTransactionStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  moneyInput: {
    textAlign: 'center',
    fontSize: '50px'
  }
}))

export const EditTransaction = ({ dismissModal, ...cardValues }) => {
  const classes = useEditTransactionStyles()
  const { inGroup } = useUser()
  const { cards, loading: walletLoading } = useWallet()
  const [updateTransaction] = useMutation(UpdateTransaction)

  const cardOptions = useMemo(() => map(card => ({ label: card.name, value: card.id }))(cards), [cards])

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      updateTransaction({
        variables: {
          input: {
            ...values,
            amount: toNumber(values.amount)
          }
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

  return (
    <IonContent>
      <div className={classes.container}>
        <IonText color="light">
          <h5 className={classes.header}>Edit Transaction</h5>
        </IonText>
        <Formik enableReinitialize initialValues={cardValues} onSubmit={onSubmit}>
          {({ handleSubmit, handleBlur, handleChange, isValid, values, isSubmitting }) => (
            <Form className={classes.form} autoComplete="off">
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

              <Input
                name="description"
                placeholder="memo"
                value={values.description || ''}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Select
                type="popover"
                name="card"
                label={walletLoading ? 'Loading...' : 'Put on Card'}
                value={walletLoading ? '' : values.card}
                options={cardOptions}
                onChange={handleChange}
                disabled={walletLoading}
              />

              <DatePicker name="date" value={values.date} onChange={handleChange} />

              {inGroup && (
                <Checkbox
                  color="medium"
                  label="Group Purchase"
                  name="group"
                  checked={values.group}
                  onChange={handleChange}
                />
              )}

              <Fab onClick={handleSubmit} icon={checkmark} disabled={!isValid} loading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </IonContent>
  )
}

EditTransaction.propTypes = {
  dismissModal: PropTypes.func,
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  group: PropTypes.bool,
  date: PropTypes.string
}
