import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { IAuthFormValues } from '@/appTypes/IAuthFormValues.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { PasswordInput } from '@/components/views/PasswordInput/PasswordInput'
import { LOGIN_SCHEMA } from '@/constants/schemaOptions'
import { authService } from '@/graphql/auth/authService'
import { AppNavigationRoutes } from '@/router/paths'

import { FORM_LOGIN_KEYS, ILoginFormProps } from './LoginForm.interfaces'

export const SignInForm: FC<ILoginFormProps> = ({ login }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormValues>({ mode: 'onSubmit', resolver: yupResolver(LOGIN_SCHEMA) })

  const onSubmit: SubmitHandler<IAuthFormValues> = async formData => {
    const { data } = await login({ variables: formData })

    if (data) {
      authService.addUserToStorage(data.login.user, data.login.access_token)
      navigate(`/${AppNavigationRoutes.EMPLOYEES}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Input
        type="email"
        label="Email"
        placeholder=" Enter your email"
        error={!!errors[FORM_LOGIN_KEYS.email]}
        helperText={errors?.[FORM_LOGIN_KEYS.email]?.message}
        {...register(FORM_LOGIN_KEYS.email)}
      />
      <PasswordInput
        label="Password"
        placeholder=" Enter your password"
        error={!!errors[FORM_LOGIN_KEYS.password]}
        helperText={errors?.[FORM_LOGIN_KEYS.password]?.message}
        {...register(FORM_LOGIN_KEYS.password)}
      />
      <Button type="submit" variant="contained">
        Sign in
      </Button>
    </form>
  )
}
