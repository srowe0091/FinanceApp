import { useState, useCallback, useContext, useEffect } from 'react'
import set from 'lodash/fp/set'

import { AuthContext } from './context'

const checkErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response.text()
}

export const useInitializeAuth = () => {
  const [state, handleState] = useState({ isLoading: true, isAuthenticated: false })

  useEffect(() => {
    const _sessionId = localStorage.getItem('session')
    if (_sessionId) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate/session`, {
        headers: { Authorization: _sessionId }
      })
        .then(checkErrors)
        .then(() => handleState({ isLoading: false, isAuthenticated: true }))
        .catch(() => handleState(set('isLoading')(false)))
    } else {
      handleState(set('isLoading')(false))
    }
  }, [])

  console.log(state)

  const handleLogin = useCallback(
    (email, password) =>
      fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(checkErrors)
      .then(sessionId => {
        localStorage.setItem('session', sessionId)
        handleState({ isLoading: false, isAuthenticated: true })
      }),
    []
  )

  const handleLogout = useCallback(
    () =>
      fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('session') }
      })
      .then(checkErrors)
      .then(() => {
        localStorage.removeItem('session')
        handleState(set('isAuthenticated')(false))
      }),
    []
  )

  return {
    ...state,
    handleLogin,
    handleLogout
  }
}

export const useAuthentication = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useContext(AuthContext)
  return { isAuthenticated, handleLogin, handleLogout }
}

export const useUser = () => {
  // const { isAuthenticated } = useContext(AuthContext)
  // const user = useMemo(() => {
  //   if (isAuthenticated) {
  //     const _userAttribute = Parse.User.current()
  //     return {
  //       email: _userAttribute.get('email'),
  //       isAdmin: _userAttribute.get('isAdmin'),
  //       dueDate: _userAttribute.get('dueDate'),
  //       allowance: _userAttribute.get('allowance')
  //     }
  //   }
  //   return null
  // }, [isAuthenticated])
  // return user
}
