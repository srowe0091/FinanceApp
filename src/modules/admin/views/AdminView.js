import React, { useCallback, useState } from 'react'
import { IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'

import PayTransaction from './PayTab'
import Users from './UsersTab'
import { Toolbar } from 'components'
import { useUser } from 'modules/authentication'

const Admin = () => {
  const { inGroup } = useUser()
  const [activeTab, changeTab] = useState('pay')
  const handleTabChange = useCallback(e => changeTab(e.target.value), [])

  return (
    <>
      <Toolbar
        color="medium"
        title="Admin"
        extraToolbar={inGroup && (
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
        )}
      />
      {activeTab === 'pay' && <PayTransaction />}
      {activeTab === 'users' && <Users />}
    </>
  )
}

export default Admin
