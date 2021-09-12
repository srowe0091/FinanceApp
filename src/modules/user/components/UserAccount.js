import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonItemDivider, IonLabel } from '@ionic/react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useFinishUserProfileStyles } from '../util'
import { Header, Button, Input, MaskedInput, FieldController } from 'components'
import { UserProfileSchema, useUpdateUser } from 'modules/user'
import routes from 'routes'
import { currenyFormat } from 'utils'
import { PageContainer } from 'template'

const _defaultValues = {
  firstName: '',
  lastName: '',
  income: 0,
  allowance: 0
}

export const UserAccount = ({ history, header, disableGoBack, defaultValues = _defaultValues }) => {
  const classes = useFinishUserProfileStyles()
  const [updateUser, { loading: saving }] = useUpdateUser()

  const form = useForm({
    resolver: yupResolver(UserProfileSchema),
    defaultValues
  })

  const onSubmit = useCallback(
    values => updateUser(values).then(() => history.replace(routes.home)),
    [history, updateUser]
  )

  return (
    <PageContainer>
      <div className={classes.container}>
        <Header goBack={!disableGoBack} label={header} />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <IonItemDivider className={classes.divider}>
              <IonLabel>Your Information</IonLabel>
            </IonItemDivider>

            <FieldController name="firstName" placeholder="First Name" component={Input} />

            <FieldController name="lastName" placeholder="Last Name" component={Input} />

            <IonItemDivider className={classes.divider}>
              <IonLabel>Financial Information</IonLabel>
            </IonItemDivider>

            <FieldController
              type="tel"
              name="income"
              inlineLabel="Monthly Income"
              labelWidth={0.6}
              format={currenyFormat}
              component={MaskedInput}
            />

            <FieldController
              type="tel"
              name="allowance"
              inlineLabel="Bi-Weekly Budget"
              labelWidth={0.6}
              format={currenyFormat}
              component={MaskedInput}
            />

            <Button type="submit" loading={saving}>
              Save
            </Button>
          </form>
        </FormProvider>
      </div>
    </PageContainer>
  )
}

UserAccount.propTypes = {
  history: PropTypes.object,
  header: PropTypes.string,
  disableGoBack: PropTypes.bool,
  defaultValues: PropTypes.object
}
