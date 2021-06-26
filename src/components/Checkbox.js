import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IonCheckbox, IonItem, IonLabel } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useCheckboxStyle = createUseStyles(theme => ({
  item: {
    display: 'inline-block',
    '--background': 'transparent'
  },
  checkbox: {
    marginRight: theme.spacing(2)
  }
}))

export const Checkbox = ({ label, onChange, color, ...rest }) => {
  const classes = useCheckboxStyle()
  const handleChange = useCallback(
    e => {
      onChange({
        target: {
          name: e.target.name,
          value: e.target.checked
        }
      })
    },
    [onChange]
  )
  return (
    <IonItem lines="none" className={classes.item} color="transparent">
      <IonLabel>{label}</IonLabel>
      <IonCheckbox type="checkbox" slot="start" className={classes.checkbox} onIonChange={handleChange} {...rest} />
    </IonItem>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.string
}
