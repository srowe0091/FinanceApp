import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import map from 'lodash/fp/map'

const useSelectStyles = createUseStyles(theme => ({
  select: {
    '--border-width': 0,
    width: '100%',
    marginBottom: 'var(--inputSpacing)',
    borderRadius: 'var(--borderRadius)',
    boxShadow: 'var(--boxShadow)',
    ...theme.fieldError
  },
  actionSheet: {
    '--max-height': '300px'
  }
}))

export const Select = forwardRef(
  ({ className, label, name, onChange, value, options, error, type = 'action-sheet', ...rest }, ref) => {
    const classes = useSelectStyles(error)
    return (
      <IonItem color="light" className={clsx(classes.select, className)}>
        <IonLabel>{label}</IonLabel>
        <IonSelect
          ref={ref}
          name={name}
          value={value}
          interface={type}
          onIonChange={onChange}
          interfaceOptions={{ className: classes.actionSheet }}
          {...rest}
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
)

Select.displayName = 'Select'

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
}
