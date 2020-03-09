import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonText, IonContent, IonModal } from '@ionic/react'
import { useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { Formik } from 'formik'
import set from 'lodash/fp/set'

import { Button, Input } from 'elements'
import { UserProfileSchema, UpdateUser } from 'modules/user'

const useUserViewStyles = createUseStyles(theme => ({
  container: {
    textAlign: 'center',
    height: '100%',
    padding: theme.spacing(0, 4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    marginBottom: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))

const initialValues = {
  allowance: '',
  dueDate: ''
}

export const UpdateUserModal = ({ isOpen, finishProfile }) => {
  const classes = useUserViewStyles()
  const [updateProfile, { loading }] = useMutation(UpdateUser)
  const onSubmit = useCallback(
    values => updateProfile(set('variables.input')(values)({})).then(({ data }) => finishProfile(data.saveUser)),
    [updateProfile, finishProfile]
  )

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonContent color="dark">
        <div className={classes.container}>
          <IonText className={classes.header}>
            <h4>Finish Profile</h4>
          </IonText>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={UserProfileSchema}
            validateOnMount
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
                <Input
                  type="number"
                  name="allowance"
                  placeholder="Bi-Weekly Budget"
                  value={values.allowance}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Button type="submit" className={classes.button} loading={loading} disabled={!isValid || loading}>
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

UpdateUserModal.propTypes = {
  isOpen: PropTypes.bool,
  finishProfile: PropTypes.func
}
