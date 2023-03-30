import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables
} from '@apollo/client'

import { ISignUpResult } from '@/graphql/auth/authResult.interfaces'

export interface ISignUpFormProps {
  signUp: (
    options?: MutationFunctionOptions<
      ISignUpResult,
      OperationVariables,
      DefaultContext,
      ApolloCache<unknown>
    >
  ) => Promise<FetchResult<ISignUpResult, Record<string, unknown>, Record<string, unknown>>>
}

export enum FORM_SIGNUP_KEYS {
  email = 'email',
  password = 'password'
}
