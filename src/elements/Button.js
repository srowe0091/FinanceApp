import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Button as MaterialButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: '-12px',
    marginLeft: '-12px',
    top: '50%',
    left: '50%',
    position: 'absolute'
  },
  button: {
    borderRadius: '50px',
    position: 'relative',
    padding: theme.spacing(1.5)
  }
}))

export const Button = ({ children, className, loading, ...props }) => {
  const classes = useStyles()
  return (
      <MaterialButton
        fullWidth
        className={clsx(classes.button, className)}
        {...props}
      >
        {children}
        {loading && <CircularProgress size={24} className={classes.loading} />}
      </MaterialButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool
}

Button.defaultProps = {
  type: 'button',
  color: "primary",
  variant: "contained"
}
