import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { INVALID_CREDENTIALS, UNAUTHORIZED } from '@/constants/apolloUserStatus'
import { TOAST_TYPES } from '@/constants/toastTypes'
import i18n from '@/i18n/i18n'
import { toastMessage } from '@/utils/toastMessage'

import { authService } from './authService'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL
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
        toastMessage(i18n.t(message), TOAST_TYPES.error)
      }
      if (message === UNAUTHORIZED) {
        authService.clearStorage()
        toastMessage(i18n.t(message), TOAST_TYPES.error)
      }
    })
  }
  if (networkError) {
    toastMessage(i18n.t(networkError.message), TOAST_TYPES.error)
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})
