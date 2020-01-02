import React from 'react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import routes from 'routes'
import { AuthProvider } from 'modules/authentication/context'

import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'

import { AuthorizedRoute } from 'components'

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: localStorage.getItem('session')
      }
    })
  }
})

const App = () => (
  <IonApp>
    <ApolloProvider client={client}>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <AuthorizedRoute path={routes.home} component={HomeView} />
            <Route path={routes.login} component={LoginView} />
            <Redirect exact from="/" to={routes.login} />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </ApolloProvider>
  </IonApp>
)

export default App
