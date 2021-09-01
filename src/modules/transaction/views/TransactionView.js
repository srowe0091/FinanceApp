import React from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIonViewWillLeave } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import map from 'lodash/fp/map'

import { TransactionSchema, useTransactionViewStyles } from '../util'
import { PageContainer } from 'template'
import { currenyFormat } from 'utils'
import { Fab, Input, Header, MaskedInput, Checkbox, Select, DatePicker, FieldController } from 'components'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'

export const TransactionView = ({ header, onSubmit, defaultValues, edit }) => {
  const classes = useTransactionViewStyles()
  const { inGroup } = useUser()
  const { cards } = useWallet({
    transform: map(card => ({ label: card.name, value: card.id }))
  })

  const form = useForm({
    defaultValues,
    resolver: yupResolver(TransactionSchema)
  })

  const {
    formState: { isSubmitting }
  } = form

  useIonViewWillLeave(form.reset)

  return (
    <PageContainer padding>
      <Header goBack label={header} />

      <FormProvider {...form}>
        <form className={classes.form} autoComplete="off">
          <FieldController
            autoFocus
            type="tel"
            name="amount"
            className={classes.moneyInput}
            format={currenyFormat}
            component={MaskedInput}
          />

          <FieldController name="description" placeholder="Memo" component={Input} />

          <FieldController name="card" label="Put on Card" options={cards} component={Select} />

          {edit && <FieldController name="date" component={DatePicker} />}

          {inGroup && <FieldController label="Group Purchase" name="group" component={Checkbox} />}

          <Fab icon={checkmark} onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
        </form>
      </FormProvider>
    </PageContainer>
  )
}

TransactionView.propTypes = {
  header: PropTypes.string,
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object,
  edit: PropTypes.bool
}
