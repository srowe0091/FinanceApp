import React, { useCallback, useState } from 'react'
import { IonPage, IonContent } from '@ionic/react'
import PropTypes from 'prop-types'
import useForm from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import PersonIcon from '@material-ui/icons/Person'
import KeyIcon from '@material-ui/icons/VpnKey'

import { useAuthentication } from 'modules/authentication/hooks'
import { Logo } from 'components'
import { Input, Button } from 'elements'
import { useStyles } from './defaults'
import routes from 'routes'
import textMappings from 'util/textMappings'

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Address').required(),
  password: yup.string().min(5).required(),
})

const LoginView = ({ history }) => {
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onChange',
    validationSchema: LoginSchema
  })
  const { handleLogin, isAuthenticated } = useAuthentication()

  const submitHandler = useCallback(({ email, password }) => {
    setStatus(null)
    return handleLogin(email, password)
      // .then(() => history.replace(routes.home))
      .catch(err => setStatus(textMappings[err.status] || err.message))
  }, [handleLogin, history])

  // if (isAuthenticated) {
  //   return <Redirect to={routes.home} />
  // }
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box className={classes.wrapper} mb={4}>
          <Logo className={classes.logo} />
          <form onSubmit={handleSubmit(submitHandler)} autoComplete="off">
            <Input
              inputRef={register}
              name="email"
              placeholder="Email Address"
              icon={PersonIcon}
              errors={errors.email}
            />
            <Box mb={1} />
            <Input
              inputRef={register}
              type="password"
              name="password"
              placeholder="Password"
              icon={KeyIcon}
              errors={errors.password}
            />

            <Typography align="center" variant="subtitle2" color="error" className={classes.errorStatus}>{status}</Typography>

            <Box className={classes.actionButton}>
              <Button
                type="submit"
                loading={formState.isSubmitting}
                disabled={!formState.isValid || formState.isSubmitting}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </IonContent>
    </IonPage>
  )
}

LoginView.propTypes = {
  history: PropTypes.object.isRequired
}

export default LoginView
