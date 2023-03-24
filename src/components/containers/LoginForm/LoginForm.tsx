import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { IAuthFormValues } from '@/appTypes/AuthForm.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { PasswordInput } from '@/components/views/PasswordInput/PasswordInput'
import { AUTH_SCHEMA } from '@/constants/authSchemaOptions'
import { authService } from '@/graphql/auth/authService'

import { ILoginFormProps } from './LoginForm.interfaces'

export const SignInForm: FC<ILoginFormProps> = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormValues>({ mode: 'onSubmit', resolver: yupResolver(AUTH_SCHEMA) })

  const onSubmit: SubmitHandler<IAuthFormValues> = async formData => {
    const { data } = await login({ variables: formData })
    if (data) {
      authService.addUserToStorage(data.login.user, data.login.access_token)
    }
  }

  return (
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
      <Button type="submit" variant="contained">
        Sign in
      </Button>
    </form>
  )
}
