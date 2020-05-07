import React from 'react'
import { IonSlides, IonSlide, IonModal } from '@ionic/react'
import useToggle from 'react-use/lib/useToggle'
import map from 'lodash/fp/map'

import { NewCardView } from './NewCardView'
import { useGetWallet, useWalletStyles } from '../util'
import { Fab } from 'elements'
import { Card } from 'components'
import { ToolbarContent } from 'template'

const slideOpts = {
  slidesPerView: 1.3,
  initialSlide: 0,
  spaceBetween: 20,
  centeredSlides: true
}

const ProfileView = () => {
  const classes = useWalletStyles()
  const { data, loading } = useGetWallet()
  const [addCardModal, toggleAddCard] = useToggle(false)

  if (loading) {
    return null
  }

  return (
    <ToolbarContent title="Wallet">
      <div className={classes.container}>
        <IonSlides options={slideOpts}>
          {map(card => (
            <IonSlide key={card._id}>
              <Card {...card} />
            </IonSlide>
          ))(data?.cards)}
        </IonSlides>
      </div>

      <IonModal isOpen={addCardModal}>
        <NewCardView />
      </IonModal>

      <Fab onClick={toggleAddCard} />
    </ToolbarContent>
  )
}

export default ProfileView
