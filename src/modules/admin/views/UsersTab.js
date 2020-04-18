import React from 'react'
import { IonContent, IonCard, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react'
import { pin } from 'ionicons/icons'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'

import { UsersInGroup } from '../admin.gql'
import { FullPageLoader } from 'components'

const Users = () => {
  const { data, loading } = useQuery(UsersInGroup)

  if (loading) {
    return (
      <FullPageLoader />
    )
  }

  console.log(data)

  return (
    <IonContent color="dark">
      {map(d => (
        <IonCard key={d.id}>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
          </IonCardContent>
        </IonCard>
      ))(data?.admin?.usersInGroup)}
    </IonContent>
  )
}

export default Users
