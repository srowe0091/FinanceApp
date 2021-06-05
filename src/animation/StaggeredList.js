import React from 'react'
import { createUseStyles } from 'react-jss'
import { Base } from './Base'

const useStaggeredListStyles = createUseStyles({
  '@keyframes staggeredList': {
    from: {
      opacity: 0,
      transform: `scale(.7) translateY(-12px)`
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
    animationDelay: ({ index }) => `${40 * index}ms`,
    animationFillMode: 'backwards',
    animationTimingFunction: 'ease-out'
  }
})

export const StaggeredList = props => <Base animationStyles={useStaggeredListStyles} {...props} />
