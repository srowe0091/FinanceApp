import React from 'react'
import PropTypes from 'prop-types'
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from '@ionic/react'
import { Redirect } from 'react-router-dom'

import { PageRoute } from 'modules/navigation'
import routes from 'routes'

import PayTransactionView from './PayTransactionsView'
import GroupView from './GroupView'

const Admin = ({ location }) => {
  if (location.pathname === routes.admin.index) {
    return <Redirect to={routes.admin.payTransaction} />
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <PageRoute path={routes.admin.payTransaction} component={PayTransactionView} />
        <PageRoute path={routes.admin.group} component={GroupView} />
      </IonRouterOutlet>

      <IonTabBar slot="top">
        <IonTabButton tab={routes.admin.payTransaction} href={routes.admin.payTransaction}>
          <IonLabel>PAY TRANSACTIONS</IonLabel>
        </IonTabButton>

        <IonTabButton tab={routes.admin.group} href={routes.admin.group}>
          <IonLabel>GROUP</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

Admin.propTypes = {
  location: PropTypes.object
}

export default Admin
