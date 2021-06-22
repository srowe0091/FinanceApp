import React from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { createUseStyles } from 'react-jss'

import { Toolbar, RelativeLoader } from 'components'

export const usePageContainerStyles = createUseStyles({
  container: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column'
  }
})

export const PageContainer = ({ children, loading, toolbarChildren }) => {
  const classes = usePageContainerStyles()

  if (loading) {
    return <RelativeLoader />
  }

  return (
    <>
      {toolbarChildren && <Toolbar>{toolbarChildren}</Toolbar>}

      <IonContent fullscreen>
        <div className={classes.container}>{children}</div>
      </IonContent>
    </>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  toolbarChildren: PropTypes.node
}
