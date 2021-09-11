import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonItemDivider, IonLabel } from '@ionic/react'
import { Redirect } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useFinishUserProfileStyles } from '../util'
import { Header, Button, Input, MaskedInput, FieldController, Modal, ConditionalWrapper } from 'components'
import { currenyFormat } from 'utils'
import routes from 'routes'
import { UserProfileSchema, useUpdateUser } from 'modules/user'
import { PageContainer } from 'template'

const UpdateAccount = ({ history }) => {
  const classes = useFinishUserProfileStyles()
  const [updateUser, { loading: saving }] = useUpdateUser()

  const form = useForm({
    resolver: yupResolver(UserProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      income: 0,
      allowance: 0
    }
  })

  const onSubmit = useCallback(
    values => updateUser(values).then(() => history.replace(routes.home)),
    [history, updateUser]
  )

  if (!history.location.state?.updateAccount) {
    return <Redirect to={routes.home} />
  }

  return (
    <ConditionalWrapper condition={true} wrapper={Modal} isOpen disableClose>
      <PageContainer>
        <div className={classes.container}>
          <Header label="Complete Your Account" />
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
    </ConditionalWrapper>
  )
}

UpdateAccount.propTypes = {
  history: PropTypes.object
}

export default UpdateAccount
