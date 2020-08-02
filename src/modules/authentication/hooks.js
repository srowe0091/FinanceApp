import { useCallback, useContext, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from './context'
import { useAuthReducer } from './reducer'
import { StorageContainer } from 'lib/Capacitor'
import { UserFragment } from 'modules/user'
import { PreferenceFragment } from 'modules/preferences'

const checkErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response.text()
}

const InitQuery = gql`
  query InitQuery {
    me {
      ...UserFragment
    }
    preferences {
      ...PreferenceFragment
    }
  }
  ${UserFragment}
  ${PreferenceFragment}
`

const AppId = process.env.REACT_APP_ID

export const useInitializeAuth = () => {
  const [state, dispatch] = useAuthReducer()
  const client = useApolloClient()

  const handleGetUser = useCallback(async () => {
    try {
      const response = await client.query({ query: InitQuery })
      const user = response?.data?.me || {}
      const preferences = response?.data?.preferences || {}
      if ((!preferences.allowance || !preferences.income) && user.isAdmin) {
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

  const finishProfile = useCallback(data => dispatch({ type: 'FINISHED_PROFILE' }), [dispatch])

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
