import { FC } from 'react'

import { IAuthFormProps } from '../../../types/AuthForm.interfaces'
import { FormSubtitle } from '../../views/FormSubtitle/FormSubtitle'
import { FormTitle } from '../../views/FormTitle/FormTitle'

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
