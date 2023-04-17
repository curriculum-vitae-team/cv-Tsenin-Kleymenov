import { useTranslation } from 'react-i18next'
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { INVALID_CREDENTIALS, UNAUTHORIZED } from '@/constants/apolloUserStatus'
import { TOAST_TYPES } from '@/constants/toastTypes'
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
  const { t } = useTranslation()

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === INVALID_CREDENTIALS) {
        toastMessage(t(message), TOAST_TYPES.error)
      }
      if (message === UNAUTHORIZED) {
        authService.clearStorage()
        toastMessage(t(message), TOAST_TYPES.error)
      }
    })
  }
  if (networkError) {
    toastMessage(t(networkError.message), TOAST_TYPES.error)
  }
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache()
})
