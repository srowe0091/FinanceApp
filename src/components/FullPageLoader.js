import React from 'react'
import { createUseStyles } from 'react-jss'
import { IonSpinner, IonContent } from '@ionic/react'

const useFullPageLoaderStyles = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    top: 0,
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    width: 40,
    height: 40
  }
})

export const FullPageLoader = () => {
  const classes = useFullPageLoaderStyles()
  return (
    <div className={classes.container}>
      <IonSpinner color="primary" className={classes.loading} />
    </div>
  )
}

const useRelativeLoaderStyles = createUseStyles({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const RelativeLoader = () => {
  const classes = useRelativeLoaderStyles()
  return (
    <IonContent color="dark">
      <div className={classes.container}>
        <IonSpinner color="primary" className={classes.loading} />
      </div>
    </IonContent>
  )
}