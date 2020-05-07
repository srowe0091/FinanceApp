import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonContent } from '@ionic/react'

import { Toolbar, RelativeLoader } from 'components'
import { useToolbarTransition } from 'utils'

export const useWalletStyles = createUseStyles(theme => ({
  container: {
    marginTop: theme.spacing(3)
  }
}))

export const ToolbarContent = ({ children, toolbarChildren, title, back, loading }) => {
  const classes = useWalletStyles()
  const { toolbarTransition, scrollHandler } = useToolbarTransition()
  return (
    <>
      <Toolbar back={back} title={title} transition={toolbarTransition}>
        {toolbarChildren}
      </Toolbar>

      <div className={classes.container} />

      {loading && <RelativeLoader />}

      <IonContent color="background" fullscreen scrollEvents onIonScroll={scrollHandler}>
        {children}
      </IonContent>
    </>
  )
}

ToolbarContent.propTypes = {
  children: PropTypes.node,
  toolbarChildren: PropTypes.node,
  title: PropTypes.string,
  back: PropTypes.bool,
  loading: PropTypes.bool
}
