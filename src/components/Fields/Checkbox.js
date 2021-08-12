import React, { forwardRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonCheckbox, IonItem, IonLabel } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useCheckboxStyle = createUseStyles(theme => ({
  checkbox: {
    marginRight: theme.spacing(2)
  }
}))

export const Checkbox = forwardRef(({ label, value, onChange, ...rest }, ref) => {
  const classes = useCheckboxStyle()
  const handleChange = useCallback(e => onChange(e.target.checked), [onChange])

  return (
    <IonItem ref={ref} lines="none" color="transparent">
      <IonLabel>{label}</IonLabel>
      <IonCheckbox
        slot="start"
        type="checkbox"
        className={classes.checkbox}
        onIonChange={handleChange}
        checked={value}
        {...rest}
      />
    </IonItem>
  )
})

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
}
