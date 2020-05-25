import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { IonContent } from '@ionic/react'
import { useMutation } from '@apollo/react-hooks'

import { SaveNewCard } from '../wallet.gql'
import { NewCardSchema, initialNewCard, useNewCardViewStyles } from '../util'
import { Input, Select, Fab } from 'elements'
import { Card } from 'components'
import { daysInMonth } from 'utils'

const selectOptions = [
  { value: 'VISA', label: 'Visa' },
  { value: 'MASTERCARD', label: 'MasterCard' },
  { value: 'DISCOVER', label: 'Discover' },
  { value: 'AMERICAN_EXPRESS', label: 'American Express' }
]

export const NewCardView = ({ onClose }) => {
  const classes = useNewCardViewStyles()
  const [saveNewCard] = useMutation(SaveNewCard, {
    awaitRefetchQueries: true,
    refetchQueries: ['GetWallet']
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
      saveNewCard({ variables }).then(() => onClose(false))
    },
    [saveNewCard, onClose]
  )

  return (
    <IonContent color="dark">
      <Formik onSubmit={onSubmit} initialValues={initialNewCard} validationSchema={NewCardSchema} validateOnMount>
        {({ values, handleBlur, handleChange, handleSubmit, isValid, isSubmitting }) => (
          <Form className={classes.container}>
            <Card className={classes.card} type={values.cardType} />
            <Input
              name="cardName"
              placeholder="Card Name"
              value={values.cardName}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <Select
              name="cardDueDate"
              label="Due Date"
              value={values.cardDueDate}
              options={daysInMonth}
              onChange={handleChange}
            />

            <Select
              name="cardType"
              label="Card Type"
              className={classes.select}
              value={values.cardType}
              options={selectOptions}
              onChange={handleChange}
            />

            <Fab onClick={handleSubmit} loading={isSubmitting} disabled={!isValid} />
          </Form>
        )}
      </Formik>
    </IonContent>
  )
}

NewCardView.propTypes = {
  onClose: PropTypes.func
}
