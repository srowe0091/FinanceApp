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

import Home from 'modules/authentication/views/LoginView'

const token = "8glroz4NbRaH3QKch0RQMBXnkrDWrqVbeqzMaBUFbrhbRYf6cd2I31FBpya25FI9Rve4GTLY27ruFES4d3Im8N3lGeR/UCR+RFffGKVOiiZiTeR6oKkwkdGJTvBRwJNWKCNYN6af0X2AEqnDDEQm1r/uF68wIuQXDTrpnvADg0o="

const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: token
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
              <Route path={routes.login} component={Home} />
              <Redirect exact from="/" to={routes.login} />
            </IonRouterOutlet>
          </IonReactRouter>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  </IonApp>
)

export default App
