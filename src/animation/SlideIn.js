import React from 'react'
import { createUseStyles } from 'react-jss'
import get from 'lodash/fp/get'
import { Base } from './Base'

const useSlideInStyles = createUseStyles({
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: `translateX(20%)`
    },
    to: {
      opacity: 1,
      transform: `translateY(0)`
    }
  },
  animate: {
    animationName: '$slideIn',
    animationDelay: get('delay'),
    animationDuration: get('duration'),
    animationTimingFunction: 'ease-in-out'
  }
})

export const SlideIn = props => <Base animationStyles={useSlideInStyles} {...props} />
