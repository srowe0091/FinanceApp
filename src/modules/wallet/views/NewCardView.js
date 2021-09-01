import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider } from 'react-hook-form'
import { useIonViewWillLeave } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'

import { SaveNewCard } from '../wallet.gql'
import { NewCardSchema, initialNewCard, cards, useNewCardViewStyles } from '../util'
import { PageContainer } from 'template'
import { Card, Fab, Input, Select, FieldController, Header } from 'components'
import { daysInMonth } from 'utils'

const NewCardView = ({ history }) => {
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
    values =>
      saveNewCard({
        variables: {
          input: {
            name: values.cardName,
            dueDate: parseInt(values.cardDueDate),
            type: values.cardType
          }
        }
      }).then(history.goBack),
    [saveNewCard, history]
  )

  const cardType = form.watch('cardType')

  useIonViewWillLeave(form.reset)

  const {
    formState: { isSubmitting }
  } = form

  return (
    <PageContainer padding>
      <Header goBack label="Add a New Card" />

      <FormProvider {...form}>
        <form className={classes.form}>
          <Card className={classes.card} type={cardType} />
          <FieldController name="cardName" placeholder="Card Name" component={Input} />

          <FieldController name="cardDueDate" label="Due Date" options={daysInMonth} component={Select} />

          <FieldController name="cardType" label="Card Type" options={cards} component={Select} />

          <Fab icon={checkmark} onClick={form.handleSubmit(onSubmit)} loading={isSubmitting} />
        </form>
      </FormProvider>
    </PageContainer>
  )
}

NewCardView.propTypes = {
  history: PropTypes.object
}

export default NewCardView
