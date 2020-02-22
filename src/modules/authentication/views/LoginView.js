import React, { useCallback, useState } from 'react'
import { IonPage, IonContent, IonText } from '@ionic/react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'

import { useAuthentication } from 'modules/authentication/hooks'
import { Logo } from 'components'
import { Input, Button } from 'elements'
import { useStyles } from './defaults'
import routes from 'routes'
import { textMappings } from 'utils'

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Address').required(),
  password: yup.string().min(5).required(),
})

const initialValues = {
  email: '',
  password: ''
}

const LoginView = ({ history }) => {
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const { handleLogin, isAuthenticated } = useAuthentication()

  const submitHandler = useCallback(({ email, password }) => {
    setStatus(null)
    return handleLogin(email, password)
      .then(() => history.replace(routes.home))
      .catch(err => setStatus(textMappings[err.status] || err.message))
  }, [handleLogin, history])

  if (isAuthenticated) {
    return <Redirect to={routes.home} />
  }
  
  return (
    <IonPage>
      <IonContent fullscreen className={classes.wrapper}>
        <div className={classes.form}>
          <Logo className={classes.logo} />
          <Formik onSubmit={submitHandler} validationSchema={LoginSchema} initialValues={initialValues} validateOnMount>
            {({ handleSubmit, handleChange, handleBlur, errors, isSubmitting, isValid }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  name="email"
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
                  <p align="center" variant="subtitle2" className={classes.errorStatus}>{status}</p>
                </IonText>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  className={classes.button}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  )
}

LoginView.propTypes = {
  history: PropTypes.object.isRequired
}

export default LoginView
