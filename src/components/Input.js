import React, { useCallback, useMemo, useRef } from 'react'
import { useIonViewWillEnter } from '@ionic/react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  container: {
    position: 'relative',
    width: '100%',
    '& input': {
      color: 'var(--gray8)',
      width: '100%',
      padding: theme.spacing(2, 2.5),
      marginBottom: 'var(--inputSpacing)',
      flex: 'none',
      border: 'none',
      outline: 'none',
      boxShadow: 'var(--boxShadow)',
      borderRadius: 'var(--borderRadius)',
      background: 'var(--ion-color-light)',

      '&[disabled]': {
        opacity: 0.5
      }
    },
    '& p': {
      marginLeft: theme.spacing(2),
      bottom: '102%',
      position: 'absolute',
      color: 'var(--gray4)'
    }
  }
}))

const useAutoFocus = autoFocus => {
  const ele = useRef(null)

  useIonViewWillEnter(() => autoFocus && ele?.current?.focus?.())

  return ele
}

export const Input = ({ className, onChange, onBlur, autoFocus, label, ...rest }) => {
  const classes = useInputStyles()
  const element = useAutoFocus(autoFocus)
  return (
    <div className={classes.container}>
      <p variant="caption">
        {label}
      </p>
      <input ref={element} className={className} onBlur={onBlur} onChange={onChange} {...rest} />
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export const MaskedInput = ({ className, onChange, onBlur, format, value, autoFocus, label, ...rest }) => {
  const classes = useInputStyles()
  const element = useAutoFocus(autoFocus)

  const _value = useMemo(() => format(value)[0], [format, value])

  const _onChange = useCallback(
    e => {
      const _val = format(e.target.value)[1]
      e.target.value = _val
      onChange(e)
    },
    [onChange, format]
  )

  return (
    <div className={classes.container}>
      <p variant="caption">
        {label}
      </p>
      <input ref={element} className={className} onBlur={onBlur} onChange={_onChange} value={_value} {...rest} />
    </div>
  )
}

MaskedInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  autoFocus: PropTypes.bool,
  format: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
