import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import { useIonViewDidEnter, IonText } from '@ionic/react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginBottom: 'var(--inputSpacing)',

    '& input': {
      color: 'var(--gray8)',
      flex: 1,
      maxWidth: '100%',
      outline: 'none',
      padding: theme.spacing(1.5),
      borderRadius: 'var(--borderRadius)',
      background: 'var(--ion-color-light)',
      '&[disabled]': {
        opacity: 0.5
      },
      ...theme.field
    }
  },
  label: {
    flex: ({ labelWidth = 0.5 }) => labelWidth
  }
}))

const useAutoFocus = ({ autoFocus, ref }) => {
  const ele = useRef(ref)

  useIonViewDidEnter(() => autoFocus && ele?.current?.focus?.())

  return ele
}

export const Input = forwardRef(({ autoFocus, inlineLabel, error, color = 'dark', labelWidth, ...rest }, ref) => {
  const classes = useInputStyles({ error, labelWidth })
  const element = useAutoFocus({ autoFocus, ref })
  return (
    <div className={classes.container}>
      {inlineLabel && (
        <IonText variant="caption" className={classes.label} color={color}>
          {inlineLabel}
        </IonText>
      )}

      <input ref={element} {...rest} />
    </div>
  )
})

Input.displayName = 'Input'

Input.propTypes = {
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  error: PropTypes.object,
  color: PropTypes.string,
  inlineLabel: PropTypes.string,
  labelWidth: PropTypes.number
}

export const MaskedInput = forwardRef(({ onChange, format, value, ...rest }, ref) => {
  const _value = useMemo(() => format(value)[0], [format, value])

  const _onChange = useCallback(e => onChange(format(e.target.value)[1]), [onChange, format])

  return <Input ref={ref} onChange={_onChange} value={_value} {...rest} />
})

MaskedInput.displayName = 'MaskedInput'

MaskedInput.propTypes = {
  value: PropTypes.any,
  format: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
