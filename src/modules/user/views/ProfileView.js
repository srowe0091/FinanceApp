import React, { useState, useCallback, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { IonAlert, IonItemDivider, IonItem, IonLabel, IonText, IonToggle } from '@ionic/react'

import { useUser, useAuthentication } from 'modules/authentication'
import { ProfileIcon, Button } from 'components'
import { PageContainer } from 'template'
import routes from 'routes'
import { SlideInLeft } from 'animation'

export const useProfileViewStyles = createUseStyles(theme => ({
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& ion-text': {
      marginTop: theme.spacing(1)
    }
  },
  logout: {
    marginTop: 'auto',
    marginBottom: theme.spacing(2),
    alignSelf: 'center'
  },
  divider: {
    marginTop: theme.spacing(3)
  }
}))

const Profile = () => {
  const classes = useProfileViewStyles()
  const user = useUser()
  const { handleLogout } = useAuthentication()
  const [setDefaultAlert, updateLogoutConfirmation] = useState(false)

  const openLogoutConfirmation = useCallback(() => updateLogoutConfirmation(true), [])
  const closeLogoutConfirmation = useCallback(() => updateLogoutConfirmation(false), [])

  const alertButtons = useMemo(
    () => [
      { text: 'No', role: 'cancel' },
      { text: 'Yes', handler: handleLogout }
    ],
    [handleLogout]
  )

  return (
    <PageContainer className={classes.container}>
      <div className={classes.header}>
        <ProfileIcon size="large" />
        <IonText variant="h4">
          {user.firstName} {user.lastName?.charAt(0)}.
        </IonText>
        <IonText>{user.email}</IonText>
      </div>

      <IonItemDivider color="transparent" className={classes.divider}>
        <IonLabel>Your Information</IonLabel>
      </IonItemDivider>

      <IonItem button detail routerLink={routes.updateAccount} routerAnimation={SlideInLeft}>
        <IonLabel>Account</IonLabel>
      </IonItem>

      <IonItemDivider color="transparent" className={classes.divider}>
        <IonLabel>Preferences</IonLabel>
      </IonItemDivider>

      {/* <IonItem button detail routerLink={routes.notifications} routerAnimation={SlideInLeft}>
        <IonLabel>Notifications</IonLabel>
      </IonItem> */}

      <IonItem lines="full">
        <IonLabel>Dark Mode</IonLabel>
        <IonToggle slot="end"></IonToggle>
      </IonItem>

      <Button fill="clear" className={classes.logout} onClick={openLogoutConfirmation}>
        Sign out
      </Button>

      <IonAlert
        isOpen={setDefaultAlert}
        onDidDismiss={closeLogoutConfirmation}
        message="Are you sure you want sign out?"
        buttons={alertButtons}
      />
    </PageContainer>
  )
}

export default Profile
