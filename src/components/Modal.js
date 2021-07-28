import React from 'react'
import PropTypes from 'prop-types'
import { modalController } from '@ionic/core'
import { IonModal, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { close } from 'ionicons/icons'

export const useModalStyles = createUseStyles(theme => ({
  container: {
    '& > .modal-wrapper': {
      background: 'transparent'
    }
  },
  close: {
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    zIndex: 10,
    position: 'absolute'
  }
}))

export const Modal = ({ isOpen, onClose, children }) => {
  const classes = useModalStyles()

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose} className={classes.container}>
      <IonIcon size="large" icon={close} className={classes.close} onClick={modalController.dismiss} />
      {React.cloneElement(children, { dismissModal: modalController.dismiss })}
    </IonModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
}
