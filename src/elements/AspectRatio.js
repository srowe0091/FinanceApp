import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useAspectRatioStyles = createUseStyles({
  wrapper: {
    width: ({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '100%'),
    display: 'inline-block',
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      paddingTop: ({ ratio }) => `${(1 / ratio) * 100}%`
    }
  },
  main: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  }
})

export const AspectRatio = ({ className, children, ratio, maxWidth }) => {
  const classes = useAspectRatioStyles({ ratio, maxWidth })
  return (
    <div className={clsx(classes.wrapper, className)}>
      <div className={classes.main}>{children}</div>
    </div>
  )
}

AspectRatio.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  ratio: PropTypes.number,
  maxWidth: PropTypes.number
}
