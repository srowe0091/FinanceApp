import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import map from 'lodash/fp/map'

const useSelectStyles = createUseStyles(theme => ({
  select: {
    '--min-height': '38px',
    marginBottom: theme.spacing(2),
    borderRadius: 'var(--borderRadius)'
  },
  actionSheet: {
    '--max-height': '300px'
  }
}))

export const Select = ({ className, label, name, onChange, value, options }) => {
  const classes = useSelectStyles()
  return (
    <IonItem color="medium" className={clsx(classes.select, className)}>
      <IonLabel>{label}</IonLabel>
      <IonSelect
        name={name}
        value={value}
        interface="action-sheet"
        onIonChange={onChange}
        interfaceOptions={{ className: classes.actionSheet }}
      >
        {map(o => (
          <IonSelectOption key={o.value} value={o.value}>
            {o.label}
          </IonSelectOption>
        ))(options)}
      </IonSelect>
    </IonItem>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
}
