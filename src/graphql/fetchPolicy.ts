import { WatchQueryFetchPolicy } from '@apollo/client'

interface IFetchPolicy {
  [key: string]: WatchQueryFetchPolicy
}

export const FETCH_POLICY: IFetchPolicy = {
  networkOnly: 'network-only',
  cacheOnly: 'cache-only'
}
