import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/client'

import { useNewBillsStyles, initialNewBill, NewBillSchema } from '../util'
import { SaveNewBill } from '../bills.gql'
import { MaskedInput, Input, Select, Fab } from 'elements'
import { daysInMonth, currenyFormat, toNumber } from 'utils'

const selectOptions = [
  { value: 'MORTGAGE_RENT', label: 'Mortgage/Rent' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'UTILITIES', label: 'Utilities' },
  { value: 'VEHICLE', label: 'Vehicle' },
  { value: 'CREDIT_CARD', label: 'Credit Card' }
]

const NewBillView = ({ dismissModal }) => {
  const classes = useNewBillsStyles()
  const [saveNewBill] = useMutation(SaveNewBill, {
    awaitRefetchQueries: true,
    refetchQueries: ['GetBills']
  })

  const onSubmit = useCallback(
    values => {
      const variables = {
        input: {
          ...values,
          amount: toNumber(values.amount),
          dueDate: parseInt(values.dueDate)
        }
      }
      saveNewBill({ variables }).then(() => dismissModal())
    },
    [saveNewBill, dismissModal]
  )

  return (
    <IonContent color="dark">
      <Formik onSubmit={onSubmit} validationSchema={NewBillSchema} initialValues={initialNewBill} validateOnMount>
        {({ values, handleBlur, handleChange, handleSubmit, isValid, isSubmitting }) => (
          <Form className={classes.container}>
            <Input name="name" placeholder="Bill" value={values.name} onBlur={handleBlur} onChange={handleChange} />

            <MaskedInput
              autoFocus
              type="tel"
              name="amount"
              format={currenyFormat}
              value={values.amount}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Select
              name="dueDate"
              label="Due Date"
              value={values.dueDate}
              options={daysInMonth}
              onChange={handleChange}
            />

            <Select
              name="type"
              label="Bill Type"
              className={classes.select}
              value={values.type}
              options={selectOptions}
              onChange={handleChange}
            />

            <Input name="notes" placeholder="Notes" value={values.notes} onBlur={handleBlur} onChange={handleChange} />

            <Fab onClick={handleSubmit} loading={isSubmitting} disabled={!isValid} />
          </Form>
        )}
      </Formik>
    </IonContent>
  )
}

NewBillView.propTypes = {
  dismissModal: PropTypes.func
}

export default NewBillView
