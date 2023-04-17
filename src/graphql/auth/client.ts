import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { INVALID_CREDENTIALS, UNAUTHORIZED } from '@/constants/apolloUserStatus'
import { toastMessage } from '@/utils/toastMessage'

import { authService } from './authService'

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API_URL
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${authService.access_token$()}`
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === INVALID_CREDENTIALS) {
        toastMessage(message, 'error')
      }
      if (message === UNAUTHORIZED) {
        authService.clearStorage()
        toastMessage(message, 'error')
      }
    })
  }
  if (networkError) {
    toastMessage(networkError.message, 'error')
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})
