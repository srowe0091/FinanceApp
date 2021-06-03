import React, { useState, useCallback, useMemo } from 'react'
import { IonButtons, IonIcon, IonItem, IonButton, IonText } from '@ionic/react'
import { ellipsisVertical, caretUp, caretDown, calendar } from 'ionicons/icons'
import useToggle from 'react-use/lib/useToggle'
import dayjs from 'dayjs'
import map from 'lodash/fp/map'
import groupBy from 'lodash/fp/groupBy'

import { BillEntry } from '../components'
import { useBillsStyles } from '../util'
import { useBills } from '../hooks'
import NewBillView from './NewBillsView'
import CalendarView from './CalendarView'
import { currency } from 'utils'
import { Modal, Popover } from 'components'
import { ToolbarContent } from 'template'

const Bills = () => {
  const classes = useBillsStyles()
  const { bills, loading, totalBills, income } = useBills()
  const [addBillModal, toggleAddBill] = useToggle(false)
  const [calendarModal, toggleCalendarModal] = useToggle(false)
  const [popoverEvent, setShowPopover] = useState(null)

  const openPopover = useCallback(e => setShowPopover(e.nativeEvent), [])
  const closePopover = useCallback(() => setShowPopover(null), [])

  const sortedBills = useMemo(() => {
    const todaysDate = dayjs().date()
    return groupBy(bill => (bill.dueDate >= todaysDate ? 'UPCOMING' : 'PASSED'))(bills)
  }, [bills])

  if (loading) return null

  return (
    <ToolbarContent
      title="Bills"
      toolbarChildren={
        <IonButtons slot="end">
          <IonButton onClick={toggleCalendarModal}>
            <IonIcon icon={calendar} />
          </IonButton>
          <IonButton onClick={openPopover}>
            <IonIcon className={classes.icons} icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
      }
    >
      <div color="medium" className={classes.panel}>
        <IonItem color="transparent" lines="none">
          <IonIcon icon={caretUp} color="danger" />
          <span className={classes.monthlyInfo}>
            <IonText color="primary" variant="caption">
              Monthly Bills:
            </IonText>
            <p>{currency(totalBills)}</p>
          </span>
        </IonItem>
        <IonItem color="transparent" lines="none">
          <IonIcon icon={caretDown} color="success" />
          <span className={classes.monthlyInfo}>
            <IonText color="primary" variant="caption">
              Household Income:
            </IonText>
            <p>{currency(income)}</p>
          </span>
        </IonItem>
      </div>

      {!!sortedBills.UPCOMING && (
        <p variant="body2" gutterbottom="1">
          Upcoming
        </p>
      )}
      {map(b => <BillEntry key={b.id} {...b} />)(sortedBills.UPCOMING)}

      {!!sortedBills.PASSED && (
        <p variant="body2" gutterbottom="1">
          Passed
        </p>
      )}
      {map(b => <BillEntry key={b.id} {...b} disabled />)(sortedBills.PASSED)}

      <Popover event={popoverEvent} onClose={closePopover}>
        <IonItem onClick={toggleAddBill}>Add New Bill</IonItem>
      </Popover>

      <Modal isOpen={addBillModal} onClose={toggleAddBill}>
        <NewBillView />
      </Modal>

      <Modal isOpen={calendarModal} onClose={toggleCalendarModal}>
        <CalendarView />
      </Modal>
    </ToolbarContent>
  )
}

export default Bills
