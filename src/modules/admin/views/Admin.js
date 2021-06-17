import React from 'react'
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import { Redirect } from 'react-router-dom'

import { AuthorizedRoute } from 'components'
import routes from 'routes'

import PayTransactionView from './PayTransactionsView'
import GroupView from './GroupView'

const Admin = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <AuthorizedRoute path={routes.admin.payTransaction} component={PayTransactionView} />
        <AuthorizedRoute path={routes.admin.group} component={GroupView} />

        <Redirect exact from={routes.admin.index} to={routes.admin.payTransaction} />
      </IonRouterOutlet>

      <IonTabBar slot="top">
        <IonTabButton tab={routes.admin.payTransaction} href={routes.admin.payTransaction}>
          <IonLabel>Pay Transactions</IonLabel>
        </IonTabButton>

        <IonTabButton tab={routes.admin.group} href={routes.admin.group}>
          <IonLabel>Group</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Admin
