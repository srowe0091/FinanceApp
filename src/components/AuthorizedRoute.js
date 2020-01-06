import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import { useAuthentication } from 'modules/authentication'
import { PAGE_ID } from 'utils'

export const AuthorizedRoute = ({ path, component }) => {
  const { isAuthenticated } = useAuthentication()

  if (!isAuthenticated) {
    return <Redirect to={routes.login} />
  }

  return (
    <Route path={path}>
      {props => (
        <IonPage id={PAGE_ID}>
          {createElement(component, props)}
        </IonPage>
      )}
    </Route>
  )
}

AuthorizedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.elementType
}
