import { useCallback, useContext } from 'react'
import useToggle from 'react-use/lib/useToggle'

import { AuthContext } from './context'

const checkErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response.text()
}


export const useInitializeAuth = () => {
  const [isLoading, handleLoading] = useToggle(false)
  const [isAuthenticated, handleAuthentication] = useToggle(false)

  const handleLogin = useCallback(
    (email, password) =>
      fetch('http://localhost:9000/authenticate', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(checkErrors)
      .then(sessionId => {
        localStorage.setItem('session', sessionId)
        handleAuthentication()
      }),
    [handleAuthentication]
  )

  const handleLogout = useCallback(
    () => {
      fetch('http://localhost:9000/authenticate', {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('session') }
      })
        .then(checkErrors)
        .then(() => {
          localStorage.removeItem('session')
          handleAuthentication()
        })
    },
    [handleAuthentication]
  )

  return {
    isLoading,
    isAuthenticated,
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
