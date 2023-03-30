import { LazyQueryExecFunction, OperationVariables } from '@apollo/client'

import { ILoginResult } from '@/graphql/auth/authResult.interfaces'

export interface ILoginFormProps {
  login: LazyQueryExecFunction<ILoginResult, OperationVariables>
}

export enum FORM_LOGIN_KEYS {
  email = 'email',
  password = 'password'
}
