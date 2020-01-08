import React from 'react'
import PropTypes from 'prop-types'
import { IonHeader, IonMenuButton, IonToolbar, IonButtons } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useToolbarStyles = createUseStyles({
  '@keyframes fadeIn': {
    from: { backgroundColor: 'var(--alpha0)' },
    to: { backgroundColor: 'var(--ion-color-primary)' }
  },
  '@keyframes fadeOut': {
    from: { backgroundColor: 'var(--ion-color-primary)' },
    to: { backgroundColor: 'var(--alpha0)' }
  },
  header: {
    '&:after': {
      content: color => color ? '""' : 'none',
    }
  },
  toolbar: {
    backgroundColor: color => color ? 'var(--ion-color-primary)' : null,
    animationName: color => color ? '$fadeIn' : '$fadeOut',
    animationDuration: '350ms'
  }
})

export const Toolbar = ({ translucent, color }) => {
  const classes = useToolbarStyles(color)
  return (
    <IonHeader className={classes.header}>
      <IonToolbar className={classes.toolbar} translucent={translucent}>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

Toolbar.propTypes = {
  translucent: PropTypes.bool,
  color: PropTypes.string
}
