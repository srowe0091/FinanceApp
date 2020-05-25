import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { IonText, IonContent } from '@ionic/react'
import { Formik, Form } from 'formik'
import replace from 'lodash/fp/replace'

import { checkmark } from 'ionicons/icons'

import { UpdateTransaction } from '../transaction.gql'
import { Input, Checkbox, Fab, DatePicker, MaskedInput } from 'elements'
import { Modal } from 'components'
import { currenyFormat } from 'utils'
import { useUser } from 'modules/authentication'
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

export const EditTransaction = ({ isOpen, onClose, amount, id, description, group, date }) => {
  const classes = useEditTransactionStyles()
  const { inGroup } = useUser()
  const [updateTransaction] = useMutation(UpdateTransaction)
  const initialValues = useMemo(() => ({ description, group, date, amount, _id: id }), [
    description,
    group,
    date,
    amount,
    id
  ])

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      updateTransaction({
        variables: {
          input: {
            ...values,
            amount: parseInt(replace(/\D/g)('')(values.amount), '10'),
          }
        }
      })
        .then(() => onClose())
        .catch(err => {
          setSubmitting(false)
          Pubsub.emit('TOAST_NOTIFICATION', err)
        })
    },
    [updateTransaction, onClose]
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <IonContent color="dark">
        <div className={classes.container}>
          <IonText color="light">
            <h5 className={classes.header}>Edit Transaction</h5>
          </IonText>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
    </Modal>
  )
}

EditTransaction.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  group: PropTypes.bool,
  date: PropTypes.string
}
