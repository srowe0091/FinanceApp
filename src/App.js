import React from 'react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import routes from 'routes'
import { muiTheme } from 'lib/material-ui'
import { AuthProvider } from 'modules/authentication/context'

import LoginView from 'modules/authentication/views/LoginView'
import HomeView from 'modules/home/views/HomeView'

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  request: (operation) => {
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
      <ThemeProvider theme={muiTheme}>
        <AuthProvider>
          <CssBaseline />
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path={routes.home} component={HomeView} />
              <Route path={routes.login} component={LoginView} />
              <Redirect exact from="/" to={routes.login} />
            </IonRouterOutlet>
          </IonReactRouter>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </IonApp>
)

export default App
