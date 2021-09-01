import React from 'react'
import PropTypes from 'prop-types'
import { IonIcon } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

import { arrowBack } from 'ionicons/icons'

import { Button } from 'components'

const useHeaderStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  goBack: {
    marginRight: theme.spacing(2)
  }
}))

export const Header = ({ label, goBack }) => {
  const classes = useHeaderStyles()
  const history = useHistory()
  return (
    <div className={classes.container}>
      {goBack && (
        <Button color="dark" size="small" onClick={history.goBack} className={classes.goBack}>
          <IonIcon slot="icon-only" icon={arrowBack} />
        </Button>
      )}

      <h5>{label}</h5>
    </div>
  )
}

Header.propTypes = {
  label: PropTypes.string,
  goBack: PropTypes.bool
}
