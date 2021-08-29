import React from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { createUseStyles } from 'react-jss'

export const usePageContainerStyles = createUseStyles({
  content: {
    '--background': 'var(--pageBackground)'
  }
})

export const PageContainer = ({ children, className, loading, ...rest }) => {
  const classes = usePageContainerStyles()

  return (
    <IonContent scrollY={!loading} className={classes.content} {...rest}>
      <div className={className}>{children}</div>
    </IonContent>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool
}
