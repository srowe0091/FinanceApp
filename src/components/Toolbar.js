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
      content: 'none'
    }
  },
  icon: {
    margin: theme.spacing(0, 1)
  }
}))

export const Toolbar = ({ children, title, back, extraToolbar }) => {
  const classes = useToolbarStyles()
  return (
    <IonHeader className={classes.header}>
      <IonToolbar>
        <IonButtons className={classes.icon} slot="start">
          {back ? <IonBackButton /> : <IonMenuButton />}
        </IonButtons>
        {title && <IonTitle>{title}</IonTitle>}
        {children}
      </IonToolbar>
      {extraToolbar}
    </IonHeader>
  )
}

Toolbar.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  title: PropTypes.string,
  back: PropTypes.bool,
  transition: PropTypes.bool,
  extraToolbar: PropTypes.node
}
