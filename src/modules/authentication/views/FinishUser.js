import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonText, IonContent, IonModal } from '@ionic/react'
import { Formik } from 'formik'

import { useFinishUserProfileStyles } from '../util'
import { Button, Input, MaskedInput } from 'elements'
import { currenyFormat } from 'utils'
import { UserProfileSchema, useUpdateUser } from 'modules/user'

const initialValues = {
  allowance: 0,
  dueDate: ''
}

export const FinishUserModal = ({ isOpen }) => {
  const classes = useFinishUserProfileStyles()
  const [updateUser, { loading: saving }] = useUpdateUser()
  const onSubmit = useCallback(
    values => updateUser(values),
    [updateUser]
  )

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
            {({ handleSubmit, values, handleChange, handleBlur, isValid }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Input
                  type="number"
                  min={1}
                  max={31}
                  name="dueDate"
                  placeholder="Due Date"
                  value={values.dueDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <MaskedInput
                  type="tel"
                  name="allowance"
                  placeholder="Bi-Weekly Budget"
                  format={currenyFormat}
                  value={values.allowance}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Button type="submit" className={classes.button} loading={saving} disabled={!isValid || saving}>
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonModal>
  )
}

FinishUserModal.propTypes = {
  isOpen: PropTypes.bool
}
