import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from '../../../constants/formSchemaOptions'
import { IAuthFormValues } from '../../../types/AuthForm.interfaces'
import { Button } from '../../views/Button/Button'
import { Input } from '../../views/Input/Input'
import { PasswordInput } from '../../views/PasswordInput/PasswordInput'

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormValues>({ mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<IAuthFormValues> = data => {
    console.log(data)
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
      <Button variant="contained">Sign in</Button>
    </form>
  )
}
