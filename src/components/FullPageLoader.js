import React from 'react'
import { createUseStyles } from 'react-jss'
import { IonSpinner } from '@ionic/react'

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    top: '0',
    position: 'fixed',
    zIndex: '100',
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
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <IonSpinner color="primary" className={classes.loading} />
    </div>
  )
}
