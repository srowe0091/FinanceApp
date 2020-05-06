import React from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'

import { Toolbar} from 'components'
import { useToolbarTransition } from 'utils'

export const ToolbarContent = ({ children, toolbarChildren, title, back }) => {
  const { toolbarTransition, scrollHandler } = useToolbarTransition()
  return (
    <>
      <Toolbar back={back} title={title} transition={toolbarTransition}>
        {toolbarChildren}
      </Toolbar>

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
  back: PropTypes.bool
}