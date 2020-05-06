import React, { useMemo, useCallback } from 'react'
import { IonContent, IonButtons, IonButton, IonSlides, IonSlide, IonModal } from '@ionic/react'
import { Formik } from 'formik'
import useToggle from 'react-use/lib/useToggle'
import map from 'lodash/fp/map'
import pick from 'lodash/fp/pick'

import { NewCardView } from './NewCardView'
import { useGetWallet, useWalletStyles } from '../util'
import { Fab, Button, MaskedInput } from 'elements'
import { Toolbar, Card } from 'components'
import { currenyFormat } from 'utils'
import { UserProfileSchema, useUpdateUser } from 'modules/user'
import { useUser } from 'modules/authentication'

const slideOpts = {
  slidesPerView: 1.3,
  initialSlide: 0,
  spaceBetween: 20,
  centeredSlides: true
}

const ProfileView = () => {
  const classes = useWalletStyles()
  const { isAdmin, ...userProps } = useUser()
  const [updateProfile, { loading: saving }] = useUpdateUser()
  const { data, loading } = useGetWallet()
  const initialValues = useMemo(() => pick(['allowance'])(userProps), [userProps])
  const [editState, toggleEditState] = useToggle(false)
  const [addCardModal, toggleAddCard] = useToggle(false)
  const onSubmit = useCallback(
    values => {
      const _values = {
        allowance: values.allowance,
        dueDate: values.dueDate,
        cards: [
          {
            name: values.cardName,
            dueDate: values.cardDueDate,
            type: values.cardType
          }
        ]
      }
      console.log(_values)
      toggleAddCard(false)
      // updateProfile(_values).finally(() => toggleEditState())
    },
    [updateProfile, toggleEditState, toggleAddCard]
  )
  const onReset = useCallback(() => toggleEditState(), [toggleEditState])

  if (loading) {
    return null
  }

  return (
    <>
      <Toolbar title="Wallet">
        {isAdmin && !editState && (
          <IonButtons className={classes.edit} slot="primary">
            <IonButton onClick={toggleEditState}>Edit</IonButton>
          </IonButtons>
        )}
      </Toolbar>

      <IonContent fullscreen color="background">
        <div className={classes.container}>
          <Formik
            onReset={onReset}
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={UserProfileSchema}
            validateOnMount
          >
            {({ handleSubmit, handleReset, values, handleChange, handleBlur, isValid }) => (
              <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                <MaskedInput
                  type="tel"
                  name="allowance"
                  placeholder="Bi-Weekly Budget"
                  disabled={!editState}
                  format={currenyFormat}
                  value={values.allowance}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <div className={classes.cardContainer}>
                  <IonSlides options={slideOpts}>
                    {map(card => (
                      <IonSlide key={card._id}>
                        <Card {...card} />
                      </IonSlide>
                    ))(data?.cards)}
                  </IonSlides>
                </div>

                {editState && (
                  <div className={classes.buttons}>
                    <Button fill="outline" color="light" disabled={saving} onClick={handleReset}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving || !isValid} loading={saving}>
                      Submit
                    </Button>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>

        <IonModal isOpen={addCardModal}>
          <NewCardView />
        </IonModal>

        <Fab onClick={toggleAddCard} />
      </IonContent>
    </>
  )
}

export default ProfileView
