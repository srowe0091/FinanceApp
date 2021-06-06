import { App } from '@capacitor/app'
import { Storage } from '@capacitor/storage'
import includes from 'lodash/fp/includes'

import routes from 'routes'

const _closeAppRoutes = [routes.home, routes.login]

App.addListener('backButton', () => {
  if (includes(window.location.pathname)(_closeAppRoutes)) {
    App.exitApp()
  }
})

export const StorageContainer = {
  get: async key => await Storage.get({ key }),
  set: async (key, value) => await Storage.set({ key, value }),
  remove: async key => await Storage.remove({ key }),
  clear: async () => await Storage.clear()
}
