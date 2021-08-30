import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import cond from 'lodash/fp/cond'
import matches from 'lodash/fp/matches'
import constant from 'lodash/fp/constant'

import { useUser } from 'modules/authentication'
import { IonText } from '@ionic/react'

const determineIconSize = cond([
  [matches({ size: 'small' }), constant(42 + 'px')],
  [matches({ size: 'medium' }), constant(60 + 'px')],
  [matches({ size: 'large' }), constant(72 + 'px')]
])

const determineFontSize = cond([
  [matches('small'), constant('h6')],
  [matches('medium'), constant('h4')],
  [matches('large'), constant('h3')]
])

const useProfileIconStyles = createUseStyles(theme => ({
  container: {
    width: determineIconSize,
    height: determineIconSize,
    lineHeight: determineIconSize,
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'var(--ion-color-primary)',
    boxShadow: theme.boxShadow(),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: ({ icon }) => `url(${icon})`
  }
}))

export const ProfileIcon = ({ className, size = 'small' }) => {
  const { profileImage, firstName, lastName } = useUser()
  const classes = useProfileIconStyles({ size, icon: profileImage })
  const variant = useMemo(() => determineFontSize(size), [size])

  return (
    <div className={clsx(className, classes.container)}>
      {!profileImage && (
        <IonText color="light" variant={variant}>
          <strong>
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </strong>
        </IonText>
      )}
    </div>
  )
}

ProfileIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string
}
