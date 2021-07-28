import React from 'react'
import { createUseStyles } from 'react-jss'
import get from 'lodash/fp/get'
import { Base } from './Base'

const useFadeStyles = createUseStyles({
  '@keyframes fade': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  animate: {
    animationName: '$fade',
    animationDelay: get('delay'),
    animationDuration: get('duration'),
    animationFillMode: 'backwards',
    animationTimingFunction: 'ease-in-out'
  }
})

export const Fade = props => <Base animationStyles={useFadeStyles} {...props} />
