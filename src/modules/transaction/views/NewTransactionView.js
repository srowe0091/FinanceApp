import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { IonText, useIonViewWillLeave } from '@ionic/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import map from 'lodash/fp/map'

import { TransactionSchema, useNewTransactionViewStyles } from '../util'
import { NewTransaction } from '../transaction.gql'
import { PageContainer } from 'template'
import { Fab, Input, MaskedInput, Checkbox, Select, FieldController } from 'components'
import { currenyFormat, toNumber } from 'utils'
import { useUser } from 'modules/authentication'
import { useWallet } from 'modules/wallet'

import dollarSign from 'styles/icons/dollarSign.svg'

const NewTransactionPage = ({ history }) => {
  const classes = useNewTransactionViewStyles()
  const { cards, defaultCard } = useWallet()
  const { isAdmin, inGroup } = useUser()

  const form = useForm({
    resolver: yupResolver(TransactionSchema),
    defaultValues: { amount: 0, description: '', group: false, card: defaultCard }
  })

  const cardOptions = useMemo(() => map(card => ({ label: card.name, value: card.id }))(cards), [cards])

  const [saveTransaction] = useMutation(NewTransaction, {
    awaitRefetchQueries: true,
    refetchQueries: () => ['UserTransactions'].concat(isAdmin ? ['GroupTransactions'] : [])
  })

  const onSubmit = useCallback(
    values =>
      saveTransaction({
        variables: {
          input: Object.assign(values, { amount: toNumber(values.amount) })
        }
      }).then(history.goBack),
    [saveTransaction, history]
  )

  useIonViewWillLeave(form.reset)

  const {
    formState: { isSubmitting }
  } = form

  return (
    <PageContainer>
      <div className={classes.container}>
        <IonText display="block">
          <h5 className={classes.header}>New Transaction</h5>
        </IonText>
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

            <FieldController name="description" placeholder="memo" component={Input} />

            <FieldController type="popover" name="card" label="Put on Card" options={cardOptions} component={Select} />

            {inGroup && <FieldController label="Group Purchase" name="group" component={Checkbox} />}

            <Fab icon={dollarSign} onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
          </form>
        </FormProvider>
      </div>
    </PageContainer>
  )
}

NewTransactionPage.propTypes = {
  history: PropTypes.object
}

export default NewTransactionPage
