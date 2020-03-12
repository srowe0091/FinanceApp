import { Plugins } from '@capacitor/core'
import isEqual from 'lodash/fp/isEqual'
import isEmpty from 'lodash/fp/isEmpty'

import routes from 'routes'

const { App, LocalNotifications } = Plugins

App.addListener('backButton', () => {
  if (isEqual(routes.home)(window.location.pathname)) {
    App.exitApp()
  } else {
    window.history.back()
  }
})

export const ScheduleNotification = async () => {
  LocalNotifications.schedule({
    notifications: [
      {
        title: "Title",
        body: "Body",
        id: 1,
        schedule: {
          count: 1,
          repeats: false,
          on: {
            minute: 40
          }
        },
        sound: null,
        attachments: null,
        actionTypeId: "",
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