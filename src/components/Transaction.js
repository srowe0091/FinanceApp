import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { modalController } from '@ionic/core'
import {
  IonItem,
  IonLabel,
  IonCheckbox,
  IonModal,
  IonDatetime,
  IonIcon,
  IonFabButton,
  IonFab,
  IonText
} from '@ionic/react'
import { close } from 'ionicons/icons'
import { Formik } from 'formik'
import useToggle from 'react-use/lib/useToggle'

import { LongPress } from './LongPress'
import { Input, Button, Checkbox } from 'elements'
import { formatDate } from 'utils'
import { useUser } from 'modules/authentication'

const useEditTransactionStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    marginTop: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(2)
  }
}))

const EditTransaction = ({ id, description, group, createdAt }) => {
  const classes = useEditTransactionStyles()
  const { inGroup } = useUser()
  const loading = false
  const initialValues = useMemo(() => ({ description, group }), [description, group])
  return (
    <div className={classes.container}>
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton size="small" onClick={modalController.dismiss}>
          <IonIcon icon={close} />
        </IonFabButton>
      </IonFab>
      <IonText color="light">
        <h5 className={classes.header}>Edit Transaction</h5>
      </IonText>
      <Formik initialValues={initialValues}>
        {({ handleBlur, handleChange, isValid, values }) => (
          <form>
            <Input
              name="description"
              placeholder="memo"
              value={values.description || ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {inGroup && (
              <Checkbox
                color="medium"
                label="Group Purchase"
                name="group"
                checked={values.group}
                onChange={handleChange}
              />
            )}

            <IonItem>
              <IonDatetime displayFormat="M/D/YYYY" value={createdAt}></IonDatetime>
            </IonItem>
            <Button
              type="submit"
              size="small"
              className={classes.button}
              disabled={loading || !isValid}
              loading={loading}
            >
              Save
            </Button>
          </form>
        )}
      </Formik>{' '}
    </div>
  )
}

EditTransaction.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  group: PropTypes.bool,
  createdAt: PropTypes.string
}

const useTransactionStyles = createUseStyles(theme => ({
  transaction: {
    marginBottom: theme.spacing(2),
    borderRadius: 'var(--borderRadius)',
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
      zIndex: 5,
      backgroundColor: 'var(--ion-color-primary)'
    }
  },
  popover: {
    '--background': 'var(--ion-color-dark)'
  },
  textSpacing: {
    marginRight: theme.spacing(1)
  }
}))

export const TransactionEntry = ({ _id, amount, description, createdAt, onCheckboxClick, checked, group, card }) => {
  const classes = useTransactionStyles()
  const [popoverState, togglePoppover] = useToggle(false)

  return (
    <>
      <LongPress onTrigger={togglePoppover}>
        <IonItem color="medium" lines="none" className={clsx(classes.transaction, { [classes.group]: group })}>
          <IonLabel>
            <span className={classes.label}>
              <span className={classes.textSpacing}>
                <p wrap="break">{description || <span color="textSecondary">(blank)</span>}</p>
                <p color="textSecondary" variant="caption">
                  {formatDate(createdAt)}
                </p>
              </span>
              <span>
                <p>${(amount / 100).toFixed(2)}</p>
                <p color="textSecondary" variant="caption" align="right">
                  {card?.name}
                </p>
              </span>
            </span>
          </IonLabel>
          {onCheckboxClick && (
            <IonCheckbox
              slot="start"
              className={classes.checkbox}
              checked={checked}
              onIonChange={onCheckboxClick(_id)}
            />
          )}
        </IonItem>
      </LongPress>
      <IonModal isOpen={popoverState} onDidDismiss={togglePoppover} className={classes.popover}>
        <EditTransaction id={_id} amount={amount} description={description} group={group} createdAt={createdAt} />
      </IonModal>
    </>
  )
}

TransactionEntry.propTypes = {
  _id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func,
  group: PropTypes.bool,
  card: PropTypes.object
}
