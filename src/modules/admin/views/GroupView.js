import React from 'react'
import { IonCard, IonCardTitle, IonItem, IonIcon, IonText } from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import { useQuery } from '@apollo/client'
import map from 'lodash/fp/map'

import { useGroupStyles } from '../util'
import { UsersInGroup } from '../admin.gql'
import { ToolbarContent } from 'template'
import { currency, calculateDays } from 'utils'

const Users = () => {
  const classes = useGroupStyles()
  const { data, loading } = useQuery(UsersInGroup)

  return (
    <ToolbarContent title="Group" loading={loading}>
      {map(d => (
        <IonCard key={d.id} color="medium" className={classes.card}>
          <IonItem color="transparent" lines="none">
            <IonIcon size="large" slot="start" icon={personCircle} className={classes.icon} />
            <IonCardTitle>{d.email}</IonCardTitle>
            {/* <IonButton color="light" fill="clear" slot="end">
              <IonIcon slot="icon-only" icon={pencil} />
            </IonButton> */}
          </IonItem>

          <IonItem color="transparent" lines="none">
            <p variant="body2">
              <IonText color="primary" variant="caption">
                Allowance:
              </IonText>
              &nbsp;
              {currency(d.preferences?.allowance)}
            </p>
          </IonItem>

          {d.cards && (
            <IonItem color="transparent" lines="none">
              <div className={classes.userCardsContainer}>
                {map(card => (
                  <span key={card.id} className={classes.userCards}>
                    <p display="inline">
                      <IonText color="primary" variant="caption">
                        Card Name:
                      </IonText>
                      <br />
                      {card.name}
                    </p>
                    <p display="inline">
                      <IonText color="primary" variant="caption">
                        Next Payment:
                      </IonText>
                      <br />
                      {calculateDays(card.dueDate).text}
                    </p>
                  </span>
                ))(d.cards)}
              </div>
            </IonItem>
          )}
        </IonCard>
      ))(data?.admin?.usersInGroup)}
    </ToolbarContent>
  )
}

export default Users
