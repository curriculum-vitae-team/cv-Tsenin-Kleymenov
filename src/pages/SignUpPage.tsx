import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { AuthFormContainer } from '@/components/containers/AuthFormContainer/AuthFormContainer'
import { SignUpForm } from '@/components/containers/SignUpForm/SignUpForm'
import { Button } from '@/components/views/Button/Button'
import { SIGN_UP } from '@/graphql/auth/authMutation'
import { ISignUpResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

export const SignUpPage: FC = () => {
  const [signUp] = useMutation<ISignUpResult>(SIGN_UP)
  const { t } = useTranslation()

  return (
    <AuthFormContainer title={t('Register now')} subtitle={t('Welcome! Sign up to continue.')}>
      <SignUpForm signUp={signUp} />
      <Button component={Link} to={`/${AppNavigationRoutes.LOGIN}`} variant="text">
        {t('I have an account')}
      </Button>
    </AuthFormContainer>
  )
}
