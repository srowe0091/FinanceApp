import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import { useInitializeAuth } from './hooks'
import { FullPageLoader } from 'components'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { isLoading, ...state } = useInitializeAuth()
  if (isLoading) {
    return <FullPageLoader />
  }
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
