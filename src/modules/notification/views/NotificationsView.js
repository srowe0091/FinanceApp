import React, { useState } from 'react'
import { IonItemDivider, IonLabel, useIonViewDidEnter, IonItem, IonToggle } from '@ionic/react'
import { LocalNotifications } from '@capacitor/local-notifications'

import { PageContainer } from 'template'
import { Header, Padding } from 'components'

const LocalNotificationsWrapper = () => {
  const [hasPermission, setHasPermission] = useState('denied')
  const ensurePermissions = async () => {
    try {
      let { display } = await LocalNotifications.checkPermissions()
      console.log('LocalNotifications display permission:', display)

      if (display === 'prompt') {
        display = await LocalNotifications.requestPermissions()
      }

      if (display !== 'granted') {
        throw new Error('User denied permissions!')
      }

      return display
    } catch (e) {
      console.log('permissions error')
      console.error(e)

      return 'denied'
    }
  }

  const scheduleBasic = async () => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Reminder',
          body: '"Credit Card name" is due tomorrow',
          id: 1
        }
      ]
    })
  }

  useIonViewDidEnter(async () => {
    const permissions = await ensurePermissions()
    setHasPermission(permissions)
  })

  return (
    <PageContainer>
      <Padding>
        <Header goBack label="Notifications" />
      </Padding>

      <IonItemDivider>
        <IonLabel>Reminders</IonLabel>
      </IonItemDivider>

      <IonItem lines="full">
        <IonLabel>Credit Card Due Dates</IonLabel>
        <IonToggle slot="end"></IonToggle>
      </IonItem>

      <IonItem lines="full">
        <IonLabel>Bill Payments</IonLabel>
        <IonToggle slot="end"></IonToggle>
      </IonItem>
    </PageContainer>
  )
}

export default LocalNotificationsWrapper
