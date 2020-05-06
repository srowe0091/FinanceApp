import React, { useCallback } from 'react'
import { Formik, Form } from 'formik'
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react'

import { NewCardSchema, initialNewCard } from '../util'
import { Button, Input } from 'elements'

export const NewCardView = () => {
  const onSubmit = useCallback(values => {
    //   const _values = {
    //     allowance: values.allowance,
    //     dueDate: values.dueDate,
    //     cards: [
    //       {
    //         name: values.cardName,
    //         dueDate: values.cardDueDate,
    //         type: values.cardType
    //       }
    //     ]
    //   }
    //   console.log(_values)
    //   toggleAddCard(false)
    //   updateProfile(_values).finally(() => toggleEditState())
  }, [])

  return (
    <IonContent color="dark">
      <Formik onSubmit={onSubmit} initialValues={initialNewCard} validationSchema={NewCardSchema} validateOnMount>
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <Form>
            <Input
              name="cardName"
              placeholder="Card Name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Input
              type="number"
              max={31}
              name="cardDueDate"
              placeholder="Due Date"
              value={values.cardDueDate}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <IonItem>
              <IonLabel>Card type</IonLabel>
              <IonSelect name="cardType" value={values.cardType} interface="popover" onIonChange={handleChange}>
                <IonSelectOption value="VISA">Visa</IonSelectOption>
                <IonSelectOption value="DISCOVER">Discover</IonSelectOption>
                <IonSelectOption value="MASTERCARD">MasterCard</IonSelectOption>
                <IonSelectOption value="AMERICAN_EXPRESS">American Express</IonSelectOption>
              </IonSelect>
            </IonItem>
            <Button onClick={handleSubmit}>Save</Button>
          </Form>
        )}
      </Formik>
    </IonContent>
  )
}
