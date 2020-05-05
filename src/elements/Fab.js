import React from 'react'
import PropTypes from 'prop-types'
import { IonFab, IonFabButton, IonIcon, IonText } from '@ionic/react'

import { add } from 'ionicons/icons'

export const Fab = ({ icon = add, text, ...props }) => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton {...props}>{text ? <IonText>{text}</IonText> : <IonIcon icon={icon} />}</IonFabButton>
    </IonFab>
  )
}

Fab.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string
}
