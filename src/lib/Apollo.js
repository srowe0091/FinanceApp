import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

import { StorageContainer } from 'lib/Capacitor'
import routes from 'routes'

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SERVER_URL}/graphql` })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      const isLoggedOut = extensions?.code === 'UNAUTHENTICATED'
      if (isLoggedOut) {
        return (window.location.href = routes.login)
      }
    })
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext(async (_, { headers }) => {
  const sessiodId = await StorageContainer.get('session')
  return {
    headers: {
      ...headers,
      Authorization: sessiodId.value,
      AppId: process.env.REACT_APP_ID
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, errorLink, httpLink])
})
