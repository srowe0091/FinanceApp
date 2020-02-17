import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { IonInput } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  input: {
    '--color': 'var(--white)',
    '--padding-end': theme.spacing(1.25),
    '--padding-start': theme.spacing(1.25),
    '--padding-top': theme.spacing(1.25),
    '--padding-bottom': theme.spacing(1.25),
    '--background': 'var(--alpha5)',
    '--placeholder-color': 'var(--gray7)',
    borderRadius: 'var(--borderRadius)',
    marginBottom: theme.spacing(2)
  }
}))

export const Input = ({ className, onChange, onBlur, ...rest }) => {
  const classes = useInputStyles()
  return (
    <IonInput className={clsx(className, classes.input)} onIonBlur={onBlur} onIonChange={onChange} {...rest} />
  )
}

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
