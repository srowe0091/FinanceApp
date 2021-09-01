import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonItem, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption, useIonViewDidLeave } from '@ionic/react'
import isFunction from 'lodash/fp/isFunction'

import { formatDate, currency } from 'utils'
import { Tag } from 'components'
import routes from 'routes'

const useTransactionStyles = createUseStyles(theme => ({
  wrapper: {
    marginBottom: theme.spacing(2),
    overflow: 'auto',
    borderRadius: 'var(--borderRadius)',
    boxShadow: theme.boxShadow('--alpha10')
  },
  transaction: {
    width: '100%',
    padding: theme.spacing(0.7, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkbox: {
    marginRight: theme.spacing(2)
  },
  headerSpacing: {
    marginBottom: theme.spacing(0.5)
  }
}))

export const TransactionEntry = ({
  history,
  disableEdit,
  id,
  amount,
  description,
  date,
  checked,
  group,
  onCheckboxClick
}) => {
  const ref = useRef(null)
  const classes = useTransactionStyles()

  const closeSlide = useCallback(() => {
    if (isFunction(ref?.current?.closeOpened)) ref.current.closeOpened()
  }, [])

  const openEdit = useCallback(() => {
    closeSlide()
    history.push(routes.editTransaction(id))
  }, [history, id, closeSlide])

  useIonViewDidLeave(() => closeSlide())

  return (
    <div className={classes.wrapper}>
      <IonItemSliding ref={ref}>
        <IonItem lines="none">
          <span className={classes.transaction}>
            <span>
              <h6 className={classes.headerSpacing} variant="subtitle1" wrap="break">
                {description || <span color="textSecondary">(blank)</span>}
              </h6>
              <div>
                <span color="textSecondary" variant="caption">
                  {formatDate(date)} &nbsp;&nbsp;&nbsp;
                </span>
                {group && <Tag label="Group" />}
              </div>
            </span>
            <h5>
              <strong>{currency(amount)}</strong>
            </h5>
          </span>
          {onCheckboxClick && (
            <IonCheckbox
              slot="start"
              className={classes.checkbox}
              checked={checked}
              onIonChange={onCheckboxClick(id)}
            />
          )}
        </IonItem>

        {!disableEdit && (
          <IonItemOptions side="end" onIonSwipe={openEdit}>
            <IonItemOption expandable onClick={openEdit}>
              Edit
            </IonItemOption>
          </IonItemOptions>
        )}
      </IonItemSliding>
    </div>
  )
}

TransactionEntry.propTypes = {
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  checked: PropTypes.bool,
  group: PropTypes.bool,
  onCheckboxClick: PropTypes.func,
  disableEdit: PropTypes.bool,
  history: PropTypes.object
}
