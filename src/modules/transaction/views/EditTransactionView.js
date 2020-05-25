import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { IonText, IonContent } from '@ionic/react'
import { Formik, Form } from 'formik'
import set from 'lodash/fp/set'
import noop from 'lodash/fp/noop'

import { checkmark } from 'ionicons/icons'

import { UpdateTransaction } from '../transaction.gql'
import { Input, Checkbox, Fab, DatePicker } from 'elements'
import { Modal } from 'components'
import { currency } from 'utils'
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
  }
}))

export const EditTransaction = ({ isOpen, onClose, amount, id, description, group, date }) => {
  const classes = useEditTransactionStyles()
  const { inGroup } = useUser()
  const [updateTransaction] = useMutation(UpdateTransaction)
  const initialValues = useMemo(() => ({ description, group, date, _id: id }), [description, group, date, id])

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      updateTransaction(set('variables.input')(values)({}))
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
              <Form className={classes.form}>
                <Input disabled placeholder="Amount" value={currency(amount)} onChange={noop} onBlur={noop} />

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
  description: PropTypes.string,
  group: PropTypes.bool,
  date: PropTypes.string
}
