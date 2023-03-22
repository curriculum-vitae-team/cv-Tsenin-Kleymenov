import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { IAuthFormValues } from '@/appTypes/AuthForm.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { PasswordInput } from '@/components/views/PasswordInput/PasswordInput'
import { schema } from '@/constants/formSchemaOptions'

export const SignUpForm: FC = () => {
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
      <Button variant="contained">Sign up</Button>
    </form>
  )
}
