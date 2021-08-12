import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/client'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useNewBillsStyles, initialNewBill, NewBillSchema } from '../util'
import { SaveNewBill } from '../bills.gql'
import { MaskedInput, Input, Select, Fab, FieldController } from 'components'
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

  const form = useForm({
    resolver: yupResolver(NewBillSchema),
    defaultValues: initialNewBill
  })

  const onSubmit = useCallback(
    values => {
      saveNewBill({
        variables: {
          input: Object.assign(values, { amount: toNumber(values.amount), dueDate: parseInt(values.dueDate) })
        }
      }).then(() => dismissModal())
    },
    [saveNewBill, dismissModal]
  )

  const {
    formState: { isSubmitting }
  } = form

  return (
    <IonContent>
      <FormProvider {...form}>
        <form className={classes.container}>
          <FieldController name="name" placeholder="Bill" component={Input} />

          <FieldController autoFocus type="tel" name="amount" format={currenyFormat} component={MaskedInput} />

          <FieldController name="dueDate" label="Due Date" options={daysInMonth} component={Select} />

          <FieldController name="type" label="Bill Type" options={selectOptions} component={Select} />

          <FieldController name="notes" placeholder="Notes" component={Input} />

          <Fab onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
        </form>
      </FormProvider>
    </IonContent>
  )
}

NewBillView.propTypes = {
  dismissModal: PropTypes.func
}

export default NewBillView
