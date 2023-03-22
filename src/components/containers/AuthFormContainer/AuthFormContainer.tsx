import { FC } from 'react'
import { IAuthFormProps } from 'appTypes/AuthForm.interfaces'

import { FormSubtitle } from '@/components/views/FormSubtitle/FormSubtitle'
import { FormTitle } from '@/components/views/FormTitle/FormTitle'

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
