import React from 'react'
import PropTypes from 'prop-types'
import useLongPress from 'react-use/lib/useLongPress'

const defaultOptions = {
  delay: 500
}

export const LongPress = ({ children, onTrigger }) => {
  const longPressEvent = useLongPress(onTrigger, defaultOptions)
  return (
    <div {...longPressEvent}>
      {children}
    </div>
  )
}

LongPress.propTypes = {
  children: PropTypes.node,
  onTrigger: PropTypes.func.isRequired
}