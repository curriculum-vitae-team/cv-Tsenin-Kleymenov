import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { UNAUTHORIZED } from '@/constants/apolloUserStatus'

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
      console.error(message)
      if (message === UNAUTHORIZED) {
        authService.clearStorage()
      }
    })
  }
  if (networkError) {
    console.error(networkError)
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})