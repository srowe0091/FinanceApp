import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react'
import { createUseStyles } from 'react-jss'
import map from 'lodash/fp/map'

const useSelectStyles = createUseStyles({
  select: {
    '--border-width': 0,
    width: '100%',
    marginBottom: 'var(--inputSpacing)',
    borderRadius: 'var(--borderRadius)',
    boxShadow: 'var(--boxShadow)'
  },
  actionSheet: {
    '--max-height': '300px'
  }
})

export const Select = forwardRef(
  ({ className, label, name, onChange, value, options, type = 'action-sheet', ...rest }, ref) => {
    const classes = useSelectStyles()
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
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
}
