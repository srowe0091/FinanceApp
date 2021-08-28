import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { useUser } from 'modules/authentication'

export const useProfileIconStyles = createUseStyles({
  container: {
    width: ({ size }) => (size === 'small' ? 42 : 60),
    height: ({ size }) => (size === 'small' ? 42 : 60),
    lineHeight: ({ size }) => `${size === 'small' ? 42 : 80}px`,
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: 'var(--boxShadow)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ icon }) => `url(${icon})`
  }
})

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
