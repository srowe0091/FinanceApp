import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import { useAuthentication, useUser } from 'modules/authentication'
import { PAGE_ID } from 'utils'

export const AuthorizedRoute = ({ path, admin, component }) => {
  const { isAuthenticated } = useAuthentication()
  const { role } = useUser()

  if (!isAuthenticated) {
    return <Redirect to={routes.login} />
  }

  if (admin && role !== 'ADMIN') {
    return <Redirect to={routes.home} />
  }

  return <Route path={path}>{props => <IonPage id={PAGE_ID}>{createElement(component, props)}</IonPage>}</Route>
}

AuthorizedRoute.propTypes = {
  path: PropTypes.string,
  admin: PropTypes.bool,
  component: PropTypes.elementType
}
