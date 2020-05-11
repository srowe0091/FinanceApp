import React, { useState, useCallback, useRef, useMemo } from 'react'
import { IonSlides, IonSlide, IonButtons, IonIcon, IonItem, IonButton } from '@ionic/react'
import { ellipsisVertical } from 'ionicons/icons'
import useToggle from 'react-use/lib/useToggle'
import map from 'lodash/fp/map'
import set from 'lodash/fp/set'

import { NewCardView } from './NewCardView'
import { useWalletStyles } from '../util'
import { useWallet } from '../hooks'
import { Card, Modal, Popover } from 'components'
import { ToolbarContent } from 'template'
import { hash } from 'utils'
import { useUpdatePreferences } from 'modules/preferences'

const slideOpts = {
  slidesPerView: 1.2,
  initialSlide: 0,
  spaceBetween: 20,
  centeredSlides: true
}

const Wallet = () => {
  const classes = useWalletStyles()
  const ref = useRef()
  const { cards, defaultCard } = useWallet()
  const [addCardModal, toggleAddCard] = useToggle(false)
  const [popoverEvent, setShowPopover] = useState(null)
  const key = useMemo(() => hash(JSON.stringify(cards)), [cards])

  const openPopover = useCallback(e => setShowPopover(e.nativeEvent), [])
  const closePopover = useCallback(() => setShowPopover({}), [])

  const [udpatePreferences] = useUpdatePreferences()

  const setCardAsDefault = useCallback(async () => {
    const index = await ref?.current?.getActiveIndex()
    udpatePreferences(set('variables.input.defaultCard')(cards[index]._id)({}))
  }, [ref, cards, udpatePreferences])

  return (
    <ToolbarContent
      title="Wallet"
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
          {map(card => (
            <IonSlide key={card._id}>
              <Card {...card} isDefault={defaultCard === card._id} />
            </IonSlide>
          ))(cards)}
        </IonSlides>
      </div>

      <Modal isOpen={addCardModal} onClose={toggleAddCard}>
        <NewCardView />
      </Modal>

      <Popover event={popoverEvent} onClose={closePopover}>
        <IonItem onClick={toggleAddCard}>Add New Card</IonItem>
        <IonItem onClick={setCardAsDefault}>Set Default Card</IonItem>
      </Popover>
    </ToolbarContent>
  )
}

export default Wallet
