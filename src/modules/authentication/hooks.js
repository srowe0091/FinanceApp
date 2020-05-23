import { useCallback, useContext, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

import { AuthContext } from './context'
import { useAuthReducer } from './reducer'
import { StorageContainer } from 'lib/Capacitor'
import { GetUser } from 'modules/user'

const checkErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response.text()
}

const AppId = process.env.REACT_APP_ID

export const useInitializeAuth = () => {
  const [state, dispatch] = useAuthReducer()
  const client = useApolloClient()

  const handleGetUser = useCallback(async () => {
    try {
      const response = await client.query({ query: GetUser })
      const user = response?.data?.me || {}
      if (!user.allowance) {
        dispatch({ type: 'COMPLETE_PROFILE', payload: user })
        return
      }
      dispatch({ type: 'LOGIN', payload: user })
    } catch (err) {
      console.log(err)
    }
  }, [client, dispatch])

  const getCurrentSession = useCallback(async () => {
    const _sessionId = await StorageContainer.get('session')
    if (_sessionId.value) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate/session`, {
        headers: { AppId, Authorization: _sessionId.value }
      })
        .then(checkErrors)
        .then(handleGetUser)
        .catch(() => dispatch({ type: 'STOP_LOADING' }))
    } else {
      dispatch({ type: 'STOP_LOADING' })
    }
  }, [dispatch, handleGetUser])

  useEffect(() => {
    getCurrentSession()
  }, [getCurrentSession])

  const handleLogin = useCallback(
    (email, password) =>
      fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          AppId,
          'Content-Type': 'application/json'
        }
      })
        .then(checkErrors)
        .then(res => {
          const { session } = JSON.parse(res)
          return StorageContainer.set('session', session)
        })
        .then(() => handleGetUser()),
    [handleGetUser]
  )

  const handleLogout = useCallback(
    async () =>
      StorageContainer.get('session')
        .then(_sessionId =>
          fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
            method: 'DELETE',
            headers: { AppId, Authorization: _sessionId.value }
          })
        )
        .then(checkErrors)
        .then(() => client.clearStore())
        .then(() => StorageContainer.remove('session'))
        .then(() => dispatch({ type: 'LOGOUT' })),
    [client, dispatch]
  )

  const finishProfile = useCallback(data => dispatch({ type: 'FINISHED_PROFILE', payload: data }), [dispatch])

  return {
    ...state,
    handleLogin,
    handleLogout,
    finishProfile
  }
}

export const useAuthentication = () => {
  const { isAuthenticated, handleLogin, handleLogout, finishProfile, requireProfileUpdate } = useContext(AuthContext)
  return {
    isAuthenticated,
    handleLogin,
    handleLogout,
    finishProfile,
    requireProfileUpdate
  }
}

export const useUser = () => {
  const { user } = useContext(AuthContext)
  return user
}
