import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { IonLoading } from '@ionic/react'

import { useInitializeAuth } from './hooks'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { isLoading, isLoggingOut, ...state } = useInitializeAuth()
  console.log(state)

  if (isLoading) return null

  return (
    <AuthContext.Provider value={state}>
      <IonLoading isOpen={isLoggingOut} message="Logging Out" />
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
