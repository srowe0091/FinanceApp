import React, { useCallback, useState, useEffect } from 'react'
import { IonPage, IonContent, IonText } from '@ionic/react'
import { Formik, Form } from 'formik'
import { useToggle } from 'react-use'

import { useLoginViewStyle, LoginSchema } from '../util'
import { FinishUserModal } from './FinishUser'
import { Input, Button, Logo } from 'components'
import { textMappings } from 'utils'
import { useAuthentication } from 'modules/authentication'

const initialValues = {
  email: '',
  password: ''
}

const LoginView = () => {
  const classes = useLoginViewStyle()
  const [status, setStatus] = useState(null)
  const [showModal, toggleModal] = useToggle(false)
  const { handleLogin, requireProfileUpdate } = useAuthentication()

  const submitHandler = useCallback(
    ({ email, password }) => {
      setStatus(null)
      return handleLogin(email, password).catch(err => setStatus(textMappings[err.status] || err.message))
    },
    [handleLogin]
  )

  useEffect(() => {
    if (requireProfileUpdate) {
      toggleModal(true)
    }
  }, [requireProfileUpdate, toggleModal])

  return (
    <IonPage>
      <IonContent fullscreen className={classes.container}>
        <div className={classes.form}>
          <Logo className={classes.logo} />
          <Formik validateOnMount onSubmit={submitHandler} validationSchema={LoginSchema} initialValues={initialValues}>
            {({ handleChange, handleBlur, errors, isSubmitting, isValid }) => (
              <Form>
                <Input
                  autoFocus
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                />

                <IonText color="danger">
                  <p align="center" variant="subtitle2" className={classes.errorStatus}>
                    {status}
                  </p>
                </IonText>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  className={classes.button}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <FinishUserModal isOpen={showModal} closeModal={toggleModal} />
      </IonContent>
    </IonPage>
  )
}

export default LoginView
