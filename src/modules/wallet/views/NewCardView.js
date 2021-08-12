import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/client'

import { SaveNewCard } from '../wallet.gql'
import { NewCardSchema, initialNewCard, cards, useNewCardViewStyles } from '../util'
import { Card, Fab, Input, Select, FieldController } from 'components'
import { daysInMonth } from 'utils'

export const NewCardView = ({ dismissModal }) => {
  const classes = useNewCardViewStyles()
  const [saveNewCard] = useMutation(SaveNewCard, {
    awaitRefetchQueries: true,
    refetchQueries: ['GetWallet']
  })

  const form = useForm({
    resolver: yupResolver(NewCardSchema),
    defaultValues: initialNewCard
  })

  const onSubmit = useCallback(
    values => {
      const variables = {
        input: {
          name: values.cardName,
          dueDate: parseInt(values.cardDueDate),
          type: values.cardType
        }
      }
      saveNewCard({ variables }).then(() => dismissModal())
    },
    [saveNewCard, dismissModal]
  )

  const cardType = form.watch('cardType')

  const {
    formState: { isSubmitting }
  } = form

  return (
    <IonContent>
      <FormProvider {...form}>
        <form className={classes.container}>
          <Card className={classes.card} type={cardType} />
          <FieldController name="cardName" placeholder="Card Name" component={Input} />

          <FieldController name="cardDueDate" label="Due Date" options={daysInMonth} component={Select} />

          <FieldController name="cardType" label="Card Type" options={cards} component={Select} />

          <Fab onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
        </form>
      </FormProvider>
    </IonContent>
  )
}

NewCardView.propTypes = {
  dismissModal: PropTypes.func
}
