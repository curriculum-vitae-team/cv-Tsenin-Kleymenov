import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthFormContainer } from '../../components/containers/AuthFormContainer/AuthFormContainer'
import { SignUpForm } from '../../components/containers/SignUpForm/SignUpForm'
import { Button } from '../../components/views/Button/Button'
import { AppNavigationRoutes } from '../../constants/paths'

const SignUpPage: FC = () => {
  return (
    <AuthFormContainer title="Register Now" subtitle="Welcome! Sign up to continue.">
      <SignUpForm />
      <Button component={Link} to={AppNavigationRoutes.SignIn} variant="text">
        I have an account
      </Button>
    </AuthFormContainer>
  )
}

export default SignUpPage
