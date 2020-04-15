import React, { useMemo, useCallback } from 'react'
import { IonIcon, IonContent, IonButtons, IonButton, IonText } from '@ionic/react'
import { Formik } from 'formik'
import useToggle from 'react-use/lib/useToggle'
import pick from 'lodash/fp/pick'

import { personCircle } from 'ionicons/icons'

import { UserProfileSchema, useUpdateUser, useUserViewStyles } from '../util'
import { Button, Input, MaskedInput } from 'elements'
import { Toolbar } from 'components'
import { currenyFormat } from 'utils'
import { useUser } from 'modules/authentication'

const ProfileView = () => {
  const classes = useUserViewStyles()
  const { email, ...userProps } = useUser()
  const [updateProfile, { loading: saving }] = useUpdateUser()
  const initialValues = useMemo(() => pick(['allowance', 'dueDate'])(userProps), [userProps])
  const [editState, toggleEditState] = useToggle(false)
  const onSubmit = useCallback(
    values => updateProfile(values).finally(() => toggleEditState()),
    [updateProfile, toggleEditState]
  )
  const onReset = useCallback(() => toggleEditState(), [toggleEditState])

  return (
    <>
      <Toolbar color="medium" title="Profile">
        {!editState && (
          <IonButtons className={classes.edit} slot="primary">
            <IonButton color="primary" onClick={toggleEditState}>
              Edit
            </IonButton>
          </IonButtons>
        )}
      </Toolbar>
      <IonContent color="dark">
        <div className={classes.container}>
          <div className={classes.top} />
          <div className={classes.userInfo}>
            <IonIcon className={classes.userIcon} icon={personCircle} />
            <IonText>{email}</IonText>
          </div>
          <Formik
            onReset={onReset}
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={UserProfileSchema}
            validateOnMount
          >
            {({ handleSubmit, handleReset, values, handleChange, handleBlur, isValid }) => (
              <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                <Input
                  type="number"
                  min={1}
                  max={31}
                  name="dueDate"
                  placeholder="Due Date"
                  disabled={!editState}
                  value={values.dueDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <MaskedInput
                  autoFocus
                  type="tel"
                  name="allowance"
                  placeholder="Bi-Weekly Budget"
                  disabled={!editState}
                  format={currenyFormat}
                  value={values.allowance}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
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
      </IonContent>
    </>
  )
}

export default ProfileView
