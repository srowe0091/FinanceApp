import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

export const FieldController = ({ name, component, ...rest }) => {
  const {
    field,
    fieldState: { error }
  } = useController({ name })
  return React.createElement(component, Object.assign(field, { error }, rest))
}

FieldController.propTypes = {
  name: PropTypes.string,
  component: PropTypes.elementType
}
