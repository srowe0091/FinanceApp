import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonContent, useIonViewWillEnter } from '@ionic/react'
import isFunction from 'lodash/fp/isFunction'

import { Toolbar, RelativeLoader } from 'components'
import { useToolbarTransition } from 'utils'

export const userToolbarContentStyles = createUseStyles(theme => ({
  container: {
    marginTop: theme.spacing(1)
  }
}))

export const ToolbarContent = ({ children, toolbarChildren, title, back, loading }) => {
  const classes = userToolbarContentStyles()
  const ref = useRef()
  const { toolbarTransition, scrollHandler } = useToolbarTransition()

  useIonViewWillEnter(() => {
    try {
      if (isFunction(ref?.current?.scrollToTop)) ref.current.scrollToTop()
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <>
      <Toolbar back={back} title={title} transition={toolbarTransition}>
        {toolbarChildren}
      </Toolbar>

      <div className={classes.container} />

      {loading && <RelativeLoader />}

      <IonContent ref={ref} color="background" fullscreen scrollEvents onIonScroll={scrollHandler}>
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
