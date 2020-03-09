import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { IonButton, IonSpinner } from '@ionic/react'

const useStyles = createUseStyles({
  loading: {
    width: 24,
    height: 24,
    marginTop: -12,
    marginLeft: -12,
    top: '50%',
    left: '50%',
    position: 'absolute'
  },
  button: {
    position: 'relative',
    '--border-radius': 'var(--borderRadius)'
  }
})

export const Button = ({ children, className, loading, ...props }) => {
  const classes = useStyles()
  return (
    <IonButton expand="full" shape="round" className={clsx(className, classes.button)} {...props}>
      {children}
      {loading && <IonSpinner className={classes.loading} />}
    </IonButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool
}

Button.defaultProps = {
  type: 'button'
}
