import React, { useMemo } from 'react'
import { IonIcon, IonItem, IonText } from '@ionic/react'
import { caretUp, caretDown } from 'ionicons/icons'
import { useToggle } from 'react-use'
import dayjs from 'dayjs'
import map from 'lodash/fp/map'
import groupBy from 'lodash/fp/groupBy'

import { BillEntry } from '../components'
import { useBillsStyles } from '../util'
import { useBills } from '../hooks'
import CalendarView from './CalendarView'
import routes from 'routes'
import { currency } from 'utils'
import { Modal, Fab } from 'components'
import { PageContainer } from 'template'

const Bills = () => {
  const classes = useBillsStyles()
  const { bills, loading, totalBills, income } = useBills()
  const [calendarModal, toggleCalendarModal] = useToggle(false)

  const sortedBills = useMemo(() => {
    const todaysDate = dayjs().date()
    return groupBy(bill => (bill.dueDate >= todaysDate ? 'UPCOMING' : 'PASSED'))(bills)
  }, [bills])

  if (loading) return null

  return (
    <PageContainer padding>
      <div className={classes.panel}>
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

      {!!sortedBills.UPCOMING && <p variant="body2">Upcoming</p>}
      {map(b => <BillEntry key={b.id} {...b} />)(sortedBills.UPCOMING)}

      {!!sortedBills.PASSED && <p variant="body2">Passed</p>}
      {map(b => <BillEntry key={b.id} {...b} disabled />)(sortedBills.PASSED)}

      <Modal isOpen={calendarModal} onClose={toggleCalendarModal}>
        <CalendarView />
      </Modal>

      <Fab routerLink={routes.newBill} />
    </PageContainer>
  )
}

export default Bills
