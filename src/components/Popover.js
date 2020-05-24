import React from 'react'
import PropTypes from 'prop-types'
import { popoverController } from '@ionic/core'
import { IonPopover } from '@ionic/react'

export const Popover = ({ event, onClose, children }) => {
  return (
    <IonPopover
      showBackdrop={false}
      event={event}
      isOpen={!!event}
      onWillDismiss={onClose}
    >
      <div onClick={popoverController.dismiss}>{children}</div>
    </IonPopover>
  )
}

Popover.propTypes = {
  event: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.node
}
