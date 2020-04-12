import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import logoJpg from 'media/logo.png'

const useStyles = createUseStyles({
  logo: {
    width: '100%'
  }
})

export const Logo = ({ className }) => {
  const classes = useStyles()
  const _className = useMemo(() => clsx(className, classes.logo), [classes, className])
  return <img className={_className} src={logoJpg} alt="logo" />
}

Logo.propTypes = {
  className: PropTypes.string
}
