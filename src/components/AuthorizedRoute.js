import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useAuthentication, useUser } from 'modules/authentication'

export const AuthorizedRoute = ({ path, admin, component }) => {
  const { isAuthenticated } = useAuthentication()
  const { isAdmin } = useUser()

  if (!isAuthenticated) {
    return <Redirect to={routes.login} />
  }

  if (admin && !isAdmin) {
    return <Redirect to={routes.home} />
  }

  return <Route path={path}>{props => <IonPage id={PAGE_ID}>{createElement(component, props)}</IonPage>}</Route>
}

AuthorizedRoute.propTypes = {
  path: PropTypes.string,
  admin: PropTypes.bool,
  component: PropTypes.elementType
}
