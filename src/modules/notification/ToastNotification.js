import React, { useState, useCallback } from 'react'
import { IonToast } from '@ionic/react'

import { usePubSubListen } from 'modules/pubsub'

const _buttons = [{ text: 'Done', role: 'cancel' }]

export const ToastNotification = () => {
  const [message, updateState] = useState(null)
  const clearToast = useCallback(() => updateState(null), [])
  usePubSubListen('TOAST_NOTIFICATION', updateState)

  return (
    <IonToast
      isOpen={!!message}
      color="primary"
      position="top"
      duration={1500}
      buttons={_buttons}
      onDidDismiss={clearToast}
      message={message}
    />
  )
}
