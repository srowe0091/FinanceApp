import React, { useCallback, useState } from 'react'
import { IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'

import PayTransaction from './PayTransaction'
import Users from './Users'
import { Toolbar } from 'components'

const Admin = () => {
  const [activeTab, changeTab] = useState('pay')
  const handleTabChange = useCallback(e => changeTab(e.target.value), [])

  return (
    <>
      <Toolbar color="medium" title="Admin" />

      <IonToolbar color="medium">
        <IonSegment onIonChange={handleTabChange} value={activeTab}>
          <IonSegmentButton value="pay">
            <IonLabel>Pay</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="users">
            <IonLabel>Users</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      {activeTab === 'pay' && <PayTransaction />}
      {activeTab === 'users' && <Users />}
    </>
  )
}

export default Admin
