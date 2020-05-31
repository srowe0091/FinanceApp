import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { IonDatetime, IonItem, IonIcon } from '@ionic/react'

import { calendar } from 'ionicons/icons'

const useDatePickerStyles = createUseStyles({
  datePicker: {
    '--border-width': 0,
    '--min-height': '58px',
    width: '100%',
    marginBottom: 'var(--inputSpacing)',
    borderRadius: 'var(--borderRadius)',
    boxShadow: 'var(--boxShadow)'
  }
})

export const DatePicker = ({ onChange, ...props }) => {
  const classes = useDatePickerStyles()
  return (
    <IonItem color="medium" className={classes.datePicker}>
      <IonDatetime displayFormat="M/D/YYYY" onIonChange={onChange} {...props} />
      <IonIcon icon={calendar} slot="end" />
    </IonItem>
  )
}

DatePicker.propTypes = {
  onChange: PropTypes.func
}
