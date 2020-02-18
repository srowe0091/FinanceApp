import React, { useCallback, useMemo } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import has from 'lodash/fp/has'
import filter from 'lodash/fp/filter'

import { home, person, settings} from 'ionicons/icons'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useUser } from 'modules/authentication'

const useDrawerMenuStyles = createUseStyles(theme => ({
  icon: {
    marginRight: theme.spacing(3)
  }
}))

export const DrawerMenu = () => {
  const classes = useDrawerMenuStyles()
  const { role } = useUser()
  const closeDrawer = useCallback(() => menuController.close(), [])
  const drawerLinks = useMemo(() => {
    const links = [
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
        route: routes.admin,
        condition: role === 'ADMIN'
      }
    ]
    return filter(link => has('condition')(link) ? link.condition : true)(links)
  }, [role])



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
