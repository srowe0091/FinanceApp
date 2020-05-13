import ApolloClient from 'apollo-boost'
import some from 'lodash/fp/some'

import { StorageContainer } from 'utils'
import routes from 'routes'

export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  request: async operation => {
    const sessiodId = await StorageContainer.get('session')
    operation.setContext({
      headers: {
        Authorization: sessiodId.value
      }
    })
  },
  onError: ({ graphQLErrors }) => {
    const isLoggedOut = some(['extensions.code', 'UNAUTHENTICATED'])(graphQLErrors)
    if (isLoggedOut) {
      return (window.location.href = routes.login)
    }
    // TODO: handle automatic renewal of sessions
  }
})
