import React from 'react'
import { IonItem } from '@ionic/react'
import map from 'lodash/fp/map'

import { useWalletStyles } from '../util'
import { useWallet } from '../hooks'
import routes from 'routes'
import { Fab, Card } from 'components'
import { PageContainer } from 'template'
import { SlideInLeft } from 'animation'

const Wallet = () => {
  const classes = useWalletStyles()
  const { cards, defaultCard, loading } = useWallet()

  return (
    <PageContainer className={classes.container}>
      {!loading && cards.length === 0 && (
        <div className={classes.emptyWallet}>
          <h6 align="center">No Cards added</h6>
        </div>
      )}
      {map(card => (
        <IonItem
          key={card.id}
          // detail
          lines="none"
          color="transparent"
          routerAnimation={SlideInLeft}
          // routerLink={routes.cardView(card.id)}
        >
          <Card isDefault={defaultCard === card.id} {...card} />
        </IonItem>
      ))(cards)}

      <Fab routerLink={routes.newCard} />
    </PageContainer>
  )
}

export default Wallet
