import { useCallback, useContext } from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { SplashScreen } from '@capacitor/splash-screen'
import { useEffectOnce } from 'react-use'

import { AuthContext } from './context'
import { checkErrors, checkUser } from './util'
import { useAuthReducer } from './reducer'
import { StorageContainer } from 'lib/Capacitor'
import { useQuery } from 'hooks'
import routes from 'routes'
import { GetUser } from 'modules/user'

const AppId = process.env.REACT_APP_ID

export const useInitializeAuth = () => {
  const [state, dispatch] = useAuthReducer()
  const client = useApolloClient()
  const history = useHistory()

  const handleGetUser = useCallback(async () => {
    try {
      const response = await client.query({ query: GetUser })
      const user = response?.data?.me || {}
      const accountIsValid = checkUser(user)
      if (accountIsValid) {
        if (process.env.NODE_ENV !== 'development') {
          history.replace(routes.home)
        }
      } else {
        history.replace(routes.updateAccount, { updateAccount: true })
      }
      dispatch({ type: 'SUCCESSFUL_LOGIN' })
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
      history.replace(routes.login)
      dispatch({ type: 'STOP_LOADING' })
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

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGGING_OUT' })
    StorageContainer.get('session')
      .then(_sessionId =>
        fetch(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
          method: 'DELETE',
          headers: { AppId, Authorization: _sessionId.value }
        })
      )
      .then(checkErrors)
      .finally(() => StorageContainer.remove('session'))
      .finally(() => dispatch({ type: 'LOGOUT' }))
      .finally(() => client.clearStore())
  }, [client, dispatch])

  return {
    ...state,
    handleLogin,
    handleLogout
  }
}

export const useAuthentication = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useContext(AuthContext)
  return {
    isAuthenticated,
    handleLogin,
    handleLogout
  }
}

export const useUser = () => {
  const { data = {} } = useQuery(GetUser, { path: 'me', fetchPolicy: 'cache-only' })
  return data
}
