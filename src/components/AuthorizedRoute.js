import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthentication } from 'modules/authentication/hooks'
import routes from 'routes'

const Menu = () => (
  <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
)

export const AuthorizedRoute = ({ path, component }) => {
  const { isAuthenticated } = useAuthentication()

  if (!isAuthenticated) {
    return <Redirect to={routes.login} />
  }

  return (
    <Route path={path}>
      {props => (
        <>
          <Menu />
          <IonPage id="main">
            {createElement(component, props)}
          </IonPage>
        </>
      )}
    </Route>
  )
}

AuthorizedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.elementType
}
