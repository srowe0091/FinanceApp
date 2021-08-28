import { useCallback, useContext } from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { SplashScreen } from '@capacitor/splash-screen'
import { useEffectOnce } from 'react-use'

import { AuthContext } from './context'
import { useAuthReducer } from './reducer'
import { StorageContainer } from 'lib/Capacitor'
import { useQuery } from 'hooks'
import routes from 'routes'
import { GetUser } from 'modules/user'

const checkErrors = response => {
  console.log('check errors')
  if (!response.ok) {
    throw response
  }
  return response.text()
}

const AppId = process.env.REACT_APP_ID

export const useInitializeAuth = () => {
  const [state, dispatch] = useAuthReducer()
  const client = useApolloClient()
  const history = useHistory()

  const handleGetUser = useCallback(async () => {
    try {
      const response = await client.query({ query: GetUser })
      const user = response?.data?.me || {}
      if ((!user.allowance || !user.income) && user.isAdmin) {
        return dispatch({ type: 'COMPLETE_PROFILE', payload: user })
      }
      dispatch({ type: 'SUCCESSFUL_LOGIN', payload: user })
      if (process.env.NODE_ENV !== 'development') {
        history.replace(routes.home)
      }
    } catch (err) {
      console.log(err)
    }
  }, [client, history, dispatch])

  const getCurrentSession = useCallback(async () => {
    const _sessionId = await StorageContainer.get('session')
    if (_sessionId.value) {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate/session`, {
        headers: { AppId, Authorization: _sessionId.value }
      })
        .then(checkErrors)
        .then(handleGetUser)
        .catch(() => dispatch({ type: 'STOP_LOADING' }))
    } else {
      dispatch({ type: 'STOP_LOADING' })
      history.replace(routes.login)
    }
    SplashScreen.hide()
  }, [dispatch, handleGetUser, history])

  useEffectOnce(() => {
    getCurrentSession()
  }, [])

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
        .then(handleGetUser),
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
  const { data = {} } = useQuery(GetUser, { path: 'me', fetchPolicy: 'cache-only' })
  return data
}
