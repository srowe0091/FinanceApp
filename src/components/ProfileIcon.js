import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

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

export const ProfileIcon = ({ size = 'small', ...rest }) => {
  const { profileImage } = useUser()
  const classes = useProfileIconStyles({ size, icon: profileImage })

  return <div className={classes.container} {...rest} />
}

ProfileIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string
}
