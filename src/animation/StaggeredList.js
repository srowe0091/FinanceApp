import React from 'react'
import { createUseStyles } from 'react-jss'
import { Base } from './Base'

const useStaggeredListStyles = createUseStyles({
  '@keyframes staggeredList': {
    from: {
      opacity: 0,
      transform: `scale(.7)`
    },
    to: {
      opacity: 1,
      transform: 'none'
    }
  },
  animate: {
    position: 'relative',
    animationName: '$staggeredList',
    animationDuration: 500,
    animationDelay: ({ index, delay = 0 }) => `${40 * (index + delay)}ms`,
    animationFillMode: 'backwards',
    animationTimingFunction: 'ease-in-out'
  }
})

export const StaggeredList = props => <Base animationStyles={useStaggeredListStyles} {...props} />
