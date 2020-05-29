import React, { useState, useCallback } from 'react'
import { IonButtons, IonIcon, IonItem, IonButton } from '@ionic/react'
import { ellipsisVertical } from 'ionicons/icons'
import useToggle from 'react-use/lib/useToggle'
import map from 'lodash/fp/map'

import { BillEntry } from '../components'
import { useBillsStyles } from '../util'
import { useBills } from '../hooks'
import NewBillView from './NewBillsView'
import { Modal, Popover } from 'components'
import { ToolbarContent } from 'template'

const Bills = () => {
  const classes = useBillsStyles()
  const { data, loading } = useBills()
  const [addBillModal, toggleAddBill] = useToggle(false)
  const [popoverEvent, setShowPopover] = useState(null)

  const openPopover = useCallback(e => setShowPopover(e.nativeEvent), [])
  const closePopover = useCallback(() => setShowPopover(null), [])

  if (loading) return null

  return (
    <ToolbarContent
      title="Bills"
      toolbarChildren={
        <IonButtons slot="end">
          <IonButton onClick={openPopover}>
            <IonIcon className={classes.icons} icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
      }
    >
      <div>{map(b => <BillEntry key={b._id} {...b} />)(data?.bills)}</div>

      <Popover event={popoverEvent} onClose={closePopover}>
        <IonItem onClick={toggleAddBill}>Add New Bill</IonItem>
      </Popover>

      <Modal isOpen={addBillModal} onClose={toggleAddBill}>
        <NewBillView />
      </Modal>
    </ToolbarContent>
  )
}

export default Bills
