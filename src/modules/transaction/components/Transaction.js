import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { IonItem, IonLabel, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react'
import useToggle from 'react-use/lib/useToggle'
import useClickAway from 'react-use/lib/useClickAway'

import { EditTransaction } from '../views/EditTransactionView'
import { formatDate } from 'utils'
import isFunction from 'lodash/fp/isFunction'

const useTransactionStyles = createUseStyles(theme => ({
  transaction: {
    marginBottom: theme.spacing(2),
    overflow: 'auto',
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
  textSpacing: {
    marginRight: theme.spacing(1)
  }
}))

export const TransactionEntry = ({ _id, amount, description, date, onCheckboxClick, checked, group, card }) => {
  const ref = useRef(null)
  const classes = useTransactionStyles()
  const [popoverState, togglePoppover] = useToggle(false)

  const closeSlide = useCallback(() => {
    if (isFunction(ref?.current?.closeOpened)) ref.current.closeOpened()
  }, [])

  const openEdit = useCallback(() => {
    closeSlide()
    togglePoppover(true)
  }, [togglePoppover, closeSlide])

  useClickAway(ref, () => {
    closeSlide()
  })

  return (
    <div className={classes.transaction}>
      <IonItemSliding ref={ref}>
        <IonItem color="medium" lines="none" className={clsx({ [classes.group]: group })}>
          <IonLabel>
            <span className={classes.label}>
              <span className={classes.textSpacing}>
                <p wrap="break">{description || <span color="textSecondary">(blank)</span>}</p>
                <p color="textSecondary" variant="caption">
                  {formatDate(date)}
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

        <IonItemOptions side="end" onIonSwipe={openEdit}>
          <IonItemOption expandable onClick={openEdit}>
            Edit
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>

      <EditTransaction
        id={_id}
        isOpen={popoverState}
        onClose={togglePoppover}
        amount={amount}
        date={date}
        group={group}
        description={description}
      />
    </div>
  )
}

TransactionEntry.propTypes = {
  _id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func,
  group: PropTypes.bool,
  card: PropTypes.object
}
