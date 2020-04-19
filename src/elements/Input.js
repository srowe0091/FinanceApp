import React, { useCallback, useMemo, useRef } from 'react'
import { useIonViewWillEnter } from '@ionic/react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  input: {
    flex: 'none',
    width: '100%',
    color: 'var(--white)',
    outline: 'none',
    border: 'none',
    background: 'var(--black)',
    padding: theme.spacing(1.25),
    borderRadius: 'var(--borderRadius)',
    marginBottom: theme.spacing(2),
    '&::placeholder': {
      color: 'var(--gray7)',
      opacity: 0.5
    },
    '&[disabled]': {
      color: 'var(--gray7)',
      backgroundColor: 'var(--alpha25)'
    }
  }
}))

const useAutoFocus = autoFocus => {
  const ele = useRef(null)

  useIonViewWillEnter(() => autoFocus && ele?.current?.focus?.())

  return ele
}

export const Input = ({ className, onChange, onBlur, autoFocus, ...rest }) => {
  const classes = useInputStyles()
  const element = useAutoFocus(autoFocus)
  return <input ref={element} className={clsx(className, classes.input)} onBlur={onBlur} onChange={onChange} {...rest} />
}

Input.propTypes = {
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export const MaskedInput = ({ className, onChange, onBlur, format, value, autoFocus, ...rest }) => {
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
    <input ref={element} className={clsx(className, classes.input)} onBlur={onBlur} onChange={_onChange} value={_value} {...rest} />
  )
}

MaskedInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  autoFocus: PropTypes.bool,
  format: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
