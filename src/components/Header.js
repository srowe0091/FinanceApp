import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useHeaderStyles = createUseStyles(theme => ({
  header: {
    marginBottom: theme.spacing(3)
  }
}))

export const Header = ({ label }) => {
  const classes = useHeaderStyles()
  return <h5 className={classes.header}>{label}</h5>
}

Header.propTypes = {
  label: PropTypes.string
}
