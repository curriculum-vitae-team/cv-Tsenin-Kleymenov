import { FC } from 'react'

import { FormSubtitle } from '@/components/views/FormSubtitle/FormSubtitle'
import { FormTitle } from '@/components/views/FormTitle/FormTitle'

import { IAuthFormProps } from './AuthFormContainer.interfaces'
import { FormContainer } from './AuthFormContainer.styles'

export const AuthFormContainer: FC<IAuthFormProps> = ({ title, subtitle, children }) => {
  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <FormSubtitle>{subtitle}</FormSubtitle>
      {children}
    </FormContainer>
  )
}
