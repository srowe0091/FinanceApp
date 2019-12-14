import React, { useState, useEffect, useCallback } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  progress: {
    top: top => `${Math.min(top, 150)}px`,
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    left: 'calc(50% - 40px)',
    zIndex: '100',
    position: 'absolute',
    borderRadius: '50px',
    backgroundColor: theme.palette.common.white
  },
}))

const DEFAULT_TOP = -60

export const PullToRefresh = props => {
  const [start, updateStart] = useState(null)
  const [diff, updateDiff] = useState(DEFAULT_TOP)
  const classes = useStyles(diff)

  const touchStart = useCallback(e => {
    updateStart(e.touches[0].pageY)
  }, [])

  const touchMove = useCallback(e => {
    const _diff = e.touches[0].pageY - start
    // console.log(start)
    // console.log('clientY', e.touches[0].clientY)
    // console.log('----------------------------------------')
    // console.log('pageY', e.touches[0].pageY)
    // console.log('----------------------------------------')
    // console.log('screenY', e.touches[0].screenY)
    // console.log('----------------------------------------')
    // console.log(_diff)
    // console.log('----------------------------------------')
    // console.log('----------------------------------------')
    
    if (window.pageYOffset === 0 && _diff > 0) {
      // console.log('refresh!!!')
      updateDiff(_diff + DEFAULT_TOP)
    } else if (_diff < 0) {
      // updateDiff(0)
    }
  }, [start])

  const touchEnd = useCallback(e => {
    updateDiff(20)
    updateStart(null)
  }, [])

  useEffect(() => {
    window.addEventListener('touchstart', touchStart)
    window.addEventListener('touchmove', touchMove, { passive: false })
    window.addEventListener('touchend', touchEnd)

    return function () {
      window.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchmove', touchMove, { passive: false })
      window.removeEventListener('touchend', touchEnd)
    }
  }, [touchStart, touchMove, touchEnd])

  return (
    <Box position="relative" className={classes.container}>
      <CircularProgress className={classes.progress} color="primary" />
      {props.children}
      {/* {console.log(diff)} */}
    </Box>
  )
}
