import React from 'react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'react-jss'

import routes from 'routes'
import { AuthProvider } from 'modules/authentication/context'

import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'
import AdminView from 'modules/admin/views/AdminView'
import ProfileView from 'modules/profile/views/ProfileView'
import NewTransactionView from 'modules/transaction/views/NewTransactionView'

import { AuthorizedRoute } from 'components'
import { DrawerMenu } from 'modules/drawer'
import theme from './styles/theme'

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
        <ThemeProvider theme={theme}>
          <IonReactRouter>
            <DrawerMenu />
            <IonRouterOutlet>
              <AuthorizedRoute path={routes.home} component={HomeView} />
              <AuthorizedRoute path={routes.admin} component={AdminView} />
              <AuthorizedRoute path={routes.profile} component={ProfileView} />
              <AuthorizedRoute path={routes.newTransaction} component={NewTransactionView} />
              <Route path={routes.login} component={LoginView} />
              <Redirect exact from="/" to={routes.login} />
            </IonRouterOutlet>
          </IonReactRouter>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </IonApp>
)

export default App
