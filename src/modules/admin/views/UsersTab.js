import React from 'react'
import { IonContent, IonCard, IonCardTitle, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react'
import { pencil, personCircle } from 'ionicons/icons'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'

import { useUsersTabStyles } from '../util'
import { UsersInGroup } from '../admin.gql'
import { RelativeLoader } from 'components'
import { currency, determineDays } from 'utils'

const Users = () => {
  const classes = useUsersTabStyles()
  const { data, loading } = useQuery(UsersInGroup)

  if (loading) {
    return <RelativeLoader />
  }

  return (
    <IonContent fullscreen color="background">
      <div className={classes.wrapper}>
        {map(d => (
          <IonCard key={d.id} color="medium" className={classes.card}>
            <IonItem color="transparent" lines="none">
              <IonIcon size="large" slot="start" icon={personCircle} className={classes.icon} />
              <IonCardTitle>{d.email}</IonCardTitle>
              <IonButton color="light" fill="clear" slot="end">
                <IonIcon slot="icon-only" icon={pencil} />
              </IonButton>
            </IonItem>

            <IonItem color="transparent" lines="none">
              <IonLabel color="light">
                <p variant="body2">
                  {d.allowance && d.dueDate ? (
                    <>
                      Allowance: {currency(d.allowance)}
                      <br />
                      Next Payment: {determineDays(d.dueDate)}
                    </>
                  ) : (
                    "Profile hasn't been completed"
                  )}
                </p>
              </IonLabel>
            </IonItem>
          </IonCard>
        ))(data?.admin?.usersInGroup)}
      </div>
    </IonContent>
  )
}

export default Users
