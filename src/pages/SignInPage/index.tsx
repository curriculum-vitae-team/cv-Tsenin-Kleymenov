import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthFormContainer } from '@/components/containers/AuthFormContainer/AuthFormContainer'
import { SignInForm } from '@/components/containers/SignInForm/SignInForm'
import { Button } from '@/components/views/Button/Button'
import { AppNavigationRoutes } from '@/constants/paths'

const SignInPage: FC = () => {
  return (
    <AuthFormContainer title="Welcome Back" subtitle="Hello again! Sign in to continue.">
      <SignInForm />
      <Button component={Link} to={AppNavigationRoutes.SignUp} variant="text">
        I don't have an account yet
      </Button>
    </AuthFormContainer>
  )
}

export default SignInPage
