import React from 'react'
import PropTypes from 'prop-types'
import { IonHeader, IonMenuButton, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useToolbarStyles = createUseStyles(theme => ({
  header: {
    '&::after': {
      display: 'none'
    }
  },
  toolbar: {
    '--background': 'var(--alpha0)'
  },
  icon: {
    margin: theme.spacing(0, 1)
  }
}))

export const Toolbar = ({ children, title, back }) => {
  const classes = useToolbarStyles()
  return (
    <IonHeader className={classes.header}>
      <IonToolbar className={classes.toolbar}>
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
  title: PropTypes.string,
  back: PropTypes.bool,
  transition: PropTypes.bool
}
