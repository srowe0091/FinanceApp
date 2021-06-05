import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { IonItem, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react'
import { useToggle, useClickAway } from 'react-use'
import isFunction from 'lodash/fp/isFunction'

import { EditTransaction } from '../views/EditTransactionView'
import { formatDate, currency } from 'utils'
import { Modal } from 'components'

const useTransactionStyles = createUseStyles(theme => ({
  transaction: {
    marginBottom: theme.spacing(2),
    overflow: 'auto',
    borderRadius: 'var(--borderRadius)',
    boxShadow: '0px 2px 5px -2px var(--black)'
  },
  label: {
    width: '100%',
    padding: theme.spacing(1, 0.5),
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
      width: '6px',
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

export const TransactionEntry = ({ id, amount, description, date, onCheckboxClick, checked, group, card }) => {
  const ref = useRef(null)
  const classes = useTransactionStyles()
  const [modalState, toggleModal] = useToggle(false)

  const closeSlide = useCallback(() => {
    if (isFunction(ref?.current?.closeOpened)) ref.current.closeOpened()
  }, [])

  const openEdit = useCallback(() => {
    closeSlide()
    toggleModal(true)
  }, [toggleModal, closeSlide])

  useClickAway(ref, () => {
    closeSlide()
  })

  return (
    <div className={classes.transaction}>
      <IonItemSliding ref={ref}>
        <IonItem color="medium" lines="none" className={clsx({ [classes.group]: group })}>
          <span className={classes.label}>
            <span className={classes.textSpacing}>
              <p wrap="break">{description || <span color="textSecondary">(blank)</span>}</p>
              <p color="textSecondary" variant="caption">
                {formatDate(date)}
              </p>
            </span>
            <span align="right">
              <p variant="subtitle1">{currency(amount)}</p>
            </span>
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

        <IonItemOptions side="end" onIonSwipe={openEdit}>
          <IonItemOption expandable onClick={openEdit}>
            Edit
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>

      <Modal isOpen={modalState} onClose={toggleModal}>
        <EditTransaction {...{ id, amount, date, group, description, card: card.id }} />
      </Modal>
    </div>
  )
}

TransactionEntry.propTypes = {
  id: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  checked: PropTypes.bool,
  onCheckboxClick: PropTypes.func,
  group: PropTypes.bool,
  card: PropTypes.object
}
