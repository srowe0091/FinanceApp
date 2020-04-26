import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react'

import { formatDate } from 'utils'

const useTransactionStyles = createUseStyles(theme => ({
  transaction: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 2px 5px -2px var(--black)'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkbox: {
    marginRight: theme.spacing(2)
  },
  group: {
    '&::before': {
      content: '""',
      width: '4px',
      top: 0,
      left: 0,
      bottom: 0,
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'var(--ion-color-primary)'
    }
  }
}))

export const TransactionEntry = ({ id, amount, description, createdAt, onCheckboxClick, checked, group }) => {
  const classes = useTransactionStyles()
  return (
    <IonItem color="medium" lines="none" className={clsx(classes.transaction, { [classes.group]: group })}>
      <IonLabel>
        <span className={classes.label}>
          <span>
            <p>{description || <span color="textSecondary">(blank)</span>}</p>
            <p color="textSecondary" variant="caption">
              {formatDate(createdAt)}
            </p>
          </span>
          <span>
            <p>${(amount / 100).toFixed(2)}</p>
            {group && (
              <p color="textSecondary" variant="caption" align="right">
                group
              </p>
            )}
          </span>
        </span>
      </IonLabel>
      {onCheckboxClick && (
        <IonCheckbox slot="start" className={classes.checkbox} checked={checked} onIonChange={onCheckboxClick(id)} />
      )}
    </IonItem>
  )
}

TransactionEntry.propTypes = {
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func,
  group: PropTypes.bool
}
