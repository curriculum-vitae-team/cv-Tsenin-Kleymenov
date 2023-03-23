import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { AuthFormContainer } from '@/components/containers/AuthFormContainer/AuthFormContainer'
import { SignUpForm } from '@/components/containers/SignUpForm/SignUpForm'
import { Button } from '@/components/views/Button/Button'
import { SIGNUP } from '@/graphql/auth/authMutation'
import { ISignupResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

const SignUpPage: FC = () => {
  const [signup] = useMutation<ISignupResult>(SIGNUP)

  return (
    <AuthFormContainer title="Register Now" subtitle="Welcome! Sign up to continue.">
      <SignUpForm signup={signup} />
      <Button component={Link} to={AppNavigationRoutes.LOGIN} variant="text">
        I have an account
      </Button>
    </AuthFormContainer>
  )
}

export default SignUpPage
