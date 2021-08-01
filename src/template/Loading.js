import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import { IonSkeletonText } from '@ionic/react'

import { PageContext } from './PageContainer'
import { RelativeLoader } from 'components'

export const useLoadingStyles = createUseStyles({
  skeletonWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: ({ marginTop = 0, spacing }) => `${spacing ?? marginTop}px`,
    marginBottom: ({ marginBottom = 0, spacing }) => `${spacing ?? marginBottom}px`,
    width: ({ width }) => `${width}px`,
    height: ({ height }) => `${height}px`,
    '--border-radius': '50px'
  }
})

export const Loading = ({ children, spinner, ...props }) => {
  const loading = useContext(PageContext)
  const classes = useLoadingStyles(props)

  if (loading && spinner) return <RelativeLoader />

  if (loading) return <IonSkeletonText animated className={classes.skeletonWrapper} />

  return children
}
