import React from 'react'
import { IonIcon, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { homeSharp, walletSharp, shieldHalfSharp, notificationsSharp, personSharp } from 'ionicons/icons'

// User views
import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'
import WalletView from 'modules/wallet/views/WalletView'
import BillsView from 'modules/bills/views/BillsView'
import NewTransactionView from 'modules/transaction/views/NewTransactionView'
// Admin views
import AdminView from 'modules/admin/views/Admin'

import { NavFab } from './NavFab'
import { AuthorizedRoute } from 'components'

import routes from 'routes'
import { useUser, useAuthentication } from 'modules/authentication'

export const Navigation = () => {
  const { pathname } = useLocation()
  const { isAdmin } = useUser()
  const { isAuthenticated } = useAuthentication()

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <AuthorizedRoute path={routes.home} component={HomeView} />
          <AuthorizedRoute path={routes.wallet} component={WalletView} />
          <AuthorizedRoute path={routes.bills} component={BillsView} />
          <AuthorizedRoute path={routes.newTransaction} component={NewTransactionView} />
          {/* admin views */}
          <AuthorizedRoute path={routes.admin.index} component={AdminView} admin />
          <Route path={routes.login} component={LoginView} />
          <Redirect exact from="/" to={routes.login} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab={routes.home} href={routes.home}>
            <IonIcon icon={homeSharp} />
          </IonTabButton>

          <IonTabButton tab={routes.wallet} href={routes.wallet}>
            <IonIcon icon={walletSharp} />
          </IonTabButton>

          <IonTabButton disabled />

          {isAdmin ? (
            <IonTabButton tab={routes.admin.index} href={routes.admin.payTransaction}>
              <IonIcon icon={shieldHalfSharp} />
            </IonTabButton>
          ) : (
            <IonTabButton tab={routes.wallet} href={routes.wallet}>
              <IonIcon icon={personSharp} />
            </IonTabButton>
          )}

          <IonTabButton disabled>
            <IonIcon icon={notificationsSharp} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      <NavFab {...(pathname !== routes.newTransaction && { routerLink: routes.newTransaction })} />
    </>
  )
}
