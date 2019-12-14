import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import logoJpg from 'media/logo.jpg'

const useStyles = makeStyles({
  logo: {
    width: '100%'
  }
})

export const Logo = ({ className }) => {
  const classes = useStyles()
  return (
    <img className={`${classes.logo} ${className}`} src={logoJpg} alt="logo" />
  )
}

Logo.propTypes = {
  className: PropTypes.string
}
