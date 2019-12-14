import React, { createElement } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles(theme => ({
  container: {
    '& fieldset': {
      borderRadius: '50px',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1)
    }
  },
  input: {
    paddingTop: theme.spacing(.5),
    paddingBottom: theme.spacing(.5),
    boxShadow: theme.shadows[2],
    borderRadius: '50px',
    backgroundColor: theme.palette.common.white,
  }
}))

export const Input = ({ icon, error, ...field }) => {
  const classes = useStyles()
  return (
    <FormControl fullWidth variant="filled" margin="dense" error={!!error} className={classes.container}>
      <OutlinedInput
        className={classes.input}
        startAdornment={createElement(icon, { color: error ? 'error' : 'primary' })}
        {...field}
      />
    </FormControl>
  )
}

Input.propTypes = {
  icon: PropTypes.elementType,
  error: PropTypes.string
}
