import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { IonToolbar, IonSegment, IonSegmentButton } from '@ionic/react'

import { PageContainer } from 'template'

import PayTransactionView from './PayTransactionsView'
import GroupView from './GroupView'

const Admin = () => {
  const [state, updateState] = useState('pay')

  const handleChange = useCallback(e => updateState(e.detail.value), [])

  return (
    <PageContainer>
      <IonToolbar>
        <IonSegment value={state} onIonChange={handleChange}>
          <IonSegmentButton value="pay">Pay</IonSegmentButton>
          <IonSegmentButton value="group">Group</IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      {state === 'pay' && <PayTransactionView />}
      {state === 'group' && <GroupView />}
    </PageContainer>
  )
}

Admin.propTypes = {
  location: PropTypes.object
}

export default Admin
