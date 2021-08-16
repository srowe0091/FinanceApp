import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

export const useProfileIconStyles = createUseStyles({
  container: {
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: '40px',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: 'var(--boxShadow)'
  }
})

export const ProfileIcon = ({ icon, ...rest }) => {
  const classes = useProfileIconStyles()

  return (
    <div className={classes.container} {...rest}>
      <img src={icon} alt="profile-icon" />
    </div>
  )
}

ProfileIcon.propTypes = {
  icon: PropTypes.string
}
