import React, { useState, useCallback, useRef, useMemo } from 'react'
import { IonSlides, IonSlide, IonButtons, IonIcon, IonItem, IonButton } from '@ionic/react'
import { ellipsisVertical } from 'ionicons/icons'
import { useToggle } from 'react-use'
import map from 'lodash/fp/map'

import { NewCardView } from './NewCardView'
import { useWalletStyles } from '../util'
import { useWallet } from '../hooks'
import { Card, Modal, Popover } from 'components'
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
  const [addCardModal, toggleAddCard] = useToggle(false)
  const [popoverEvent, setShowPopover] = useState(null)
  const key = useMemo(() => hash(JSON.stringify(cards)), [cards])

  const openPopover = useCallback(e => setShowPopover(e.nativeEvent), [])
  const closePopover = useCallback(() => setShowPopover(null), [])

  const [updateUser] = useUpdateUser()

  const setCardAsDefault = useCallback(async () => {
    const index = await ref?.current?.getActiveIndex()
    updateUser({ defaultCard: cards[index].id })
  }, [ref, cards, updateUser])

  return (
    <PageContainer
      toolbarChildren={
        <IonButtons slot="end">
          <IonButton onClick={openPopover}>
            <IonIcon className={classes.icons} icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
      }
    >
      <div className={classes.container}>
        <IonSlides key={key} ref={ref} options={slideOpts}>
          {!loading && cards.length === 0 && (
            <div className={classes.emptyWallet}>
              <h6 align="center">No Cards added</h6>
            </div>
          )}
          {map(card => (
            <IonSlide key={card.id}>
              <Card isDefault={defaultCard === card.id} {...card} />
            </IonSlide>
          ))(cards)}
        </IonSlides>
      </div>

      <Modal isOpen={addCardModal} onClose={toggleAddCard}>
        <NewCardView />
      </Modal>

      <Popover event={popoverEvent} onClose={closePopover}>
        <IonItem onClick={toggleAddCard}>Add New Card</IonItem>
        <IonItem onClick={setCardAsDefault} disabled={!cards.length}>
          Set Default Card
        </IonItem>
      </Popover>
    </PageContainer>
  )
}

export default Wallet
