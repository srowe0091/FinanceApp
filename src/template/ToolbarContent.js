import React from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'

import { Toolbar, RelativeLoader } from 'components'

export const ToolbarContent = ({ children, toolbarChildren, title, back, loading }) => {
  return (
    <>
      {toolbarChildren && (
        <Toolbar back={back} title={title}>
          {toolbarChildren}
        </Toolbar>
      )}

      {loading && <RelativeLoader />}

      <IonContent fullscreen>{!loading && children}</IonContent>
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
