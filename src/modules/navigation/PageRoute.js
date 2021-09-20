import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { IonPage } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import { PAGE_ID } from 'utils'
import { useUser } from 'modules/authentication'

export const PageRoute = ({ admin, component, ...props }) => {
  const { isAdmin } = useUser()

  if (admin && !isAdmin) {
    return <Redirect to={routes.home} />
  }

  return <Route {...props}>{_props => <IonPage id={PAGE_ID}>{createElement(component, _props)}</IonPage>}</Route>
}

PageRoute.propTypes = {
  admin: PropTypes.bool,
  component: PropTypes.elementType
}
