import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonFab, IonFabButton, IonIcon, IonText, IonSpinner } from '@ionic/react'

import { add } from 'ionicons/icons'
import { Grow } from 'animation'

const useFabStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(0.5),
    overflow: 'hidden',
    position: 'fixed'
  },
  fab: {
    position: 'relative',
    borderRadius: '50%',
    background: 'var(--gray8)'
  },
  spinner: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    transform: 'scale(1.2)'
  }
}))

export const Fab = ({ icon = add, text, loading, disabled, disableAnimation = false, delay = 0, ...props }) => {
  const classes = useFabStyles()
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed" className={classes.container}>
      <Grow disableAnimation={disableAnimation} delay={delay}>
        <div className={classes.fab}>
          {loading && <IonSpinner color="light" className={classes.spinner} name="crescent" />}
          <IonFabButton disabled={loading || disabled} {...props}>
            {text ? <IonText>{text}</IonText> : <IonIcon size="large" className={classes.icon} icon={icon} />}
          </IonFabButton>
        </div>
      </Grow>
    </IonFab>
  )
}

Fab.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  disableAnimation: PropTypes.bool,
  delay: PropTypes.number
}
