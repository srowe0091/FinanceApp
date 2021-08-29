import React from 'react'
import { IonIcon, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react'
import { Route } from 'react-router-dom'
import { homeSharp, walletSharp, personSharp /*, documentsSharp */ } from 'ionicons/icons'

// User views
import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'
import WalletView from 'modules/wallet/views/WalletView'
import NewCardView from 'modules/wallet/views/NewCardView'
// import BillsView from 'modules/bills/views/BillsView'
import NewTransactionView from 'modules/transaction/views/NewTransactionView'
import ProfileView from 'modules/user/views/ProfileView'

import { PageRoute } from './PageRoute'

import routes from 'routes'
import { useAuthentication } from 'modules/authentication'

export const Navigation = () => {
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
        {/* <PageRoute path={routes.bills} component={BillsView} /> */}
        <PageRoute path={routes.profile} component={ProfileView} />
        <PageRoute path={routes.newCard} component={NewCardView} />
        <PageRoute path={routes.newTransaction} component={NewTransactionView} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab={routes.home} href={routes.home}>
          <IonIcon icon={homeSharp} />
        </IonTabButton>

        <IonTabButton tab={routes.wallet} href={routes.wallet}>
          <IonIcon icon={walletSharp} />
        </IonTabButton>

        {/* <IonTabButton tab={routes.bills} href={routes.bills}>
          <IonIcon icon={documentsSharp} />
        </IonTabButton> */}

        <IonTabButton tab={routes.profile} href={routes.profile}>
          <IonIcon icon={personSharp} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
