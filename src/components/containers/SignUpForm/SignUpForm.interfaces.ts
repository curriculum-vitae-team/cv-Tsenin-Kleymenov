import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'

import { ISignupResult } from '@/graphql/auth/authResult.interfaces'

export interface ISignUpFormProps {
  signup: (
    options?:
      | MutationFunctionOptions<ISignupResult, OperationVariables, DefaultContext, ApolloCache<unknown>>
  ) => Promise<FetchResult<ISignupResult, Record<string, unknown>, Record<string, unknown>>>
}
