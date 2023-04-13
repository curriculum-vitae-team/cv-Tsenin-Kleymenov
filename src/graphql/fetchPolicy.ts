import { WatchQueryFetchPolicy } from '@apollo/client'
import { MutationFetchPolicy } from '@apollo/client/core/watchQueryOptions'

interface IFetchPolicy {
  [key: string]: WatchQueryFetchPolicy
}

export const FETCH_POLICY: IFetchPolicy = {
  networkOnly: 'network-only',
  cacheOnly: 'cache-only',
  noCache: 'no-cache'
}

interface IMutationFetchPolicy {
  [key: string]: MutationFetchPolicy
}

export const MUTATION_FETCH_POLICY: IMutationFetchPolicy = {
  networkOnly: 'network-only'
}
