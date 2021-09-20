import React, { useCallback } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'

import { people, card, documents } from 'ionicons/icons'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useUser, useAuthentication } from 'modules/authentication'

const useDrawerMenuStyles = createUseStyles(theme => ({
  icon: {
    marginRight: theme.spacing(3)
  }
}))

const adminLinks = [
  {
    icon: card,
    label: 'Pay',
    route: routes.admin.payTransaction
  },
  {
    icon: documents,
    label: 'Bills',
    route: routes.admin.bills
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
  const { isAdmin } = useUser()
  const { isAuthenticated } = useAuthentication()
  const closeDrawer = useCallback(() => menuController.close(), [])

  const renderItem = useCallback(
    link => (
      <IonItem
        detail
        key={link.label}
        lines="none"
        onClick={closeDrawer}
        {...(location.pathname !== link.route && { routerLink: link.route })}
      >
        <IonIcon slot="start" className={classes.icon} icon={link.icon} />
        <IonLabel>{link.label}</IonLabel>
      </IonItem>
    ),
    [classes, location, closeDrawer]
  )

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <IonMenu contentId={PAGE_ID} maxEdgeStart={75}>
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Admin Panel</IonTitle>
          </IonToolbar>
        </IonHeader>

        {adminLinks.map(renderItem)}
      </IonContent>
    </IonMenu>
  )
}
