import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonItem, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react'
import { useToggle, useClickAway } from 'react-use'
import isFunction from 'lodash/fp/isFunction'

import { EditTransaction } from '../views/EditTransactionView'
import { formatDate, currency } from 'utils'
import { Modal, Tag } from 'components'

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
  id,
  amount,
  description,
  date,
  checked,
  group,
  card,
  onCheckboxClick,
  disableEdit
}) => {
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
  group: PropTypes.bool,
  card: PropTypes.object,
  onCheckboxClick: PropTypes.func,
  disableEdit: PropTypes.bool
}
