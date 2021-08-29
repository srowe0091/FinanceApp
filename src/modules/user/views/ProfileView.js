import React from 'react'
import { createUseStyles } from 'react-jss'
import { IonText /*, IonItemDivider, IonLabel */ } from '@ionic/react'

import { useUser } from 'modules/authentication'
import { PageContainer } from 'template'
import { ProfileIcon } from 'components'

export const useProfileViewStyles = createUseStyles(theme => ({
  header: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& ion-text': {
      marginTop: theme.spacing(1)
    }
  }
}))

const Profile = () => {
  const classes = useProfileViewStyles()
  const user = useUser()
  return (
    <PageContainer>
      <div className={classes.header}>
        <ProfileIcon size="large" />
        <IonText variant="h4">
          {user.firstName} {user.lastName?.charAt(0)}.
        </IonText>
        <IonText>{user.email}</IonText>
      </div>

      {/* <IonItemDivider className={classes.divider}>
        <IonLabel>Financial Information</IonLabel>
      </IonItemDivider> */}
    </PageContainer>
  )
}

export default Profile
