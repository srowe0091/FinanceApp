import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react';


import { formatDate } from 'utils/normalizer'

const useTransactionStyles = createUseStyles(theme => ({
  transaction: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 2px 5px -2px var(--black)',
    '--background': 'var(--themeGray1)'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    marginRight: theme.spacing(2)
  }
}))

export const TransactionEntry = ({ _id, amount, description, dateCreated, onCheckboxClick, checked }) => {
  const classes = useTransactionStyles()
  return (
    <IonItem className={classes.transaction}>
      <IonLabel color="light">
        <span className={classes.label}>
          <span>
            <p>{description}</p>
            <p color="textSecondary" variant="caption">{formatDate(dateCreated)}</p>
          </span>
          <p>${(amount / 100).toFixed(2)}</p>
        </span>
      </IonLabel>
      {onCheckboxClick && <IonCheckbox slot="start" className={classes.checkbox} checked={checked} onIonChange={onCheckboxClick(_id)} />}
    </IonItem>
  )
}

TransactionEntry.propTypes = {
  _id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  dateCreated: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func
}
