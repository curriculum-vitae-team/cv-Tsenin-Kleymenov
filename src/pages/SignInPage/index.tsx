import { FC } from 'react'

import { AuthHeader } from '../../components/containers/AuthHeader'
import HeaderWrapper from '../../components/views/HeaderWrapper'

const SignInPage: FC = () => {
  return (
    <HeaderWrapper>
      <AuthHeader />
    </HeaderWrapper>
  )
}

export default SignInPage
