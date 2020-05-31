import React from 'react'
import PropTypes from 'prop-types'
import { IonRefresher, IonRefresherContent } from '@ionic/react'
import { createUseStyles } from 'react-jss'

export const usePullToRefreshStyles = createUseStyles({
  refresh: {
    zIndex: '100 !important'
  }
})

export const PullToRefresh = ({ onRefresh }) => {
  const classes = usePullToRefreshStyles()
  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh} className={classes.refresh}>
      <IonRefresherContent />
    </IonRefresher>
  )
}

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired
}
