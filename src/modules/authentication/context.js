import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import { useInitializeAuth } from './hooks'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { isLoading, ...state } = useInitializeAuth()

  if (isLoading) return null

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
