import React, { useMemo, useCallback } from 'react'
import { IonIcon, IonContent, IonButtons, IonButton, IonText } from '@ionic/react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'
import { Formik } from 'formik'
import useToggle from 'react-use/lib/useToggle'
import get from 'lodash/fp/get'
import set from 'lodash/fp/set'
import pick from 'lodash/fp/pick'

import { personCircle } from 'ionicons/icons'

import { Button, Input } from 'elements'
import { Toolbar, FullPageLoader } from 'components'
import { useUser } from 'modules/authentication'
import { GetUser, UpdateUser } from '../user.gql'

const useUserViewStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    flex: 1,
    margin: theme.spacing(0, 2, 2),
    position: 'relative'
  },
  top: {
    height: '70px',
    background: 'var(--themeGray1)'
  },
  userInfo: {
    marginTop: '-15%',
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userIcon: {
    fontSize: '112px',
    marginBottom: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: 'var(--themeGray1)'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  edit: {
    marginRight: theme.spacing(1)
  }
}))

const ProfileView = () => {
  const classes = useUserViewStyles()
  const { email } = useUser()
  const { data, loading } = useQuery(GetUser)
  const [updateUser, { loading: saving }] = useMutation(UpdateUser)
  const initialValues = useMemo(() => pick(['allowance', 'dueDate'])(get('me')(data)), [data])
  const [editState, toggleEditState] = useToggle(false)
  const onSubmit = useCallback(values => {
    updateUser(set('variables.input')(values)({}))
      .finally(() => toggleEditState())
  }, [updateUser, toggleEditState])

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <Toolbar color="medium" title="Profile">
        {!editState && (
          <IonButtons className={classes.edit} slot="primary">
            <IonButton color="primary" onClick={toggleEditState}>Edit</IonButton>
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
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values, handleChange, handleBlur, isValid }) => (
              <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                <Input type="number" min={1} max={31} name="dueDate" placeholder="Due Date" disabled={!editState} value={values.dueDate} onBlur={handleBlur} onChange={handleChange} />
                <Input type="number" name="allowance" placeholder="Bi-Weekly Allowance" disabled={!editState} value={values.allowance} onBlur={handleBlur} onChange={handleChange} />
                {editState && (
                  <div className={classes.buttons}>
                    <Button fill="outline" color="light" className={classes.button} disabled={saving} onClick={toggleEditState}>Cancel</Button>
                    <Button type="submit" className={classes.button} disabled={saving || !isValid} loading={saving}>Submit</Button>
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