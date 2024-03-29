import React, { useCallback, useState } from 'react'
import { IonPage, IonContent, IonText } from '@ionic/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useLoginViewStyle, LoginSchema } from '../util'
import { Input, Button, Logo, FieldController } from 'components'
import { textMappings } from 'utils'
import { useAuthentication } from 'modules/authentication'

const LoginView = () => {
  const classes = useLoginViewStyle()
  const [status, setStatus] = useState(null)
  const { handleLogin } = useAuthentication()

  const form = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submitHandler = useCallback(
    ({ email, password }) => {
      setStatus(null)
      return handleLogin(email, password).catch(err => setStatus(textMappings[err.status] || err.message))
    },
    [handleLogin]
  )

  const {
    formState: { isSubmitting }
  } = form

  return (
    <IonPage>
      <IonContent fullscreen className={classes.container}>
        <div className={classes.form}>
          <Logo className={classes.logo} />
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FieldController autoFocus name="email" type="email" placeholder="Email Address" component={Input} />

              <FieldController name="password" type="password" placeholder="Password" component={Input} />

              <IonText color="danger">
                <p align="center" variant="subtitle2" className={classes.errorStatus}>
                  {status}
                </p>
              </IonText>

              <Button type="submit" loading={isSubmitting} className={classes.button}>
                Sign In
              </Button>
            </form>
          </FormProvider>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LoginView
