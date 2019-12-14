import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    top: '0',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '100'
  }
})

export const FullPageLoader = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <CircularProgress size={50} className={classes.loading} />
    </Box>
  )
}
