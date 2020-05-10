import React from 'react'
import PropTypes from 'prop-types'
import { popoverController } from '@ionic/core'
import { IonPopover } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const usePopoverStyles = createUseStyles(theme => ({
  container: {
    '&:focus': {
      outline: 'none'
    }
  }
}))

export const Popover = ({ event, onClose, children }) => {
  const classes = usePopoverStyles()
  return (
    <IonPopover
      showBackdrop={false}
      event={event}
      isOpen={!!event}
      onDidDismiss={onClose}
      className={classes.container}
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
