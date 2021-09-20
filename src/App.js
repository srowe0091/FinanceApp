import React from 'react'
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'react-jss'

import './lib/Capacitor/App'
import { client } from './lib/Apollo'
import theme from './styles/theme'
import { DrawerMenu } from 'modules/admin/views/DrawerMenu'
import { ToastNotification } from 'modules/notification'
import { AuthProvider } from 'modules/authentication'
import { Navigation } from 'modules/navigation'

const App = () => (
  <IonApp>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <IonReactRouter>
          <AuthProvider>
            <ToastNotification />
            <DrawerMenu />
            <Navigation />
          </AuthProvider>
        </IonReactRouter>
      </ApolloProvider>
    </ThemeProvider>
  </IonApp>
)

export default App
