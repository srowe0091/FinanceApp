import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { IonText, IonContent, IonModal } from '@ionic/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useFinishUserProfileStyles } from '../util'
import { Button, MaskedInput, FieldController } from 'components'
import { currenyFormat } from 'utils'
import routes from 'routes'
import { UserProfileSchema, useUpdateUser } from 'modules/user'

export const FinishUserModal = ({ isOpen, closeModal }) => {
  const classes = useFinishUserProfileStyles()
  const history = useHistory()
  const [updateUser, { loading: saving }] = useUpdateUser()

  const form = useForm({
    resolver: yupResolver(UserProfileSchema),
    defaultValues: {
      income: 0,
      allowance: 0
    }
  })

  const onSubmit = useCallback(
    values => {
      updateUser(values).then(() => {
        closeModal(false)
        history.go(routes.home)
      })
    },
    [closeModal, history, updateUser]
  )

  const {
    formState: { isSubmitting }
  } = form

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonContent>
        <div className={classes.container}>
          <IonText className={classes.header}>
            <h4>Finish Profile</h4>
          </IonText>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              <FieldController
                type="tel"
                name="income"
                label="Monthly Income"
                format={currenyFormat}
                component={MaskedInput}
              />

              <FieldController
                type="tel"
                name="allowance"
                label="Bi-Weekly Budget"
                format={currenyFormat}
                component={MaskedInput}
              />

              <Button type="submit" className={classes.button} loading={saving || isSubmitting}>
                Save
              </Button>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonModal>
  )
}

FinishUserModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func
}
