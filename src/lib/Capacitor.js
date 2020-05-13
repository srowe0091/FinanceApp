import { Plugins } from '@capacitor/core'
import includes from 'lodash/fp/includes'

import routes from 'routes'

const { App } = Plugins

const _closeAppRoutes = [routes.home, routes.login]

App.addListener('backButton', () => {
  if (includes(window.location.pathname)(_closeAppRoutes)) {
    App.exitApp()
  }
})

