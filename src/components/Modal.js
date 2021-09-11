import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { modalController } from '@ionic/core'
import { IonModal, IonIcon } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import { close } from 'ionicons/icons'

import { Button } from 'components'

export const useModalStyles = createUseStyles(theme => ({
  container: {
    '& > .modal-wrapper': {
      background: 'transparent'
    }
  },
  close: {
    top: theme.spacing(1),
    right: theme.spacing(1.75),
    zIndex: 10,
    position: 'absolute'
  }
}))

export const Modal = ({ isOpen, onClose, disableClose, children }) => {
  const classes = useModalStyles()
  const propsToPass = useMemo(
    () => ({
      ...(!disableClose && { dismissModal: modalController.dismiss })
    }),
    [disableClose]
  )

  return (
    <IonModal isOpen={isOpen} onWillDismiss={onClose} className={classes.container}>
      {!disableClose && (
        <Button shape="" color="dark" expand="block" className={classes.close} onClick={modalController.dismiss}>
          <IonIcon slot="icon-only" icon={close} />
        </Button>
      )}
      {React.cloneElement(children, propsToPass)}
    </IonModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  disableClose: PropTypes.bool
}
