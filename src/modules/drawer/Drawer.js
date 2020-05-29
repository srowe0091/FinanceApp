import React, { useCallback } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'

import { home, people, personCircle, logOut, wallet, card, documents } from 'ionicons/icons'

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
  }
}))

const userLinks = [
  {
    icon: home,
    label: 'Home',
    route: routes.home
  },
  {
    icon: wallet,
    label: 'Wallet',
    route: routes.wallet
  },
  {
    icon: documents,
    label: 'Bills',
    route: routes.bills
  }
]

const adminLinks = [
  {
    icon: card,
    label: 'Pay',
    route: routes.admin.payTransaction
  },
  {
    // TODO: add condition if user is not in a group
    icon: people,
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
            <IonIcon className={classes.userIcon} icon={personCircle} />
            {email}
          </div>

          {userLinks.map(renderItem)}
          {isAdmin && adminLinks.map(renderItem)}

          <IonItem button lines="none" color="transparent" onClick={handleLogout} className={classes.logout}>
            <IonIcon slot="start" className={classes.icon} icon={logOut} />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonMenu>
  )
}
