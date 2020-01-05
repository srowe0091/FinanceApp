import React from 'react'
import { IonMenu, IonContent, IonList, IonItem } from '@ionic/react'

import { PAGE_ID } from 'utils'

export const DrawerMenu = () => (
  <IonMenu contentId={PAGE_ID}>
    <IonContent>
      <IonList>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
)
