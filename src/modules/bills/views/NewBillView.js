import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { useIonViewWillLeave } from '@ionic/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { checkmark } from 'ionicons/icons'
import pick from 'lodash/fp/pick'

import { initialNewBill, NewBillSchema } from '../util'
import { SaveNewBill } from '../bills.gql'
import { MaskedInput, Input, Select, Fab, FieldController, Header, Autocomplete } from 'components'
import { daysInMonth, currenyFormat, toNumber } from 'utils'
import { PageContainer } from 'template'
import { CompanySearch } from 'modules/search'

const selectOptions = [
  { value: 'MORTGAGE_RENT', label: 'Mortgage/Rent' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'SUBSCRIPTION', label: 'Subscription' },
  { value: 'UTILITIES', label: 'Utilities' },
  { value: 'VEHICLE', label: 'Vehicle' },
  { value: 'CREDIT_CARD', label: 'Credit Card' }
]

const NewBillView = ({ history }) => {
  const [saveNewBill] = useMutation(SaveNewBill, {
    awaitRefetchQueries: true,
    refetchQueries: ['GetBills']
  })

  const form = useForm({
    resolver: yupResolver(NewBillSchema),
    defaultValues: initialNewBill
  })

  const onSubmit = useCallback(
    values =>
      saveNewBill({
        variables: {
          input: Object.assign(
            values,
            {
              amount: toNumber(values.amount),
              dueDate: parseInt(values.dueDate)
            },
            pick(['name', 'logo'])(values.name)
          )
        }
      }).then(history.goBack),
    [saveNewBill, history]
  )

  useIonViewWillLeave(form.reset)

  const {
    formState: { isSubmitting }
  } = form

  return (
    <PageContainer padding>
      <Header goBack label="Add a New Bill" />

      <FormProvider {...form}>
        <form>
          <FieldController autoFocus name="name" placeholder="Bill" query={CompanySearch} component={Autocomplete} />

          <FieldController type="tel" name="amount" format={currenyFormat} component={MaskedInput} />

          <FieldController name="dueDate" label="Due Date" options={daysInMonth} component={Select} />

          <FieldController name="type" label="Bill Type" options={selectOptions} component={Select} />

          <FieldController name="notes" placeholder="Notes" component={Input} />

          <Fab icon={checkmark} onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
        </form>
      </FormProvider>
    </PageContainer>
  )
}

NewBillView.propTypes = {
  history: PropTypes.object
}

export default NewBillView
