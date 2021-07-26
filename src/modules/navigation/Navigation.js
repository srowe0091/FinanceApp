import React from 'react'
import { IonIcon, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react'
import { Route } from 'react-router-dom'
import { homeSharp, walletSharp, notificationsSharp, personSharp, settingsSharp } from 'ionicons/icons'

// User views
import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'
import WalletView from 'modules/wallet/views/WalletView'
import BillsView from 'modules/bills/views/BillsView'
import NewTransactionView from 'modules/transaction/views/NewTransactionView'
// Admin views
import AdminView from 'modules/admin/views/Admin'

import { PageRoute } from './PageRoute'

import routes from 'routes'
import { useUser, useAuthentication } from 'modules/authentication'

export const Navigation = () => {
  const { isAdmin } = useUser()
  const { isAuthenticated } = useAuthentication()

  if (!isAuthenticated) {
    return <Route component={LoginView} />
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* main view */}
        <PageRoute path={routes.home} component={HomeView} />
        <PageRoute path={routes.wallet} component={WalletView} />
        <PageRoute path={routes.bills} component={BillsView} />
        <PageRoute exact path={routes.newTransaction} component={NewTransactionView} />
        {/* admin view */}
        <PageRoute admin path={routes.admin.index} component={AdminView} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab={routes.home} href={routes.home}>
          <IonIcon icon={homeSharp} />
        </IonTabButton>

        <IonTabButton tab={routes.wallet} href={routes.wallet}>
          <IonIcon icon={walletSharp} />
        </IonTabButton>

        {isAdmin ? (
          <IonTabButton tab={routes.admin.index} href={routes.admin.index}>
            <IonIcon icon={settingsSharp} />
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
  )
}
