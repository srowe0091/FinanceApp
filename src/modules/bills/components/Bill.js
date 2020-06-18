import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { createUseStyles } from 'react-jss'
import { IonItem, IonIcon } from '@ionic/react'

import {
  receipt,
  home,
  carSport,
  build,
  card,
  cash,
  shieldCheckmark
} from 'ionicons/icons'

const iconMap = {
  MORTGAGE_RENT: home,
  INSURANCE: shieldCheckmark,
  UTILITIES: build,
  VEHICLE: carSport,
  CREDIT_CARD: card,
  LOAD: cash
}

const useTransactionStyles = createUseStyles(theme => ({
  bill: {
    marginBottom: theme.spacing(2),
    overflow: 'auto',
    borderRadius: 'var(--borderRadius)',
    boxShadow: '0px 2px 5px -2px var(--black)'
  },
  label: {
    width: '100%',
    padding: theme.spacing(1, 0.5),
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textSpacing: {
    marginRight: theme.spacing(1)
  }
}))

export const BillEntry = ({ name, dueDate, amount, type, notes, disabled }) => {
  const classes = useTransactionStyles()
  const _dueDate = useMemo(() => dayjs().date(dueDate).format('M/D'), [dueDate])

  return (
    <div className={classes.bill}>
      <IonItem color="medium" lines="none" disabled={disabled}>
        <IonIcon icon={iconMap[type] || receipt} size="large" />
        <span className={classes.label}>
          <span className={classes.textSpacing}>
            <p wrap="break">{name}</p>
            <p color="textSecondary" variant="caption">
              Due: {_dueDate}
            </p>
          </span>
          <p>${(amount / 100).toFixed(2)}</p>
        </span>
      </IonItem>
    </div>
  )
}

BillEntry.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  notes: PropTypes.string,
  amount: PropTypes.number,
  dueDate: PropTypes.number,
  disabled: PropTypes.bool
}
