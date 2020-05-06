import { Plugins } from '@capacitor/core'
import isEmpty from 'lodash/fp/isEmpty'
import includes from 'lodash/fp/includes'

import routes from 'routes'

const { App, LocalNotifications } = Plugins

const _closeAppRoutes = [routes.home, routes.login]

App.addListener('backButton', () => {
  if (includes(window.location.pathname)(_closeAppRoutes)) {
    App.exitApp()
  }
})

export const ScheduleNotification = async () => {
  LocalNotifications.schedule({
    notifications: [
      {
        title: 'Title',
        body: 'Body',
        id: 1,
        schedule: {
          // repeats: true,
          // every: 'two-weeks',
          on: {
            day: 14
          }
        },
        actionTypeId: '',
        extra: null
      }
    ]
  })
  const data = await LocalNotifications.getPending()
  console.log(data)
}

export const GetPendingNotificiations = async () => {
  const data = await LocalNotifications.getPending()
  return data && data.notifications
}

export const ClearNotifications = async () => {
  const data = await LocalNotifications.getPending()
  if (!isEmpty(data.notifications)) {
    console.log(data)
    await LocalNotifications.cancel(data)
  }
  return null
}
