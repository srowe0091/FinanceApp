import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonFab, IonFabButton, IonIcon } from '@ionic/react'

import { add } from 'ionicons/icons'

const useNavFabStyles = createUseStyles({
  container: {
    left: '50%',
    bottom: 10,
    transform: 'translateX(-50%)'
  }
})

export const NavFab = ({ ...rest }) => {
  const classes = useNavFabStyles()
  return (
    <IonFab className={classes.container}>
      <IonFabButton {...rest}>
        <IonIcon size="large" icon={add} />
      </IonFabButton>
    </IonFab>
  )
}

NavFab.propTypes = {
  icon: PropTypes.node
}
