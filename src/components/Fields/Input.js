import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
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
      outline: 'none',
      borderRadius: 'var(--borderRadius)',
      background: 'var(--ion-color-light)',
      '&[disabled]': {
        opacity: 0.5
      },
      ...theme.fieldError
    },
    '& p': {
      marginLeft: theme.spacing(2),
      bottom: '102%',
      position: 'absolute',
      color: 'var(--gray4)'
    }
  }
}))

const useAutoFocus = ({ autoFocus, ref }) => {
  const ele = useRef(ref)

  useIonViewWillEnter(() => autoFocus && ele?.current?.focus?.())

  return ele
}

export const Input = forwardRef(({ className, onChange, onBlur, autoFocus, label, error, ...rest }, ref) => {
  const classes = useInputStyles(error)
  const element = useAutoFocus({ autoFocus, ref })
  return (
    <div className={classes.container}>
      <p variant="caption">{label}</p>
      <input ref={element} className={className} onBlur={onBlur} onChange={onChange} {...rest} />
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export const MaskedInput = forwardRef(
  ({ className, onChange, onBlur, format, value, label, autoFocus, error, ...rest }, ref) => {
    const classes = useInputStyles(error)
    const element = useAutoFocus({ autoFocus, ref })

    const _value = useMemo(() => format(value)[0], [format, value])

    const _onChange = useCallback(e => onChange(format(e.target.value)[1]), [onChange, format])

    return (
      <div className={classes.container}>
        <p variant="caption">{label}</p>
        <input ref={element} className={className} onBlur={onBlur} onChange={_onChange} value={_value} {...rest} />
      </div>
    )
  }
)

MaskedInput.displayName = 'MaskedInput'

MaskedInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  autoFocus: PropTypes.bool,
  error: PropTypes.object,
  format: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
