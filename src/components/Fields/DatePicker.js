import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonDatetime, IonItem, IonIcon } from '@ionic/react'

import { calendar } from 'ionicons/icons'

const useDatePickerStyles = createUseStyles({
  datePicker: {
    '--border-width': 0,
    width: '100%',
    marginBottom: 'var(--inputSpacing)',
    borderRadius: 'var(--borderRadius)',
    boxShadow: 'var(--boxShadow)'
  }
})

export const DatePicker = forwardRef(({ onChange, ...props }, ref) => {
  const classes = useDatePickerStyles()
  return (
    <IonItem color="light" className={classes.datePicker}>
      <IonDatetime ref={ref} displayFormat="M/D/YYYY" onIonChange={onChange} {...props} />
      <IonIcon icon={calendar} slot="end" />
    </IonItem>
  )
})

DatePicker.displayName = 'DatePicker'

DatePicker.propTypes = {
  onChange: PropTypes.func
}
