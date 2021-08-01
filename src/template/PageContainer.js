import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'
import { createUseStyles } from 'react-jss'

import { Toolbar } from 'components'

export const usePageContainerStyles = createUseStyles({
  content: {
    '--background': '#F8F8FF'
  }
})

export const PageContext = createContext()

export const PageContainer = ({ children, loading, toolbarChildren }) => {
  const classes = usePageContainerStyles({ loading })

  return (
    <PageContext.Provider value={loading}>
      {toolbarChildren && <Toolbar>{toolbarChildren}</Toolbar>}

      <IonContent scrollY={!loading} className={classes.content}>
        {children}
      </IonContent>
    </PageContext.Provider>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  toolbarChildren: PropTypes.node
}
