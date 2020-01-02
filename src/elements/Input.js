import React from 'react'
import PropTypes from 'prop-types'
import { IonInput } from '@ionic/react'
import { createUseStyles } from 'react-jss'

const useInputStyles = createUseStyles({
  input: {
    '--color': 'var(--white)',
    '--padding-end': '10px',
    '--padding-start': '10px',
    '--padding-top': '10px',
    '--padding-bottom': '10px',
    '--background': 'var(--alpha)',
    '--placeholder-color': 'var(--gray7)',
    marginBottom: 10
  }
})

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
