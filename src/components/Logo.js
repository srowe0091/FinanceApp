import React from 'react'
import PropTypes from 'prop-types'

import logoJpg from 'media/logo.png'

export const Logo = ({ className }) => {
  return <img className={className} src={logoJpg} alt="logo" />
}

Logo.propTypes = {
  className: PropTypes.string
}
