import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  input: {
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

export const Input = ({ className, onChange, onBlur, ...rest }) => {
  const classes = useInputStyles()
  return <input className={clsx(className, classes.input)} onBlur={onBlur} onChange={onChange} {...rest} />
}

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export const MaskedInput = ({ className, onChange, onBlur, format, value, ...rest }) => {
  const classes = useInputStyles()

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
    <input className={clsx(className, classes.input)} onBlur={onBlur} onChange={_onChange} value={_value} {...rest} />
  )
}

MaskedInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  format: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
