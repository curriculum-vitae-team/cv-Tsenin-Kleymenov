import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { AuthFormContainer } from '@/components/containers/AuthFormContainer/AuthFormContainer'
import { SignUpForm } from '@/components/containers/SignUpForm/SignUpForm'
import { Button } from '@/components/views/Button/Button'
import { SIGN_UP } from '@/graphql/auth/authMutation'
import { ISignUpResult } from '@/graphql/auth/authResult.interfaces'
import { AppNavigationRoutes } from '@/router/paths'

const SignUpPage: FC = () => {
  const [signUp] = useMutation<ISignUpResult>(SIGN_UP)

  return (
    <AuthFormContainer title="Register Now" subtitle="Welcome! Sign up to continue.">
      <SignUpForm signUp={signUp} />
      <Button component={Link} to={AppNavigationRoutes.LOGIN} variant="text">
        I have an account
      </Button>
    </AuthFormContainer>
  )
}

export default SignUpPage
