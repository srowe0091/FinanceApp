import React, { useCallback } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'

import { home, person, settings} from 'ionicons/icons'

import routes from 'routes'
import { PAGE_ID } from 'utils'

const drawerLinks = [
  {
    icon: home,
    label: 'Home',
    route: routes.home
  },
  {
    icon: person,
    label: 'Profile',
    route: routes.profile
  },
  {
    icon: settings,
    label: 'Admin',
    route: routes.admin
  }
]

const useDrawerMenuStyles = createUseStyles(theme => ({
  icon: {
    marginRight: theme.spacing(3)
  }
}))

export const DrawerMenu = () => {
  const classes = useDrawerMenuStyles()

  const closeDrawer = useCallback(() => menuController.close(), [])

  return (
    <IonMenu contentId={PAGE_ID}>
      <IonContent>
        <IonList lines="full">
          {drawerLinks.map(r => (
            <IonItem key={r.label} routerLink={r.route} onClick={closeDrawer}>
              <IonLabel>{r.label}</IonLabel>
              <IonIcon slot="start" className={classes.icon} icon={r.icon}>{r.label}</IonIcon>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}
