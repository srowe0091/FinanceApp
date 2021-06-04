import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { useMountedState } from 'react-use'

const useStaggeredListAnimationStyles = createUseStyles({
  '@keyframes staggeredList': {
    from: {
      opacity: 0,
      transform: `scale(.75)`
    },
    to: {
      opacity: 1,
      transform: 'none'
    }
  },
  animate: {
    position: 'relative',
    animationName: '$staggeredList',
    animationDuration: 250,
    animationDelay: ({ index }) => `${50 * index}ms`,
    animationFillMode: 'backwards',
    animationTimingFunction: 'ease-out'
  }
})

export const StaggeredList = ({ index, children }) => {
  const classes = useStaggeredListAnimationStyles({ index })
  const isMounted = useMountedState()
  return <div className={clsx(!isMounted() && classes.animate)}>{children}</div>
}

StaggeredList.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number
}
