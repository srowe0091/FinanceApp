import { useReducer } from 'react'

const initialState = {
  isLoading: true,
  isAuthenticated: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESSFUL_LOGIN':
      return Object.assign({}, state, { isLoading: false, isAuthenticated: true })
    case 'LOGOUT':
      return Object.assign({}, state, { isAuthenticated: false, isLoggingOut: false })
    case 'LOGGING_OUT':
      return Object.assign({}, state, { isLoggingOut: true })
    case 'STOP_LOADING':
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}

export const useAuthReducer = () => {
  return useReducer(reducer, initialState)
}
