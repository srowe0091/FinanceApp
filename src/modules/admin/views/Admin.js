import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { IonToolbar, IonHeader, IonSegment, IonSegmentButton } from '@ionic/react'

import PayTransactionView from './PayTransactionsView'
import GroupView from './GroupView'

const View = ({ show, component }) => React.cloneElement(component, { style: { display: show ? null : 'none' } })

View.propTypes = {
  show: PropTypes.bool,
  component: PropTypes.node
}

const Admin = () => {
  const [state, updateState] = useState('pay')

  const handleChange = useCallback(e => updateState(e.detail.value), [])

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={state} onIonChange={handleChange}>
            <IonSegmentButton value="pay">Pay</IonSegmentButton>
            <IonSegmentButton value="group">Group</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <View show={state === 'pay'} component={<PayTransactionView />} />
      <View show={state === 'group'} component={<GroupView />} />
    </>
  )
}

Admin.propTypes = {
  location: PropTypes.object
}

export default Admin
