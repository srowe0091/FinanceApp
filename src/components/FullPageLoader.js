import React from 'react'
import { createUseStyles } from 'react-jss'
import { IonSpinner } from '@ionic/react'

const useRelativeLoaderStyles = createUseStyles({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const RelativeLoader = () => {
  const classes = useRelativeLoaderStyles()
  return (
    <div className={classes.container}>
      <IonSpinner color="primary" className={classes.loading} />
    </div>
  )
}
