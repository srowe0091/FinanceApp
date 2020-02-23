import React from 'react'
import PropTypes from 'prop-types'
import { IonRefresher, IonRefresherContent } from '@ionic/react'

export const PullToRefresh = ({ onRefresh }) => {
  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
      <IonRefresherContent />
    </IonRefresher>
  )
}

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired
}