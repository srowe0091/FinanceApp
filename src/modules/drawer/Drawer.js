import React, { useCallback } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'

import {
  homeOutline,
  peopleOutline,
  personCircleOutline,
  logOutOutline,
  walletOutline,
  cardOutline
} from 'ionicons/icons'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useUser, useAuthentication } from 'modules/authentication'

const useDrawerMenuStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  user: {
    height: '150px',
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  userIcon: {
    fontSize: '48px'
  },
  icon: {
    marginRight: theme.spacing(3)
  },
  logout: {
    marginTop: 'auto',
    marginBottom: theme.spacing(1)
  },
  adminSection: {
    marginTop: theme.spacing(1),
    '& h6': {
      paddingLeft: theme.spacing(2),
      margin: theme.spacing(1, 0)
    }
  }
}))

const userLinks = [
  {
    icon: homeOutline,
    label: 'Home',
    route: routes.home
  },
  {
    icon: walletOutline,
    label: 'Wallet',
    route: routes.wallet
  }
]

const adminLinks = [
  {
    icon: cardOutline,
    label: 'Pay',
    route: routes.admin.payTransaction
  },
  {
    // TODO: add condition if user is not in a group
    icon: peopleOutline,
    label: 'Group',
    route: routes.admin.group
  }
]

export const DrawerMenu = () => {
  const classes = useDrawerMenuStyles()
  const location = useLocation()
  const { isAdmin, email } = useUser()
  const { handleLogout, isAuthenticated } = useAuthentication()
  const closeDrawer = useCallback(() => menuController.close(), [])

  const renderItem = useCallback(
    link => (
      <IonItem
        key={link.label}
        detail
        lines="none"
        color={location.pathname === link.route ? 'primary' : 'transparent'}
        onClick={closeDrawer}
        className={classes.item}
        {...(location.pathname !== link.route && { routerLink: link.route })}
      >
        <IonIcon slot="start" className={classes.icon} icon={link.icon} />
        <IonLabel>{link.label}</IonLabel>
      </IonItem>
    ),
    [classes, location, closeDrawer]
  )

  if (!isAuthenticated) {
    return null
  }

  return (
    <IonMenu contentId={PAGE_ID}>
      <IonContent color="md-background">
        <div className={classes.container}>
          <div className={classes.user}>
            <IonIcon className={classes.userIcon} icon={personCircleOutline} />
            {email}
          </div>
          {userLinks.map(renderItem)}

          {isAdmin && (
            <div className={classes.adminSection}>
              <h6>Admin</h6>
              {adminLinks.map(renderItem)}
            </div>
          )}

          <IonItem button lines="none" color="transparent" onClick={handleLogout} className={classes.logout}>
            <IonIcon slot="start" className={classes.icon} icon={logOutOutline} />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonMenu>
  )
}
