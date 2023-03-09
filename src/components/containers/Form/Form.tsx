import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from '../../../constants/formShemaOptions'
import { FormSubtitle } from '../../views/FormSubtitle/FormSubtitle'
import { FormTitle } from '../../views/FormTitle/FormTitle'
import { Input } from '../../views/Input/Input'
import { LinkButton } from '../../views/LinkButton/LinkButton'
import { PasswordInput } from '../../views/PasswordInput/PasswordInput'
import { PrimaryButton } from '../../views/PrimaryButton/PrimaryButton'
import { FormContainer } from '../Form/Form.styles'

import { IFormProps, IFormValues } from './Form.interfaces'

export const Form: FC<IFormProps> = ({ signFlag }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>({ mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<IFormValues> = data => {
    console.log(data)
  }

  return (
    <FormContainer>
      <FormTitle>{signFlag ? 'Register now' : 'Welcome Back'}</FormTitle>
      <FormSubtitle>
        {signFlag ? 'Welcome! Sign up to continue' : 'Hello again! Sign in to continue'}
      </FormSubtitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Input
          type="email"
          label="Email"
          error={!!errors.email}
          placeholder=" Enter your email"
          helperText={errors?.email?.message}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder=" Enter your password"
          error={!!errors.password}
          helperText={errors?.password?.message}
          {...register('password')}
        />
        <PrimaryButton>{signFlag ? 'SIGN UP' : 'SIGN IN'}</PrimaryButton>
      </form>
      {signFlag ? (
        <LinkButton to={'/login'}>I have an account</LinkButton>
      ) : (
        <LinkButton to={'/signup'}>RESET PASSWORD</LinkButton>
      )}
    </FormContainer>
  )
}