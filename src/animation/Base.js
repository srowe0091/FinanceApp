import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useMountedState } from 'react-use'

export const Base = ({ children, animationStyles, index = 0, delay = 0, duration = 300, disableAnimation = false }) => {
  const isMounted = useMountedState()
  const animationClass = animationStyles({ delay, duration, index })
  return <div className={clsx(!(disableAnimation || isMounted()) && animationClass.animate)}>{children}</div>
}

Base.propTypes = {
  children: PropTypes.node,
  animationStyles: PropTypes.func,
  index: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  disableAnimation: PropTypes.bool
}
