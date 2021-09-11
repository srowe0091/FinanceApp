import React from 'react'

export const ConditionalWrapper = ({ children, wrapper, condition, ...props }) => {
  if (condition) {
    return React.createElement(wrapper, props, children)
  }
  return children
}
