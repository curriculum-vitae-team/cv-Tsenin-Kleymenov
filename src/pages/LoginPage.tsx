import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import { AuthFormContainer } from '@/components/containers/AuthFormContainer/AuthFormContainer'
import { SignInForm } from '@/components/containers/LoginForm/LoginForm'
import { Button } from '@/components/views/Button/Button'
import { LOGIN } from '@/graphql/auth/authQuery'
import { ILoginResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const LoginPage: FC = () => {
  const { t } = useTranslation()
  const [login] = useLazyQuery<ILoginResult>(LOGIN)

  return (
    <AuthFormContainer title={t('Welcome back')} subtitle={t('Hello again! Sign in to continue.')}>
      <SignInForm login={login} />
      <Button component={Link} to={`/${AppNavigationRoutes.SIGN_UP}`} variant="text">
        I don't have an account yet
      </Button>
    </AuthFormContainer>
  )
}
