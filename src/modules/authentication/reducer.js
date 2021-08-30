import { useReducer } from 'react'
import pick from 'lodash/fp/pick'

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  requireProfileUpdate: false,
  user: {}
}

const sessionProps = pick(['email', 'isAdmin', 'inGroup', 'allowance', 'income', 'defaultCard.id'])

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESSFUL_LOGIN':
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: true,
        user: sessionProps(action.payload)
      })
    case 'LOGOUT':
      return Object.assign({}, state, { isAuthenticated: false, isLoggingOut: false, user: {} })
    case 'LOGGING_OUT':
      return Object.assign({}, state, { isLoggingOut: true })
    case 'STOP_LOADING':
      return Object.assign({}, state, { isLoading: false })
    case 'COMPLETE_PROFILE':
      return Object.assign({}, state, {
        isLoading: false,
        requireProfileUpdate: true,
        user: sessionProps(action.payload)
      })
    case 'FINISHED_PROFILE':
      return Object.assign({}, state, {
        requireProfileUpdate: false,
        isAuthenticated: true
      })
    default:
      return state
  }
}

export const useAuthReducer = () => {
  return useReducer(reducer, initialState)
}
