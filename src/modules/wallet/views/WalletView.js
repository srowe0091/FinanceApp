import React, { useCallback, useRef, useMemo } from 'react'
import { IonAlert, IonSlides, IonSlide } from '@ionic/react'
import { useToggle, useLongPress } from 'react-use'
import map from 'lodash/fp/map'

import { useWalletStyles } from '../util'
import { useWallet } from '../hooks'
import routes from 'routes'
import { Fab, Card } from 'components'
import { PageContainer } from 'template'
import { hash } from 'utils'
import { useUpdateUser } from 'modules/user'

const slideOpts = {
  slidesPerView: 1.1,
  initialSlide: 0,
  spaceBetween: 20,
  centeredSlides: true
}

const Wallet = () => {
  const classes = useWalletStyles()
  const ref = useRef()
  const { cards, defaultCard, loading } = useWallet()
  const [setDefaultAlert, toggleDefaultAlert] = useToggle(false)
  const key = useMemo(() => hash(JSON.stringify(cards)), [cards])

  const openPopover = useCallback(() => toggleDefaultAlert(true), [toggleDefaultAlert])
  const closePopover = useCallback(() => toggleDefaultAlert(false), [toggleDefaultAlert])

  const [updateUser] = useUpdateUser()

  const setCardAsDefault = useCallback(async () => {
    const index = await ref?.current?.getActiveIndex()
    updateUser({ defaultCard: cards[index].id })
  }, [ref, cards, updateUser])

  const longPressEvent = useLongPress(openPopover, { delay: 500 })

  const alertButtons = useMemo(
    () => [
      { text: 'No', role: 'cancel' },
      { text: 'Yes', handler: setCardAsDefault }
    ],
    [setCardAsDefault]
  )

  return (
    <PageContainer className={classes.container}>
      <IonSlides key={key} ref={ref} options={slideOpts} onIonSlideDrag={longPressEvent.onTouchEnd}>
        {!loading && cards.length === 0 && (
          <div className={classes.emptyWallet}>
            <h6 align="center">No Cards added</h6>
          </div>
        )}
        {map(card => (
          <IonSlide key={card.id}>
            <div {...(defaultCard !== card.id && longPressEvent)}>
              <Card isDefault={defaultCard === card.id} {...card} />
            </div>
          </IonSlide>
        ))(cards)}
      </IonSlides>

      <Fab routerLink={routes.newCard} />

      <IonAlert
        isOpen={setDefaultAlert}
        onDidDismiss={closePopover}
        message="Set Card as Default?"
        buttons={alertButtons}
      />
    </PageContainer>
  )
}

export default Wallet
