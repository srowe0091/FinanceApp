import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import cond from 'lodash/fp/cond'
import matches from 'lodash/fp/matches'
import constant from 'lodash/fp/constant'

import { useUser } from 'modules/authentication'

const determineIconSize = ({ size }) =>
  cond([
    [matches('small'), constant(42)],
    [matches('medium'), constant(60)],
    [matches('large'), constant(72 + 'px')]
  ])(size)

const useProfileIconStyles = createUseStyles(theme => ({
  container: {
    width: determineIconSize,
    height: determineIconSize,
    lineHeight: determineIconSize,
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: theme.boxShadow(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ icon }) => `url(${icon})`
  }
}))

export const ProfileIcon = ({ className, size = 'small', ...rest }) => {
  const { profileImage } = useUser()
  const classes = useProfileIconStyles({ size, icon: profileImage })

  if (!profileImage) return null

  return <div className={clsx(className, classes.container)} {...rest} />
}

ProfileIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string
}
