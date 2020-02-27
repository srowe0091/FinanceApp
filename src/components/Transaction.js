import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonItem, IonLabel, IonCheckbox, IonPopover, IonDatetime } from '@ionic/react'
import { Formik } from 'formik'
import useToggle from 'react-use/lib/useToggle'

import { Input, Button, Checkbox } from 'elements'
import { formatDate } from 'utils/normalizer'
import { LongPress } from './LongPress'

const useEditTransactionStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    background: 'var(--themeGray1)'
  },
  button: {
    marginTop: theme.spacing(2)
  }
}))

const EditTransaction = ({ id, description, amount, createdAt }) => {
  const classes = useEditTransactionStyles()
  const loading = false
  const initialValues = useMemo(() => ({ description, amount }), [description, amount])
  return (
    <Formik initialValues={initialValues}>
      {({ handleBlur, handleChange, isValid, values }) => (
        <form className={classes.container}>
          <Input name="description" placeholder="memo" value={values.description || ''} onBlur={handleBlur} onChange={handleChange} />
          <IonItem>
            <IonDatetime displayFormat="M/D/YYYY" value={createdAt}></IonDatetime>
          </IonItem>
          <Button type="submit" size="small" className={classes.button} disabled={loading || !isValid} loading={loading}>Save</Button>
        </form>
      )}
    </Formik>
  )
}

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

export const TransactionEntry = ({ id, amount, description, createdAt, onCheckboxClick, checked }) => {
  const classes = useTransactionStyles()
  const [popoverState, togglePoppover] = useToggle(false)

  return (
    <>
      <LongPress onTrigger={togglePoppover}>
        <IonItem button className={classes.transaction}>
          <IonLabel color="light">
            <span className={classes.label}>
              <span>
                <p>{description}</p>
                <p color="textSecondary" variant="caption">{formatDate(createdAt)}</p>
              </span>
              <p>${(amount / 100).toFixed(2)}</p>
            </span>
          </IonLabel>
          {onCheckboxClick && <IonCheckbox slot="start" className={classes.checkbox} checked={checked} onIonChange={onCheckboxClick(id)} />}
        </IonItem>
      </LongPress>
      <IonPopover isOpen={popoverState} onDidDismiss={togglePoppover}>
        <EditTransaction id={id} amount={amount} description={description} createdAt={createdAt} />
      </IonPopover>
    </>
  )
}

TransactionEntry.propTypes = {
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func
}
