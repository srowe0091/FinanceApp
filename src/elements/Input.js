import React from 'react'
import PropTypes from 'prop-types'
import { IonInput } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles(theme => ({
  input: {
    '--color': 'var(--white)',
    '--padding-end': theme.spacing(1.25),
    '--padding-start': theme.spacing(1.25),
    '--padding-top': theme.spacing(1.25),
    '--padding-bottom': theme.spacing(1.25),
    '--background': 'var(--alpha)',
    '--placeholder-color': 'var(--gray7)',
    borderRadius: 'var(--borderRadius)',
    marginBottom: theme.spacing(2)
  }
}))

export const Input = ({ onChange, onBlur, ...rest }) => {
  const classes = useInputStyles()
  return (
    <IonInput className={classes.input} onIonBlur={onBlur} onIonChange={onChange} {...rest} />
  )
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
