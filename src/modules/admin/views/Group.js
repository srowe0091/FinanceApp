import React from 'react'
import { IonCard, IonCardTitle, IonItem, IonIcon, IonButton, IonText } from '@ionic/react'
import { pencil, personCircle } from 'ionicons/icons'
import { useQuery } from '@apollo/react-hooks'
import map from 'lodash/fp/map'

import { useGroupStyles } from '../util'
import { UsersInGroup } from '../admin.gql'
import { ToolbarContent } from 'template'
import { currency, determineDays } from 'utils'

const Users = () => {
  const classes = useGroupStyles()
  const { data, loading } = useQuery(UsersInGroup)

  console.log(data)

  return (
    <ToolbarContent title="Group" loading={loading}>
      <div className={classes.container}>
        {map(d => (
          <IonCard key={d._id} color="medium" className={classes.card}>
            <IonItem color="transparent" lines="none">
              <IonIcon size="large" slot="start" icon={personCircle} className={classes.icon} />
              <IonCardTitle>{d.email}</IonCardTitle>
              <IonButton color="light" fill="clear" slot="end">
                <IonIcon slot="icon-only" icon={pencil} />
              </IonButton>
            </IonItem>

            <IonItem color="transparent" lines="none">
              <p variant="body2">
                <IonText color="primary" variant="caption">
                  Allowance:
                </IonText>
                {' '}
                {currency(d.allowance)}
              </p>
            </IonItem>

            {d.cards && (
              <IonItem color="transparent" lines="none">
                <div className={classes.userCardsContainer}>
                  {map(card => (
                    <span key={card._id} className={classes.userCards}>
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
                        {determineDays(d.dueDate)}
                      </p>
                    </span>
                  ))(d.cards)}
                </div>
              </IonItem>
            )}
          </IonCard>
        ))(data?.admin?.usersInGroup)}
      </div>
    </ToolbarContent>
  )
}

export default Users
