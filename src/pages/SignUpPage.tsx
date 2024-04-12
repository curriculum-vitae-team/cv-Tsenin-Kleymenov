import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SignUpForm } from '@/components/containers/SignUpForm/SignUpForm'
import { AuthFormContainer } from '@/components/views/AuthFormContainer/AuthFormContainer'
import { Button } from '@/components/views/Button/Button'
import { SIGN_UP } from '@/graphql/auth/authMutation'
import { ISignUpResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const SignUpPage: FC = () => {
  const [signUp] = useMutation<ISignUpResult>(SIGN_UP)

  const { t } = useTranslation()

  return (
    <AuthFormContainer title={t('registerNow')} subtitle={t('welcomeSignUp')}>
      <SignUpForm signUp={signUp} />
      <Button component={Link} to={`/${AppNavigationRoutes.LOGIN}`} variant="text">
        {t('haveAccount')}
      </Button>
    </AuthFormContainer>
  )
}
