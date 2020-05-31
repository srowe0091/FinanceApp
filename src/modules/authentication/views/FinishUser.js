import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonText, IonContent, IonModal } from '@ionic/react'
import { Formik, Form } from 'formik'

import { useFinishUserProfileStyles } from '../util'
import { Button, MaskedInput } from 'elements'
import { currenyFormat } from 'utils'
import { UserProfileSchema, useUpdateUser } from 'modules/user'

const initialValues = {
  income: 0,
  allowance: 0
}

export const FinishUserModal = ({ isOpen, closeModal }) => {
  const classes = useFinishUserProfileStyles()
  const [updateUser, { loading: saving }] = useUpdateUser()
  const onSubmit = useCallback(values => updateUser(values).then(() => closeModal(false)), [updateUser, closeModal])

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonContent color="dark">
        <div className={classes.container}>
          <IonText className={classes.header}>
            <h4>Finish Profile</h4>
          </IonText>
          <Formik
            validateOnMount
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={UserProfileSchema}
          >
            {({ values, isValid, handleChange, handleBlur }) => (
              <Form autoComplete="off">
                <MaskedInput
                  type="tel"
                  name="income"
                  label="Monthly Income"
                  format={currenyFormat}
                  value={values.income}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <MaskedInput
                  type="tel"
                  name="allowance"
                  label="Bi-Weekly Budget"
                  format={currenyFormat}
                  value={values.allowance}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Button type="submit" className={classes.button} loading={saving} disabled={!isValid || saving}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonModal>
  )
}

FinishUserModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func
}
