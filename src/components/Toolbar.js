import React from 'react'
import PropTypes from 'prop-types'
import { IonHeader, IonMenuButton, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useToolbarStyles = createUseStyles(theme => ({
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
  },
  icon: {
    margin: theme.spacing(0, 1)
  }
}))

export const Toolbar = ({ children, translucent, color = "primary", title, back }) => {
  const classes = useToolbarStyles()
  return (
    <IonHeader className={classes.header}>
      <IonToolbar className={classes.toolbar} translucent={translucent} color={color}>
        <IonButtons className={classes.icon} slot="start">
          {back ? <IonBackButton /> : <IonMenuButton />}
        </IonButtons>
        {title && <IonTitle>{title}</IonTitle>}
        {children}
      </IonToolbar>
    </IonHeader>
  )
}

Toolbar.propTypes = {
  children: PropTypes.node,
  translucent: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string,
  back: PropTypes.bool
}
