import { FC } from 'react'

import { AuthHeader } from '../../components/containers/AuthHeader'
import HeaderWrapper from '../../components/views/HeaderWrapper'

const SignUpPage: FC = () => {
  return (
    <HeaderWrapper>
      <AuthHeader />
    </HeaderWrapper>
  )
}

export default SignUpPage
