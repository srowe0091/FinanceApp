import React from 'react'
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'react-jss'

import './lib/Capacitor'
import { client } from './lib/Apollo'
import theme from './styles/theme'
import { ToastNotification } from 'modules/notification'
import { AuthProvider } from 'modules/authentication'
import { Navigation } from 'modules/navigation'

const App = () => (
  <IonApp>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ToastNotification />
          <IonReactRouter>
            <Navigation />
          </IonReactRouter>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  </IonApp>
)

export default App
