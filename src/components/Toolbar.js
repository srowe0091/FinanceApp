import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonHeader, IonMenuButton, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import isNil from 'lodash/fp/isNil'

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
  fadeIn: {
    backgroundColor: color => (color ? `var(--ion-color-${color})` : null),
    animationName: '$fadeIn',
    animationDuration: '500ms'
  },
  fadeOut: {
    animationName: '$fadeOut',
    animationDuration: '500ms'
  },
  icon: {
    margin: theme.spacing(0, 1)
  }
}))

export const Toolbar = ({ children, translucent, color = 'primary', title, back, transition, extraToolbar }) => {
  const classes = useToolbarStyles(color)
  const transitionClass = useMemo(() => {
    if (!isNil(transition)) {
      return transition ? classes.fadeIn : classes.fadeOut
    }
  }, [transition, classes])
  return (
    <IonHeader className={clsx(transitionClass, classes.header)}>
      <IonToolbar translucent={translucent} color={!transitionClass && color}>
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
  translucent: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string,
  back: PropTypes.bool,
  transition: PropTypes.bool,
  extraToolbar: PropTypes.node
}
