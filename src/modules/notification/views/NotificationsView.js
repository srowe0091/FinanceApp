import React, { useCallback } from 'react'
import { IonItemDivider, IonLabel, IonItem, IonToggle } from '@ionic/react'
import { useToggle } from 'react-use'
import { LocalNotifications } from '@capacitor/local-notifications'

import { PageContainer } from 'template'
import { Header, Padding } from 'components'
import { createNotifications } from 'lib/Capacitor'
import { useWallet } from 'modules/wallet'

const LocalNotificationsWrapper = () => {
  const { cards } = useWallet()

  const [blockCreditCards, toggleBlockingCreditCards] = useToggle()

  const scheduleCreditCardNotifications = useCallback(
    async event => {
      toggleBlockingCreditCards()
      if (event.target.checked) {
        const notificationCards = cards.map(card => {
          return {
            id: card.dueDate,
            title: `${card.name} Payment Due Today - ${card.dueDate}`,
            schedule: {
              every: 'minute'
            }
          }
        })

        return await createNotifications(notificationCards)
      } else {
        const cardIds = cards.map(card => ({ id: card.dueDate }))
        await LocalNotifications.cancel({ notifications: cardIds })
      }

      toggleBlockingCreditCards()
    },
    [toggleBlockingCreditCards, cards]
  )

  return (
    <PageContainer>
      <Padding>
        <Header goBack label="Notifications" />
      </Padding>

      <IonItemDivider>
        <IonLabel>Reminders</IonLabel>
      </IonItemDivider>

      <IonItem lines="full" disabled={blockCreditCards}>
        <IonLabel>Credit Card Due Dates</IonLabel>
        <IonToggle slot="end" onIonChange={scheduleCreditCardNotifications}></IonToggle>
      </IonItem>

      <IonItem lines="full">
        <IonLabel>Bill Payments</IonLabel>
        <IonToggle slot="end"></IonToggle>
      </IonItem>
    </PageContainer>
  )
}

export default LocalNotificationsWrapper
