import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import { useUser } from 'modules/authentication'

export const PageRoute = ({ path, admin, component }) => {
  const { isAdmin } = useUser()

  if (admin && !isAdmin) {
    return <Redirect to={routes.home} />
  }

  return <Route path={path}>{props => <IonPage>{createElement(component, props)}</IonPage>}</Route>
}

PageRoute.propTypes = {
  path: PropTypes.string,
  admin: PropTypes.bool,
  component: PropTypes.elementType
}
