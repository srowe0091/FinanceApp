import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonContent, useIonViewWillEnter } from '@ionic/react'
import isFunction from 'lodash/fp/isFunction'

import { Toolbar, RelativeLoader } from 'components'
import { useToolbarTransition } from 'utils'

export const userToolbarContentStyles = createUseStyles(theme => ({
  topSpacing: {
    marginTop: theme.spacing(1)
  },
  container: {
    margin: theme.spacing(0, 2)
  }
}))

export const ToolbarContent = ({ children, toolbarChildren, title, back, loading }) => {
  const classes = userToolbarContentStyles()
  const ref = useRef()
  const { toolbarTransition, scrollHandler } = useToolbarTransition()

  useIonViewWillEnter(() => {
    if (isFunction(ref?.current?.scrollToTop)) ref.current.scrollToTop()
  })

  return (
    <>
      <Toolbar back={back} title={title} transition={toolbarTransition}>
        {toolbarChildren}
      </Toolbar>

      <div className={classes.topSpacing} />

      {loading && <RelativeLoader />}

      <IonContent ref={ref} color="background" fullscreen scrollEvents onIonScroll={scrollHandler}>
        <div className={classes.container}>{!loading && children}</div>
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
