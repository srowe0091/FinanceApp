import React from 'react'
import { createUseStyles } from 'react-jss'
import get from 'lodash/fp/get'
import { Base } from './Base'

const useGrowStyles = createUseStyles({
  '@keyframes grow': {
    from: {
      opacity: 0,
      transform: `translateY(50px) scale(0)`
    },
    to: {
      opacity: 1,
      transform: `translateY(0) scale(1)`
    }
  },
  animate: {
    animationName: '$grow',
    animationDelay: get('delay'),
    animationDuration: get('duration'),
    animationFillMode: 'backwards',
    animationTimingFunction: 'ease-in-out'
  }
})

export const Grow = props => <Base animationStyles={useGrowStyles} {...props} />
