import React from 'react'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react'

import { useCalendarStyles } from '../util'

const NewBillView = ({ dismissModal }) => {
  const classes = useCalendarStyles()

  return (
    <IonContent>
      <div className={classes.container}>
        <div></div>
      </div>
    </IonContent>
  )
}

NewBillView.propTypes = {
  dismissModal: PropTypes.func
}

export default NewBillView
