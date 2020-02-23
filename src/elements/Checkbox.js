import React from 'react'
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

export const Checkbox = ({ label, onChange, ...rest }) => {
  const classes = useCheckboxStyle()
  return (
    <IonItem lines="none" className={classes.item} color="dark">
      <IonLabel>{label}</IonLabel>
      <IonCheckbox type="checkbox" slot="start" className={classes.checkbox} onIonChange={onChange} {...rest} />
    </IonItem>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}