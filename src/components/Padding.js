import React from 'react'
import { createUseStyles } from 'react-jss'

export const usePaddingStyles = createUseStyles(theme => ({
  padding: {
    padding: theme.spacing(2, 2, 0)
  }
}))

export const Padding = props => {
  const classes = usePaddingStyles()
  return <div className={classes.padding} {...props} />
}
