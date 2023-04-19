import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { IAuthFormValues } from '@/appTypes/IAuthFormValues.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { PasswordInput } from '@/components/views/PasswordInput/PasswordInput'
import { SIGNUP_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { authService } from '@/graphql/auth/authService'
import { AppNavigationRoutes } from '@/router/paths'
import { toastMessage } from '@/utils/toastMessage'

import { FORM_SIGNUP_KEYS, ISignUpFormProps } from './SignUpForm.interfaces'

export const SignUpForm: FC<ISignUpFormProps> = ({ signUp }) => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormValues>({ mode: 'onSubmit', resolver: yupResolver(SIGNUP_SCHEMA) })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IAuthFormValues> = async formData => {
    try {
      const { data } = await signUp({ variables: formData })

      if (data) {
        authService.addUserToStorage(data.signup.user, data.signup.access_token)
        navigate(`/${AppNavigationRoutes.EMPLOYEES}`)
      }
    } catch (error) {
      error instanceof Error && toastMessage(t('This user already exists'), TOAST_TYPES.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Input
        type="email"
        label={t('Email')}
        placeholder={t('Enter your email') as string}
        error={!!errors[FORM_SIGNUP_KEYS.email]}
        helperText={t(errors?.[FORM_SIGNUP_KEYS.email]?.message as string)}
        {...register(FORM_SIGNUP_KEYS.email)}
      />
      <PasswordInput
        label={t('Password')}
        placeholder={t('Enter your password') as string}
        error={!!errors[FORM_SIGNUP_KEYS.password]}
        helperText={t(errors?.[FORM_SIGNUP_KEYS.password]?.message as string)}
        {...register(FORM_SIGNUP_KEYS.password)}
      />
      <Button type="submit" variant="contained">
        {t('Sign up')}
      </Button>
    </form>
  )
}
