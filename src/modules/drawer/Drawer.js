import React, { useCallback, useMemo } from 'react'
import { menuController } from '@ionic/core'
import { IonMenu, IonContent, IonItem, IonLabel, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { useLocation } from "react-router-dom"
import has from 'lodash/fp/has'
import filter from 'lodash/fp/filter'

import { home, person, settings, personCircle, logOutOutline } from 'ionicons/icons'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useUser, useAuthentication } from 'modules/authentication'

const useDrawerMenuStyles = createUseStyles(theme => ({
  user: {
    height: '150px',
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    background: 'var(--themeGray1)'
  },
  userIcon: {
    fontSize: '48px'
  },
  icon: {
    marginRight: theme.spacing(3)
  }
}))

export const DrawerMenu = () => {
  const classes = useDrawerMenuStyles()
  const location = useLocation()
  const { role, email } = useUser()
  const { handleLogout, isAuthenticated } = useAuthentication()
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
        route: routes.profile,
        condition: false
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

  if (!isAuthenticated) {
    return null
  }

  return (
    <IonMenu contentId={PAGE_ID}>
      <IonContent className={classes.drawer} color="dark">
        <div className={classes.user}>
          <IonIcon className={classes.userIcon} icon={personCircle} />
          {email}
        </div>
        {drawerLinks.map(r => (
          <IonItem
            key={r.label}
            detail
            lines="none"
            color={location.pathname === r.route ? "tertiary" : "dark"}
            onClick={closeDrawer}
            className={classes.item}
            {...(location.pathname !== r.route) && { routerLink: r.route }}
          >
            <IonIcon slot="start" className={classes.icon} icon={r.icon} />
            <IonLabel>{r.label}</IonLabel>
          </IonItem>
        ))}
        <IonItem button lines="none" color="dark" onClick={handleLogout}>
          <IonIcon slot="start" className={classes.icon} icon={logOutOutline} />
          <IonLabel>Logout</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
  )
}
