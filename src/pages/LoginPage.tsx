import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import { SignInForm } from '@/components/containers/LoginForm/LoginForm'
import { AuthFormContainer } from '@/components/views/AuthFormContainer/AuthFormContainer'
import { Button } from '@/components/views/Button/Button'
import { LOGIN } from '@/graphql/auth/authQuery'
import { ILoginResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const LoginPage: FC = () => {
  const [login] = useLazyQuery<ILoginResult>(LOGIN)

  const { t } = useTranslation()

  return (
    <AuthFormContainer title={t('welcomeBack')} subtitle={t('helloSignIn')}>
      <SignInForm login={login} />
      <Button component={Link} to={`/${AppNavigationRoutes.SIGN_UP}`} variant="text">
        {t('noAccountYet')}
      </Button>
    </AuthFormContainer>
  )
}
