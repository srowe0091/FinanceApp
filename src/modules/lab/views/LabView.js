import React, { useCallback } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonContent
} from '@ionic/react'
import { createUseStyles } from 'react-jss'

import { Button } from 'elements'
import { GetPendingNotificiations, ScheduleNotification, ClearNotifications } from 'lib/Capacitor'

const useLabStyles = createUseStyles(theme => ({
  button: {
    marginBottom: theme.spacing(5)
  }
}))

const Lab = () => {
  const classes = useLabStyles()
  const getPending = useCallback(() => {
    GetPendingNotificiations().then(console.log)
  }, [])

  const create = useCallback(() => {
    ScheduleNotification()
  }, [])

  const clearAll = useCallback(() => {
    ClearNotifications()
  }, [])
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lab</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Button className={classes.button} onClick={getPending}>
          Log Pending
        </Button>
        <Button className={classes.button} onClick={create}>
          create notifications
        </Button>
        <Button className={classes.button} onClick={clearAll}>
          clear all notifications
        </Button>
      </IonContent>
    </>
  )
}

export default Lab
