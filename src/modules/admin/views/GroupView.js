import React, { useMemo } from 'react'
import { IonCard, IonCardTitle, IonItem, IonIcon, IonText } from '@ionic/react'
import { personCircle } from 'ionicons/icons'
import map from 'lodash/fp/map'
import sortBy from 'lodash/fp/sortBy'
import update from 'lodash/fp/update'
import compose from 'lodash/fp/compose'
import stubArray from 'lodash/fp/stubArray'

import { useGroupStyles } from '../util'
import { UsersInGroup } from '../admin.gql'
import { useQuery } from 'hooks'
import { PageContainer } from 'template'
import { currency, calculateDays } from 'utils'

const GroupUsers = props => {
  const classes = useGroupStyles()
  const { data = stubArray, loading } = useQuery(UsersInGroup, { path: 'admin.usersInGroup' })
  const parsedUsers = useMemo(() => compose(map(update('cards')(sortBy('name'))))(data), [data])

  return (
    <PageContainer loading={loading} {...props}>
      <div className={classes.container}>
        {map(d => (
          <IonCard key={d.id} className={classes.card}>
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
                {currency(d.allowance)}
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
        ))(parsedUsers)}
      </div>
    </PageContainer>
  )
}

export default GroupUsers
