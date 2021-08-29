import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { createUseStyles } from 'react-jss'
import { useForm, FormProvider } from 'react-hook-form'
import map from 'lodash/fp/map'

import { checkmark } from 'ionicons/icons'

import { UpdateTransaction } from '../transaction.gql'
import { Header, Input, Checkbox, Fab, DatePicker, MaskedInput, Select, FieldController } from 'components'
import { currenyFormat, toNumber } from 'utils'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'
import Pubsub from 'modules/pubsub'
import { PageContainer } from 'template'

const useEditTransactionStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    padding: theme.spacing(2)
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

export const EditTransaction = ({ dismissModal, ...defaultValues }) => {
  const classes = useEditTransactionStyles()
  const { inGroup } = useUser()
  const { cards } = useWallet()
  const [updateTransaction] = useMutation(UpdateTransaction)

  const cardOptions = useMemo(() => map(card => ({ label: card.name, value: card.id }))(cards), [cards])

  const form = useForm({ defaultValues })

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

  const {
    formState: { isSubmitting }
  } = form

  return (
    <PageContainer className={classes.container}>
      <Header label="Edit Transaction" />

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

          <FieldController name="card" label="Put on Card" options={cardOptions} component={Select} />

          <FieldController name="date" component={DatePicker} />

          {inGroup && <FieldController label="Group Purchase" name="group" component={Checkbox} />}

          <Fab onClick={form.handleSubmit(onSubmit)} icon={checkmark} loading={isSubmitting} />
        </form>
      </FormProvider>
    </PageContainer>
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
