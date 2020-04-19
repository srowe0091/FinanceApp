import React from 'react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'react-jss'

import theme from './styles/theme'
import routes from 'routes'
import { AuthorizedRoute } from 'components'
import { DrawerMenu } from 'modules/drawer'
import { ToastNotification } from 'modules/notification'
import { AuthProvider } from 'modules/authentication/context'

import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'
import AdminView from 'modules/admin/views/AdminView'
import UserView from 'modules/user/views/UserView'
import NewTransactionView from 'modules/transaction/views/NewTransactionView'
import LabView from 'modules/lab/views/LabView'

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
            <ToastNotification />
            <DrawerMenu />
            <IonRouterOutlet>
              <AuthorizedRoute path={routes.home} component={HomeView} />
              <AuthorizedRoute path={routes.admin} component={AdminView} admin />
              <AuthorizedRoute path={routes.profile} component={UserView} />
              <AuthorizedRoute path={routes.newTransaction} component={NewTransactionView} />
              <AuthorizedRoute path={routes.lab} component={LabView} />
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
