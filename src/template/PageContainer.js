import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonContent } from '@ionic/react'
import { createUseStyles } from 'react-jss'

export const usePageContainerStyles = createUseStyles(theme => ({
  content: {
    '--background': 'var(--pageBackground)'
  },
  childrenWrapper: {
    padding: addPadding => theme.spacing(addPadding ? 2 : 0)
  }
}))

export const PageContainer = ({ children, className, loading, padding, ...rest }) => {
  const classes = usePageContainerStyles(padding)

  return (
    <IonContent scrollY={!loading} className={classes.content} {...rest}>
      <div className={clsx(padding && classes.childrenWrapper, className)}>{children}</div>
    </IonContent>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
  padding: PropTypes.bool
}
